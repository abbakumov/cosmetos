const {Post} = require('../../database/models');

module.exports = async function postPostEdit(ctx) {
    const {user} = ctx.req;

    const {id} = ctx.params;

    // ACCESS CHECK
    // this checks if post owned by current user or if user is admin
    const {userId} = await Post.findByPk(id, {attributes: ['userId']});
    const postOwnerUserId = userId;
    if (!user || (!user.isAdmin && postOwnerUserId !== user.id)) {
        ctx.res.statusCode = 401;
        ctx.body = {status: 'fail'};
        return;
    }


    const post = await Post.findByPk(id, {
        attributes: ['id', 'wasPublished'],
    });

    const postNewData = {isPublic: true};
    if (!post.wasPublished) {
        postNewData.firstPublishedAt = new Date();
        postNewData.wasPublished = true;
    }

    await Post.update(postNewData, { where: {id}});

    ctx.body = {
        status: 'success',
        postId: post ? post.id : parseInt(id),
    };
}
