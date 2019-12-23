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

    const product = Object.keys(products).reduce(
        (acc, id) => ({
            ...acc,
            [id]: {
                ..._.pick(products[id], ['id', 'title']),
                brand: brands[products[id].Brand].titleFull,
                smallPicUrl: products[id].ProductPictures.length
                    ? makeProductPicUrl(products[id].ProductPictures[0].picture)
                    : ''
            },
        }),
        {}
    );

    ctx.body = {
        total: count,
        ids: normalizedData.result,
        product,
    };
};
