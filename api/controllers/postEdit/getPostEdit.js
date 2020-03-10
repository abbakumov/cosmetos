const {normalize} = require('normalizr');
const _ = require('lodash');

const {fullPostSchema} = require('../../../entities/Post/schema');
const {makePostPicUrl} = require('../../../entities/Post/helpers');
const {makeProductColorPicUrl} = require('../../../entities/ProductColor/helpers');

const {
    Post,
    PostPart,
    Product,
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
    const postPartMap = Object.values(postParts).map(part => ({
        ..._.pick(part, ['id', 'title']),
        position: {
            x: part.positionX * 100,
            y: part.positionY * 100,
        },
        color: part.colorHex,
        productIds: part.PostPartProducts.map(id => 'a' + postPartProducts[id].Product),
    }));
    const postPart = _.keyBy(postPartMap, 'id');

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

    const postProductMap = Object.values(postPartProducts).map(ppp => ({
        id: ppp.id,
        postId: parseInt(id),
        productId: ppp.Product,
        productColorId: ppp.productColorId,
    }));
    const postProduct = _.keyBy(postProductMap, 'id');

    const productColorMap = Object.values(productColors).map(
        color => ({
            ..._.pick(color, ['id', 'title']),
            pictureUrl: makeProductColorPicUrl(color.picture),
        }));
    const productColor = _.keyBy(productColorMap, 'id');

    const brand = _.keyBy(brandsData, 'id');

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
