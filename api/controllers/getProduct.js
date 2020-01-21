const {normalize} = require('normalizr');
const _ = require('lodash');

const {makeUserAvatarUrl} = require('../../entities/Blog/helpers');
const {makePostSmallPicUrl} = require('../../entities/Post/helpers');
const {makeProductSmallPicUrl, makeProductBigPicUrl} = require('../../entities/ProductBase/helpers');
const {makeProductColorSmallPicUrl} = require('../../entities/ProductColor/helpers');
const {productSchema} = require('../../entities/ProductBase/schema');

const {
    User,
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

    const data = await Product.findOne({
        where: {id},
        attributes: ['id', 'kind', 'title', 'description'],
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
        ],
    });

    // second request because nested order is not working well now, waiting for fix
    const postPartProductsData = await PostPartProduct.findAll({
        where: {productId: id},
        attributes: ['id', 'postPartId'],
        order: [['createdAt', 'DESC']],
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
    });

    // just work around
    const plainData = JSON.parse(JSON.stringify(data));
    plainData.PostPartProducts = JSON.parse(JSON.stringify(postPartProductsData));

    const normalizedData = normalize(
        plainData,
        productSchema
    );

    const {
        brands,
        postPartProducts,
        postParts,
        posts = {},
        productColors = {},
        products,
        users = {},
    } = normalizedData.entities;

    const productEntity = products[normalizedData.result];

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

    const productExtra = {
        ..._.pick(productEntity, ['id', 'description']),
        postIds,
        bigPicUrl: makeProductBigPicUrl(productEntity.ProductPictures[0].picture),
        colorIds: productEntity.ProductColors,
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
    const blog = _.keyBy(blogMap, 'login');

    const result = {
        productBase,
        productExtra,
        productColor,
        postBase,
        blog,
        blogProduct: {},
    };

    ctx.body = result;
}
