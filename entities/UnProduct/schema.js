const {schema} = require('normalizr');

const brandSchema = new schema.Entity('brands');

const productSchema = new schema.Entity('products');

const unProductSchema = new schema.Entity('unProducts', {
    Brand: brandSchema,
    Product: productSchema,
});

module.exports = {
    unProductSchema,
};
