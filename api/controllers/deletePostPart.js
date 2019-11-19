const {PostPart} = require('../database/models');

module.exports = async function deletePostPart(ctx) {
    const {id} = ctx.params;

    await PostPart.destroy({
        where: {id},
    });

    ctx.body = {
        status: 'success',
    };
};
