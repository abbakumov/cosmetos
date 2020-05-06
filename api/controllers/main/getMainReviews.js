const _ = require('lodash');
const {normalize} = require('normalizr');
const {makeUserAvatarUrl} = require('../../../entities/Blog/helpers');
const {makeProductSmallPicUrl} = require('../../../entities/ProductBase/helpers');
const {blogProductSchema} = require('../../../entities/BlogProduct/schema');

const {User, Product, ProductPicture, UserProduct, Brand} = require('../../database/models');

module.exports = async function getMainReviews(ctx) {
    const {offset = '0'} = ctx.request.query;

    const parsedOffset = parseInt(offset, 10);

    const data = await UserProduct.findAll({
        limit: 10,
        offset: parsedOffset,
        order: [['id', 'DESC']],
        attributes: ['id', 'userId', 'productId', 'review'],
        include: [
            {
                model: User,
                attributes: ['id', 'login', 'name', 'avatarPicture'],
            },
            {
                model: Product,
                attributes: ['id', 'title', 'description', 'brandId'],
                include: [
                    {
                        model: Brand,
                        attributes: ['id', 'titleShort'],
                    },
                    {
                        model: ProductPicture,
                        attributes: ['id', 'picture'],
                    },
                ],
            },
        ],
    });

    const pureData = JSON.parse(JSON.stringify(data));

    const {
        result: blogProductIds,
        entities,
    } = normalize(pureData, [blogProductSchema]);

    const {
        users = {},
        products = {},
        blogProducts = {},
    } = entities;

    const blogArr = Object.values(users).map(user => ({
        ..._.pick(user, ['login', 'name']),
        imageUrl: makeUserAvatarUrl(user.avatarPicture),
    }));
    const blogMap = _.keyBy(blogArr, 'login');
    const blog = {
        data: blogMap,
        currentLogin: ctx.req.user ? ctx.req.user.login : null,
    };

    const productBaseArr = Object.values(products).map(product => ({
        ..._.pick(product, ['id', 'kind', 'title']),
        brand: product.Brand.titleShort,
        smallPicUrl: Array.isArray(product.ProductPictures) && product.ProductPictures.length
            ? makeProductSmallPicUrl(product.ProductPictures[0].picture)
            : null,
    }));
    const productBase = _.keyBy(productBaseArr, 'id');

    const blogProductArr = Object.values(blogProducts).map(blogProduct => ({
        ..._.pick(blogProduct, ['id', 'productId', 'review']),
        blogLogin: users[blogProduct.userId].login,
    }));
    const blogProduct = _.keyBy(blogProductArr, 'id');

    ctx.body = {
        blogProductIds,
        blog,
        productBase,
        blogProduct,
        isMoreAvailable: !blogProductIds.includes(1),
    };
};
