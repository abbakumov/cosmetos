const {PostPartProduct} = require('../database/models');

module.exports = async function deletePostProduct(ctx) {
    const {id} = ctx.params;

    await PostPartProduct.destroy({
        where: {id},
    });

    ctx.body = {
        status: 'success',
    };
};
