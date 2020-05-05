const _ = require('lodash');
const {Op} = require('sequelize');
const {normalize} = require('normalizr');

const {userSchema} = require('../../../entities/Blog/schema');
const {makeUserAvatarUrl} = require('../../../entities/Blog/helpers');
const {blogProductSchema} = require('../../../entities/BlogProduct/schema');
const {fullPostSchema} = require('../../../entities/Post/schema');
const {makePostSmallPicUrl} = require('../../../entities/Post/helpers');
const {makeProductSmallPicUrl} = require('../../../entities/ProductBase/helpers');

const {User, Post, UserProduct, Product, ProductPicture, Brand} = require('../../database/models');

module.exports = async function getMain(ctx) {
    const {user} = ctx.req;
    const currentUserMap = user
        ? {users: {[user.id]: JSON.parse(JSON.stringify(user))}}
        : {};

    const userDataPromise = User.findAll({
        limit: 10,
        order: [['id', 'DESC']],
        where: {
            [Op.not]: {
                [Op.or]: {
                    avatarPicture: null,
                    bio: null,
                    isAdmin: true,
                },
            },
        },
        attributes: ['id', 'login', 'name', 'avatarPicture', 'bio'],
    });

    const blogProductDataPromise = UserProduct.findAll({
        limit: 2,
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

    const postDataPromise = Post.findAll({
        limit: 10,
        order: [['createdAt', 'DESC']],
        where: {isPublic: true},
        attributes: ['id', 'title', 'picture', 'userId', 'isPublic'],
        include: [{
            model: User,
            attributes: ['id', 'login', 'name', 'avatarPicture'],
        }],
    });

    const [
        userData,
        blogProductData,
        postData,
    ] = await Promise.all([
        userDataPromise,
        blogProductDataPromise,
        postDataPromise,
    ]);

    const userDataPure = JSON.parse(JSON.stringify(userData));
    const blogProductDataPure = JSON.parse(JSON.stringify(blogProductData));
    const postDataPure = JSON.parse(JSON.stringify(postData));

    const {
        result: blogIds,
        entities: userEntities,
    } = normalize(userDataPure, [userSchema]);

    const {
        result: blogProductIds,
        entities: blogProductEntities,
    } = normalize(blogProductDataPure, [blogProductSchema]);

    const {
        result: postIds,
        entities: postEntities,
    } = normalize(postDataPure, [fullPostSchema]);

    const entities = _.defaultsDeep(
        {},
        currentUserMap,
        userEntities,
        blogProductEntities,
        postEntities,
    );

    const {
        users = {},
        products = {},
        blogProducts = {},
        posts = {},
    } = entities;

    const blogArr = Object.values(users).map(user => ({
        ..._.pick(user, ['login', 'name']),
        imageUrl: makeUserAvatarUrl(user.avatarPicture),
    }));
    const blogMap = _.keyBy(blogArr, 'login');
    const blogLogins = blogIds.map(id => users[id].login);
    const blog = {
        data: blogMap,
        currentLogin: user ? user.login : null,
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

    const postArr = Object.values(posts).map(post => ({
        ..._.pick(post, ['id', 'title', 'isPublic']),
        imageUrl: makePostSmallPicUrl(post.picture),
        authorLogin: users[post.userId].login,
    }));
    const post = _.keyBy(postArr, 'id');

    ctx.body = {
        blogLogins,
        blogProductIds,
        postIds,
        blog,
        productBase,
        blogProduct,
        post,
    };
};
