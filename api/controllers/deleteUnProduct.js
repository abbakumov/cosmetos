const {sequelize} = require('../database/sequelize');

const {UnassignedProduct, PostPartProduct, PostPart, Post} = require('../database/models');

module.exports = async function deleteUnProduct(ctx) {
    const {id: strId} = ctx.params;
    const id = parseInt(strId, 10);

    // CHECK ACCESS
    const unProduct = await UnassignedProduct.findByPk(
        id,
        {
            attributes: ['id'],
            include: [{
                model: PostPartProduct,
                attributes: ['id', 'postPartId'],
                include: [{
                    model: PostPart,
                    attributes: ['id', 'postId'],
                    include: [{
                        model: Post,
                        attributes: ['id', 'userId'],
                    }],
                }],
            }],
        }
    );
    const {userId} = unProduct.PostPartProduct.PostPart.Post;

    if (!ctx.req.user || userId !== ctx.req.user.id) {
        ctx.res.statusCode = 401;
        ctx.body = {status: 'fail'};
        return;
    }

    const postPartProductId = unProduct.PostPartProduct.id;
    await sequelize.transaction(async transaction => {
        await PostPartProduct.destroy({
            where: {id: postPartProductId},
            transaction,
        });

        await UnassignedProduct.destroy({
            where: {id},
            transaction,
        });
    });

    ctx.body = {
        status: 'success',
        postPartProductId,
    };
}
