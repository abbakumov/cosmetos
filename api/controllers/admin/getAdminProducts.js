const {normalize} = require('normalizr');
const _ = require('lodash');
const {Op} = require('sequelize');

const {productSchema} = require('../../../entities/ProductBase/schema');
const {makeProductPicUrl} = require('../../../entities/ProductBase/helpers');

const {Product, Brand, ProductPicture} = require('../../database/models');

module.exports = async function getAdminProducts(ctx) {
    const {query} = ctx.request;
    const limit = query.limit > 100 ? 100 : query.limit;
    const {offset, filterTitle} = query;

    const where = {};
    if (filterTitle) {
        where.title = {
            [Op.iLike]: `%${filterTitle}%`,
        };
    }

    // data fetching
    const {count, rows} = await Product.findAndCountAll({
        where,
        limit,
        offset,
        order: [['id', 'ASC']],
        attributes: ['id', 'title'],
        include: [
            {
                model: Brand,
                attributes: ['id', 'titleFull'],
            },
            {
                model: ProductPicture,
                attributes: ['id', 'picture'],
            }
        ],
    });

    const plainData = JSON.parse(JSON.stringify(rows));

    // normalization
    const normalizedData = normalize(
        plainData,
        [productSchema]
    );

    // fields mapping
    const {products = {}, brands = {}} = normalizedData.entities;

    const productMap = Object.values(products).map(value => ({
        ..._.pick(value, ['id', 'title']),
        brand: brands[value.Brand].titleFull,
        smallPicUrl: value.ProductPictures.length
            ? makeProductPicUrl(value.ProductPictures[0].picture)
            : ''
    }));
    const product = _.keyBy(productMap, 'id');

    ctx.body = {
        total: count,
        ids: normalizedData.result,
        product,
    };
};
