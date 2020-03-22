const {schema} = require('normalizr');

const postSchema = new schema.Entity('posts');

const brandSchema = new schema.Entity('brands');
const productColorSchema = new schema.Entity('productColors');
const userProductSchema = new schema.Entity('userProducts');

const productSchema = new schema.Entity('products', {
    Brand: brandSchema,
    ProductColors: [productColorSchema],
    UserProducts: [userProductSchema],
});

const unassignedProductSchema = new schema.Entity('unassignedProducts', {
    Brand: brandSchema,
    Product: productSchema,
});

const postPartProductsSchema = new schema.Entity('postPartProducts', {
    Product: productSchema,
    ProductColor: productColorSchema,
    UnassignedProduct: unassignedProductSchema,
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
