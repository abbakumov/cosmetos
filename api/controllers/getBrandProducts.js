
const {
    Product,
    Brand,
} = require('../database/models');

module.exports = async function getBrandProducts(ctx) {
    const {id} = ctx.params;

    const productsDataPromise = Product.findAll({
        where: {
            brandId: id,
        },
        attributes: ['id', 'kind', 'title'],
    });
    const brandDataPromise = Brand.findByPk(
        id,
        {attributes: ['titleShort']}
    );

    const [productsData, brandData] = await Promise.all([productsDataPromise, brandDataPromise]);

    const plainData = JSON.parse(JSON.stringify(productsData));

    const productIds = plainData.map(product => product.id);

    const brandProducts = {
        id: parseInt(id, 10),
        productIds,
    };

    const productBase = plainData.reduce(
        (acc, product) => ({
            ...acc,
            [product.id]: {
                ... product,
                brand: brandData.titleShort,
                smallPicUrl: '', // TODO: do something
            },
        }),
        {}
    );

    ctx.body = {brandProducts, productBase};
};
