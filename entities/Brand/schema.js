const {schema} = require('normalizr');

const brandSchema = new schema.Entity('brands');

module.exports = {
    brandSchema,
};
