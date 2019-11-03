const {normalize} = require('normalizr');

const {brandSchema} = require('../../../entities/Brand/schema');
const {Brand} = require('../../database/models');

module.exports = async function getAdminBrands(ctx, ) {
    // data fetching
    const data = await Brand.findAll({
        limit: 50,
        attributes: ['id', 'titleShort', 'titleFull'],
    });

    const plainData = JSON.parse(JSON.stringify(data));

    // normalization
    const normalizedBrands = normalize(
        plainData,
        [brandSchema]
    );

    // fields mapping
    const brand = normalizedBrands.entities.brands;
    const ids = normalizedBrands.result;

    ctx.body = {brand, ids};
};
