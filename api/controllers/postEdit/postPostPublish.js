const {Post} = require('../../database/models');

module.exports = async function postPostEdit(ctx) {
    const {user} = ctx.req;

    const {id} = ctx.params;

    // ACCESS CHECK
    // this checks if post owned by current user or if user is admin
    const post = await Post.findByPk(id, {attributes: ['userId']});
    const postOwnerUserId = post.userId;
    if (!user || (!user.isAdmin && postOwnerUserId !== user.id)) {
        ctx.res.statusCode = 401;
        ctx.body = {status: 'fail'};
        return;
    }

    await Post.update({isPublic: true}, {where: {id}});

    ctx.body = {
        status: 'success',
        postId: post ? post.id : parseInt(id),
    };
}
