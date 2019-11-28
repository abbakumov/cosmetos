const {Post, PostPart, PostPartProduct} = require('../../database/models');

module.exports = async function deletePostProduct(ctx) {
    const {id} = ctx.params;

    // ACCESS CHECK
    const {user} = ctx.req;
    const postPartProduct = await PostPartProduct.findByPk(
        id,
        {
            attributes: ['postPartId'],
            include: [{
                model: PostPart,
                attributes: ['postId'],
                include: [{
                    model: Post,
                    attributes: ['userId']
                }],
            }],
        }
    );

    const postOwnerId = postPartProduct.PostPart.Post.userId;
    if (!user || (!user.isAdmin && user.id !== postOwnerId)) {
        ctx.res.statusCode = 401;
        ctx.body = {status: 'fail'};
        return;
    }

    await PostPartProduct.destroy({
        where: {id},
    });

    ctx.body = {
        status: 'success',
    };
};
