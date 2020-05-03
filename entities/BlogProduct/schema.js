const {schema} = require('normalizr');

const userSchema = new schema.Entity('users');
const productSchema = new schema.Entity('products');

const blogProductSchema = new schema.Entity('blogProducts', {
    User: userSchema,
    Product: productSchema,
});

module.exports = {
    blogProductSchema,
};
