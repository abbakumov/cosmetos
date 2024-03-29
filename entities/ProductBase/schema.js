const {schema} = require('normalizr');

const productColorSchema = new schema.Entity('productColors');

const userSchema = new schema.Entity('users');

const userProductSchema = new schema.Entity('userProducts', {
    User: userSchema,
});

const postSchema = new schema.Entity('posts', {
    User: userSchema,
});

const postPartSchema = new schema.Entity('postParts', {
    Post: postSchema,
});

const postPartProductSchema = new schema.Entity('postPartProducts', {
    PostPart: postPartSchema,
});

const brandSchema = new schema.Entity('brands');

const productSchema = new schema.Entity('products', {
    Brand: brandSchema,
    PostPartProducts: [postPartProductSchema],
    ProductColors: [productColorSchema],
    UserProducts: [userProductSchema],
});

module.exports = {
    productSchema,
};
