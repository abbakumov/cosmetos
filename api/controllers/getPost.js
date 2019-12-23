const {normalize} = require('normalizr');
const _ = require('lodash');

const {fullPostSchema} = require('../../entities/Post/schema');
const {makePostPicUrl} = require('../../entities/Post/helpers');
const {makeUserAvatarUrl} = require('../../entities/Blog/helpers');
const {makeProductPicUrl} = require('../../entities/ProductBase/helpers');

const {
    Post,
    User,
    PostPart,
    Product,
    PostPartProduct,
    ProductColor,
    ProductPicture,
    Brand,
} = require('../database/models');

module.exports = async function getPost(ctx) {
    const {id: _id} = ctx.params;
    const id = parseInt(_id);

    // data fetching
    const data = await Post.findOne({
        where: {id},
        attributes: ['id', 'title', 'picture', 'userId', 'instaPostId', 'description', 'isPublic'],
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
                        attributes: ['id', 'productId', 'productColorId'],
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
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    });

    const plainData = JSON.parse(JSON.stringify(data));

    // normalization
    const normalizedPost = normalize(
        plainData,
        fullPostSchema
    );

    // fields mapping
    const {brands, products, postPartProducts, postParts, users, posts} = normalizedPost.entities;
    const postEntity = posts[normalizedPost.result];
    const userEntity = users[postEntity.userId];

    const postBase = {
        ..._.pick(postEntity, ['id', 'title']),
        imageUrl: makePostPicUrl(postEntity.picture),
        authorLogin: users[postEntity.userId].login,
    };

    const postExtra = {
        ..._.pick(postEntity, ['id', 'instaPostId', 'description']),
        imageUrlBig: makePostPicUrl(postEntity.picture),
        partIds: postEntity.PostParts,
    };

    const blog = {
        ..._.pick(userEntity, ['login', 'name']),
        imageUrl: makeUserAvatarUrl(userEntity.avatarPicture),
        postIds: userEntity.Posts,
    };

    const postPart = Object.keys(postParts)
        .map(id => postParts[id])
        .map(pp => ({
            ..._.pick(pp, ['id', 'title']),
            position: {
                x: pp.positionX * 100, // TODO: refact
                y: pp.positionY * 100, // TODO: refact
            },
            color: pp.colorHex, // TODO: refact
            productIds: pp.PostPartProducts.map(id => postPartProducts[id].productId),
        }))
        .reduce(
            (acc, item) => ({
                ...acc,
                [item.id]: item,
            }),
            {}
        ); // TODO: replace by keyBy

    const productBase = Object.keys(products)
        .map(id => products[id])
        .map(product => ({
            ..._.pick(product, ['id', 'title', 'kind']),
            brand: brands[product.Brand].titleShort,
            smallPicUrl: makeProductPicUrl(product.ProductPictures[0].picture),
        }))
        .reduce(
            (acc, item) => ({
                ...acc,
                [item.id]: item,
            }),
            {}
        ); // TODO: replace by keyBy

    const result = {
        postBase,
        postExtra,
        blog,
        postPart,
        productBase,
        blogProduct: {}, // TO BE DONE
    }

    ctx.body = result;
};
