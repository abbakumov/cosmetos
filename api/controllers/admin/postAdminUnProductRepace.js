const _ = require('lodash');
const {sequelize} = require('../../database/sequelize');

const {
    UnassignedProduct,
    PostPartProduct,
} = require('../../database/models');

module.exports = async function postAdminUnProductRepace(ctx) {
    const {id: unassignedProductId} = ctx.params;
    const {productId, productColorId} = ctx.request.body;

    const postPartProduct = await PostPartProduct.findOne({
        where: {unassignedProductId}
    });

    const transaction = await sequelize.transaction();

    try {
        postPartProduct.productId = productId;
        if (productColorId) {
            postPartProduct.productColorId = productColorId;
        }
        postPartProduct.unassignedProductId = null;
        await postPartProduct.save({transaction});

        await UnassignedProduct.destroy({
            where: {id: unassignedProductId},
            transaction,
        });

        await transaction.commit();
    } catch (e) {
        console.log(e);
        await transaction.rollback();

        ctx.body = {status: 'fail'};
        return;
    }

    ctx.body = {status: 'success'};
}
