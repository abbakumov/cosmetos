const {schema} = require('normalizr');


const productSchema = new schema.Entity('products');

const unProductSchema = new schema.Entity('unProducts', {
    Product: productSchema,
});

module.exports = {
    unProductSchema,
};
