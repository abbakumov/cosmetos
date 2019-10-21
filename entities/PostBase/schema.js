const {schema} = require('normalizr');

const postSchema = new schema.Entity('posts');

const brandSchema = new schema.Entity('brands');

const productSchema = new schema.Entity('products', {
    Brand: brandSchema,
});

const productColorSchema = new schema.Entity('productColors');

const postPartProductsSchema = new schema.Entity('postPartProducts', {
    Product: productSchema,
    ProductColor: productColorSchema,
});

const postPartsSchema = new schema.Entity('postParts', {
    PostPartProducts: [postPartProductsSchema],
});

const userSchema = new schema.Entity('users');

const fullPostSchema = new schema.Entity('posts', {
    PostParts: [postPartsSchema],
    User: userSchema
});

module.exports = {
    postSchema,
    fullPostSchema,
};
