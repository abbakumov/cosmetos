const {ProductColor} = require('../../database/models');

module.exports = async function deleteAdminProductColor(ctx) {
    const {id} = ctx.params;

    await ProductColor.destroy({
        where: {id}
    });

    ctx.body = {
        status: 'success',
    };
};
