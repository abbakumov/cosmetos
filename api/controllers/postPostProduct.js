const {PostPartProduct} = require('../database/models');

module.exports = async function postPostProduct(ctx) {
    const {
        postPartId,
        productId,
        productColorId,
    } = ctx.request.body;

    const result = await PostPartProduct.create({
        postPartId,
        productId,
        productColorId,
    });

    ctx.body = {
        status: 'success',
        postPartProductId: result.id,
    };
};
