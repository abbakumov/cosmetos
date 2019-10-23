const {normalize} = require('normalizr');
const _ = require('lodash');

const {makeUserAvatarUrl} = require('../../entities/Blog/helpers');
const {makePostPicUrl} = require('../../entities/PostBase/helpers');
const {makeProductPicUrl} = require('../../entities/ProductBase/helpers');
const {makeProductColorPicUrl} = require('../../entities/ProductColor/helpers');
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
        where: { id },
        include: [
            { model: ProductPicture },
            { model: Brand },
            { model: ProductColor },
            {
                model: PostPartProduct,
                include: [
                    {
                        model: PostPart,
                        include: [
                            {
                                model: Post,
                                include: [
                                    { model: User },
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
        postPartProducts,
        postParts,
        posts,
        productColors,
        products,
        users,
    } = normalizedData.entities;

    const productEntity = products[normalizedData.result];

    const productBase = {
        ..._.pick(productEntity, ['id', 'kind', 'title']),
        brand: brands[productEntity.Brand].titleShort,
        smallPicUrl: makeProductPicUrl(productEntity.ProductPictures[0].picture),
    };

    const postIds = productEntity
        .PostPartProducts.map(_id => postPartProducts[_id].PostPart)
        .map(_id => postParts[_id].Post);

    const productExtra = {
        ..._.pick(productEntity, ['id', 'description']),
        postIds,
        bigPicUrl: makeProductPicUrl(productEntity.ProductPictures[0].picture),
        colorIds: productEntity.ProductColors,
    }

    const productColor = productEntity.ProductColors
        .map(_id => productColors[_id])
        .map(color => ({
            ..._.pick(color, ['id', 'title', 'colorHex']),
            picUrl: makeProductColorPicUrl(color.picture),
        }))
        .reduce(
            (acc, item) => ({
                ...acc,
                [item.id]: item,
            }),
            {}
        ); // TODO: replace by keyBy

    const postBase = Object.keys(posts)
        .map(_id => posts[_id])
        .map(post => ({
            ..._.pick(post, ['id', 'title', ]),
            imageUrl: makePostPicUrl(post.picture),
            authorLogin: users[post.User].login,
        }))
        .reduce(
            (acc, item) => ({
                ...acc,
                [item.id]: item,
            }),
            {}
        ); // TODO: replace by keyBy

    const blog = Object.keys(users)
        .map(_id => users[_id])
        .map(user => ({
            ..._.pick(user, ['login', 'name']),
            imageUrl: makeUserAvatarUrl(user.avatarPicture),
            instagramLogin: '',
            postIds: [],
        }))
        .reduce(
            (acc, item) => ({
                ...acc,
                [item.login]: item,
            }),
            {}
        ); // TODO: replace by keyBy

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
