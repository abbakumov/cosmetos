const {normalize} = require('normalizr');
const _ = require('lodash');

const {fullPostSchema} = require('../../entities/Post/schema');
const {makePostPicUrl} = require('../../entities/Post/helpers');
const {makeProductColorPicUrl} = require('../../entities/ProductColor/helpers');

const {
    Post,
    PostPart,
    Product,
    PostPartProduct,
    ProductColor,
    Brand,
} = require('../database/models');

module.exports = async function getPostEdit(ctx) {
    const {id} = ctx.params;

    // data fetching
    const postDataPromise = Post.findByPk(
        id,
        {
            attributes: ['id', 'title', 'picture', 'instaPostId', 'description', 'isPublic'],
            include: [
                {
                    model: PostPart,
                    attributes: ['id', 'title', 'positionX', 'positionY', 'colorHex'],
                    include: [
                        {
                            model: PostPartProduct,
                            attributes: ['id', 'productColorId'],
                            include: [
                                {
                                    model: Product,
                                    attributes: ['id', 'title', 'description', 'kind', 'brandId'],
                                    include: [
                                        {
                                            model: ProductColor,
                                            attributes: ['id', 'title', 'picture'],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        }
    );

    const brandsDataPromise = Brand.findAll({
        attributes: ['id', 'titleShort', 'titleFull'],
    });

    const [postData, brandsData] = await Promise.all([postDataPromise, brandsDataPromise]);

    const postDataPlain = JSON.parse(JSON.stringify(postData));
    const brandsDataPlain = JSON.parse(JSON.stringify(brandsData));

    // normalization
    const normalizedPostData = normalize(
        postDataPlain,
        fullPostSchema
    );

    // fields mapping
    const {
        productColors = {},
        products = {},
        postPartProducts = {},
        postParts = {},
        posts,
    } = normalizedPostData.entities;

    const post = posts[normalizedPostData.result];
    const postEdit = {
        ..._.pick(post, ['id', 'title', 'instaPostId', 'description', 'isPublic']),
        imageUrl: makePostPicUrl(post.picture),
    };

    const postPartIds = post.PostParts;
    const postPart = Object.values(postParts).reduce(
        (acc, part) => ({
            ...acc,
            [part.id]: {
                ..._.pick(part, ['id', 'title']),
                position: {
                    x: part.positionX * 100,
                    y: part.positionY * 100,
                },
                color: part.colorHex,
                productIds: part.PostPartProducts.map(id => postPartProducts[id].Product),
            }
        }),
        {}
    );

    const productBase = {};
    const productExtra = {};

    const brandsMap = brandsDataPlain.reduce(
        (acc, brand) => ({
            ...acc,
            [brand.id]: brand,
        }),
        {}
    );

    Object.values(products).forEach(product => {
        productBase[product.id] = {
            ..._.pick(product, ['id', 'kind', 'title']),
            brand: brandsMap[product.brandId].titleShort,
            smallPicUrl: '',
        };

        productExtra[product.id] = {
            ..._.pick(product, ['id', 'description']),
            postIds: [],
            bigPicUrl: '',
            colorIds: product.ProductColors,
        };
    });

    const postProduct = Object.values(postPartProducts).reduce(
        (acc, ppp) => ({
            ...acc,
            [ppp.id]: {
                id: ppp.id,
                postId: parseInt(id),
                productId: ppp.Product,
                productColorId: ppp.productColorId,
            },
        }),
        {}
    );

    const productColor = Object.values(productColors).reduce(
        (acc, color) => ({
            ...acc,
            [color.id]: {
                ..._.pick(color, ['id', 'title']),
                pictureUrl: makeProductColorPicUrl(color.picture),
            },
        }),
        {}
    );

    const brand = brandsData.reduce(
        (acc, _brand) => ({
            ...acc,
            [_brand.id]: _brand,
        }),
        {}
    );

    ctx.body = {
        postEdit,
        postPartIds,
        postPart,
        productBase,
        productExtra,
        postProduct,
        productColor,
        brand,
    };
}
