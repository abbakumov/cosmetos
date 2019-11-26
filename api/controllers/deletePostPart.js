const {Post, PostPart} = require('../database/models');

module.exports = async function deletePostPart(ctx) {
    const {id} = ctx.params;

    // ACCESS CHECK
    const {user} = ctx.req;
    const postPart = await PostPart.findByPk(
        id,
        {
            attributes: [],
            include: [{
                model: Post,
                attributes: ['userId']
            }],
        },
    );
    const postOwnerId = postPart.Post.userId;
    if (!user.isAdmin && postOwnerId !== user.id) {
        ctx.res.statusCode = 401;
        ctx.body = {status: 'fail'};
        return;
    }

    await PostPart.destroy({
        where: {id},
    });

    ctx.body = {status: 'success'};
};
