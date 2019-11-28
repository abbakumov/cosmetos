const {Post, PostPart, PostPartProduct} = require('../../database/models');

module.exports = async function postPostProduct(ctx) {
    const {
        postPartId,
        productId,
        productColorId,
    } = ctx.request.body;


    // ACCESS CHECK
    const {user} = ctx.req;
    const postPart = await PostPart.findByPk(
        postPartId,
        {
            attributes: ['postId'],
            include: [{
                model: Post,
                attributes: ['userId']
            }],
        }
    );
    const postOwnerId = postPart.Post.userId;
    if (!user || (!user.isAdmin && user.id !== postOwnerId)) {
        ctx.res.statusCode = 401;
        ctx.body = {status: 'fail'};
        return;
    }


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
