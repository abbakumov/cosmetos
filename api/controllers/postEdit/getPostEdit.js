const {normalize} = require('normalizr');
const _ = require('lodash');

const {fullPostSchema} = require('../../../entities/Post/schema');
const {makePostPicUrl} = require('../../../entities/Post/helpers');
const {makeProductColorPicUrl} = require('../../../entities/ProductColor/helpers');

const {
    Post,
    PostPart,
    Product,
    UnassignedProduct,
    PostPartProduct,
    ProductColor,
    Brand,
} = require('../../database/models');

module.exports = async function getPostEdit(ctx) {
    const {id} = ctx.params;

    // data fetching
    const postDataPromise = Post.findByPk(
        id,
        {
            attributes: ['id', 'title', 'picture', 'instaPostId', 'description', 'isPublic', 'userId'],
            order: [
                [PostPart, PostPartProduct, 'createdAt', 'ASC'],
            ],
            include: [
                {
                    model: PostPart,
                    attributes: ['id', 'title', 'positionX', 'positionY', 'colorHex'],
                    include: [
                        {
                            model: PostPartProduct,
                            attributes: ['id', 'postPartId', 'productId', 'productColorId', 'unassignedProductId', 'createdAt'],
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
                                {
                                    model: UnassignedProduct,
                                    attributes: ['id', 'brandId', 'brandText', 'productId', 'productText', 'productColorText'],
                                    include: [
                                        {
                                            model: Brand,
                                            attributes: ['id', 'titleShort', 'titleFull'],
                                        },
                                        {
                                            model: Product,
                                            attributes: ['id', 'title', 'description', 'kind', 'brandId'],
                                        }
                                    ],
                                }
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

    // ACCESS CHECK
    // after post fetching to check access
    // only post owner and admins can edit post
    const {user} = ctx.req;
    if (!user || (!user.isAdmin && user.id !== postData.userId)) {
        ctx.res.statusCode = 401;
        return;
    }

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
        unassignedProducts = {},
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
    const postPartArr = Object.values(postParts).map(part => ({
        ..._.pick(part, ['id', 'title']),
        position: {
            x: part.positionX * 100,
            y: part.positionY * 100,
        },
        color: part.colorHex,
        postPartProductIds: part.PostPartProducts,
    }));
    const postPart = _.keyBy(postPartArr, 'id');

    const productBase = {};
    const productExtra = {};

    const brandsMap = _.keyBy(brandsDataPlain, 'id');

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

    const postPartProductArr = Object.values(postPartProducts).map(ppp => ({
        id: ppp.id,
        postId: id,
        productId: ppp.productId,
        productColorId: ppp.productColorId,
        unProductId: ppp.unassignedProductId,
    }));
    const postPartProduct = _.keyBy(postPartProductArr, 'id');

    const productColorArr = Object.values(productColors).map(
        color => ({
            ..._.pick(color, ['id', 'title']),
            pictureUrl: makeProductColorPicUrl(color.picture),
        }));
    const productColor = _.keyBy(productColorArr, 'id');

    const brand = _.keyBy(brandsData, 'id');

    const unProductArr = Object.values(unassignedProducts).map(
        unProduct => _.pick(unProduct, ['id', 'brandId', 'brandText', 'productId', 'productText', 'productColorText']));
    const unProduct = _.keyBy(unProductArr, 'id');

    ctx.body = {
        postEdit,
        postPartIds,
        postPart,
        productBase,
        productExtra,
        postPartProduct,
        productColor,
        brand,
        unProduct,
    };
}
