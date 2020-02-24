const {normalize} = require('normalizr');
const _ = require('lodash');
const {Op} = require('sequelize');

const {makeUserAvatarUrl} = require('../../entities/Blog/helpers');
const {makePostSmallPicUrl} = require('../../entities/Post/helpers');
const {makeProductSmallPicUrl, makeProductBigPicUrl} = require('../../entities/ProductBase/helpers');
const {makeProductColorSmallPicUrl} = require('../../entities/ProductColor/helpers');
const {productSchema} = require('../../entities/ProductBase/schema');

const {
    User,
    UserProduct,
    Post,
    Product,
    ProductColor,
    ProductPicture,
    PostPartProduct,
    PostPart,
    Brand,
} = require('../database/models');

module.exports = async function getProduct(ctx) {
    const {id: _id} = ctx.params;
    const id = parseInt(_id);
    const {user} = ctx.req;

    const userProductWhere = {
        review: {
            [Op.not]: '',
        },
    };
    if (user && user.id) {
        userProductWhere.userId = {
            [Op.not]: user.id,
        };
    }

    const data = await Product.findOne({
        where: {id},
        attributes: ['id', 'kind', 'title', 'description'],
        order: [[PostPartProduct, 'createdAt', 'DESC']],
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
                model: ProductColor,
                attributes: ['id', 'title', 'colorHex', 'picture'],
            },
            {
                model: UserProduct,
                attributes: ['id', 'userId', 'review'],
                where: userProductWhere,
                include: [
                    {
                        model: User,
                        attributes: ['id', 'login', 'name', 'avatarPicture'],
                    },
                ],
                limit: 10,
            },
            {
                model: PostPartProduct,
                attributes: ['id', 'postPartId', 'productColorId'],
                include: [
                    {
                        model: PostPart,
                        attributes: ['id', 'postId'],
                        include: [
                            {
                                model: Post,
                                where: {isPublic: true},
                                attributes: ['id', 'title', 'picture', 'isPublic'],
                                include: [
                                    {
                                        model: User,
                                        attributes: ['id', 'login', 'name', 'avatarPicture'],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    });

    const plainData = JSON.parse(JSON.stringify(data));

    const normalizedData = normalize(
        plainData,
        productSchema
    );

    const {
        brands,
        postPartProducts = {},
        postParts = {},
        posts = {},
        productColors = {},
        products,
        users = {},
        userProducts = {},
    } = normalizedData.entities;

    const productEntity = products[normalizedData.result];

    const userProductIds = productEntity.UserProducts;

    if (user) {
        const ownUserProduct = await UserProduct.findOne({
            attributes: ['id', 'userId', 'review'],
            where: {
                userId: user.id,
                productId: id,
                review: {
                    [Op.not]: '',
                },
            },
        });

        if (ownUserProduct) {
            const plainOwnUserProduct = JSON.parse(JSON.stringify(ownUserProduct));
            userProducts[plainOwnUserProduct.id] = plainOwnUserProduct;
            userProductIds.push(plainOwnUserProduct.id);
        }
    }
    const userProductArr = Object.values(userProducts)
        .map(usProd => ({
            ..._.pick(usProd, ['id', 'review']),
            blogLogin: users[usProd.userId].login,
            productId: id,
        }));
    const userProduct = _.keyBy(userProductArr, 'id');

    const productBase = {
        ..._.pick(productEntity, ['id', 'kind', 'title']),
        brand: brands[productEntity.Brand].titleShort,
        smallPicUrl: makeProductSmallPicUrl(productEntity.ProductPictures[0].picture),
    };

    const postIds = productEntity
        .PostPartProducts.map(_id => postPartProducts[_id].PostPart)
        .map(_id => {
            // because Posts might not exist there if they aren't public
            if (!_id) {
                return null;
            };

            return postParts[_id].Post;
        })
        .filter(id => !!id);

    const postProductArr = productEntity
        .PostPartProducts.map(_id => {
            const item = postPartProducts[_id];

            const postPart = postParts[item.postPartId];

            if (!postPart) {
                return null;
            }

            return {
                id: item.id,
                postId: postPart.postId,
                productId: id,
                productColorId: item.productColorId,
            };
        })
        .filter(item => !!item);
    const postProduct = _.keyBy(postProductArr, 'id');

    const productExtra = {
        ..._.pick(productEntity, ['id', 'description']),
        postIds,
        bigPicUrl: makeProductBigPicUrl(productEntity.ProductPictures[0].picture),
        colorIds: productEntity.ProductColors,
        blogProductIds: userProductIds,
    }

    const productColorMap = productEntity.ProductColors
        .map(_id => productColors[_id])
        .map(color => ({
            ..._.pick(color, ['id', 'title', 'colorHex']),
            picUrl: makeProductColorSmallPicUrl(color.picture),
        }))
    const productColor = _.keyBy(productColorMap, 'id');

    const postBaseMap = Object.keys(posts)
        .map(_id => posts[_id])
        .map(post => ({
            ..._.pick(post, ['id', 'title', 'isPublic']),
            imageUrl: makePostSmallPicUrl(post.picture),
            authorLogin: users[post.User].login,
        }))
    const postBase = _.keyBy(postBaseMap, 'id');

    const blogMap = Object.keys(users)
        .map(_id => users[_id])
        .map(user => ({
            ..._.pick(user, ['login', 'name']),
            imageUrl: makeUserAvatarUrl(user.avatarPicture),
            instagramLogin: '',
            postIds: [],
        }))
    const blogData = _.keyBy(blogMap, 'login');
    const blog = {
        data: blogData,
        currentLogin: user ? user.login : null,
    };
    if (user) {
        const currentUserItem = {
            ..._.pick(user, ['login', 'name']),
            imageUrl: makeUserAvatarUrl(user.avatarPicture),
        };
        blog.data[currentUserItem.login] = currentUserItem;
    }

    const result = {
        productBase,
        productExtra,
        productColor,
        postProduct,
        postBase,
        blog,
        blogProduct: userProduct,
    };

    ctx.body = result;
}
