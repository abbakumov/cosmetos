const {normalize} = require('normalizr');
const _ = require('lodash');

const {fullPostSchema} = require('../../entities/Post/schema');
const {makePostSmallPicUrl, makePostBigPicUrl} = require('../../entities/Post/helpers');
const {makeProductColorSmallPicUrl} = require('../../entities/ProductColor/helpers');
const {makeUserAvatarUrl} = require('../../entities/Blog/helpers');
const {makeProductSmallPicUrl} = require('../../entities/ProductBase/helpers');

const {
    Post,
    User,
    PostPart,
    Product,
    UserProduct,
    PostPartProduct,
    ProductColor,
    ProductPicture,
    Brand,
} = require('../database/models');

module.exports = async function getPost(ctx) {
    const {id: _id} = ctx.params;
    const id = parseInt(_id);

    const {userId} = await Post.findOne({
        where: {id},
        attributes: ['userId'],
    });

    // data fetching
    const data = await Post.findOne({
        where: {id},
        attributes: ['id', 'title', 'picture', 'userId', 'instaPostId', 'description', 'isPublic'],
        order: [
            [PostPart, 'createdAt', 'ASC'],
            [PostPart, PostPartProduct, 'createdAt', 'ASC'],
        ],
        include: [
            {
                model: User,
                attributes: ['id', 'login', 'name', 'avatarPicture'],
            },
            {
                model: PostPart,
                attributes: ['id', 'title', 'positionX', 'positionY', 'colorHex'],
                include: [
                    {
                        model: PostPartProduct,
                        attributes: ['id', 'postPartId','productId', 'productColorId'],
                        include: [
                            {
                                model: ProductColor,
                                attributes: ['id', 'title', 'picture'],
                            },
                            {
                                model: Product,
                                attributes: ['id', 'title', 'kind', 'brandId'],
                                include: [
                                    {
                                        model: ProductPicture,
                                        attributes: ['id', 'picture'],
                                    },
                                    {
                                        model: Brand,
                                        attributes: ['id', 'titleShort'],
                                    },
                                    {
                                        model: UserProduct,
                                        attributes: ['id', 'productId', 'review'],
                                        where: {userId},
                                        required: false,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            }
        ],
    });

    // ACCESS CHECK
    // if post is not public then show it only for admin or author
    const {user} = ctx.req;
    const isAdminOrOwner = !!user && (user.isAdmin || user.id === data.userId);
    if (!data.isPublic && !isAdminOrOwner) {
        // ACCESS DENIED
        ctx.req.statusCode = 404;
        return;
    }

    const plainData = JSON.parse(JSON.stringify(data));

    // normalization
    const normalizedPost = normalize(
        plainData,
        fullPostSchema
    );

    // fields mapping
    const {
        brands,
        products = {},
        postPartProducts,
        productColors,
        postParts,
        users,
        posts,
        userProducts = {},
    } = normalizedPost.entities;
    const postEntity = posts[normalizedPost.result];
    const userEntity = users[postEntity.userId];

    const postBase = {
        ..._.pick(postEntity, ['id', 'title', 'isPublic']),
        imageUrl: makePostSmallPicUrl(postEntity.picture),
        authorLogin: users[postEntity.userId].login,
    };

    const postExtra = {
        ..._.pick(postEntity, ['id', 'instaPostId', 'description']),
        imageUrlBig: makePostBigPicUrl(postEntity.picture),
        partIds: postEntity.PostParts,
    };

    const blogItem = {
        ..._.pick(userEntity, ['login', 'name']),
        imageUrl: makeUserAvatarUrl(userEntity.avatarPicture),
    };
    const blog = {
        data: {
            [blogItem.login]: blogItem,
        },
        currentLogin: user ? user.login : null,
    };
    if (user) {
        const currentUserItem = {
            ..._.pick(user, ['login', 'name']),
            imageUrl: makeUserAvatarUrl(user.avatarPicture),
        };
        blog.data[currentUserItem.login] = currentUserItem;
    }

    const postPartMap = Object.keys(postParts)
        .map(id => postParts[id])
        .map(pp => ({
            ..._.pick(pp, ['id', 'title']),
            position: {
                x: pp.positionX * 100, // TODO: refact
                y: pp.positionY * 100, // TODO: refact
            },
            color: pp.colorHex, // TODO: refact
            productIds: pp.PostPartProducts.map(id => postPartProducts[id].productId),
        }));
    const postPart = _.keyBy(postPartMap, 'id');

    const postPartProductMap = Object.keys(postPartProducts)
        .map(id => postPartProducts[id])
        .map(postPartProduct => ({
            ..._.pick(postPartProduct, ['id', 'postPartId', 'productId', 'productColorId']),
        }));
    const postPartProduct = _.keyBy(postPartProductMap, 'id');

    const productColorMap = Object.keys(productColors)
        .map(id => productColors[id])
        .map(productColor => ({
            ..._.pick(productColor, ['id', 'title']),
            picUrl: makeProductColorSmallPicUrl(productColor.picture),
        }));
    const productColor = _.keyBy(productColorMap, 'id');

    const productBaseMap = Object.keys(products)
        .map(id => products[id])
        .map(product => ({
            ..._.pick(product, ['id', 'title', 'kind']),
            brand: brands[product.Brand].titleShort,
            smallPicUrl: makeProductSmallPicUrl(product.ProductPictures[0].picture),
        }));
    const productBase = _.keyBy(productBaseMap, 'id');

    const blogProductArr = Object.values(userProducts)
        .map(userProduct => ({
            ..._.pick(userProduct, ['id', 'productId', 'review']),
            blogLogin: blogItem.login,
        }))
    const blogProduct = _.keyBy(blogProductArr, 'id');

    const result = {
        postBase,
        postExtra,
        blog,
        postPart,
        postPartProduct,
        productColor,
        productBase,
        blogProduct,
    };

    ctx.body = result;
};
