const {Post} = require('../database/models');

module.exports = async function postPostEdit(ctx) {
    const {user} = ctx.req;

    const {id, title, instaPostId, description, isPublic} = ctx.request.body;
    const {file} = ctx.request;

    // ACCESS CHECK
    // this checks if post owned by current user if it's already exist (post)
    let isExistingPostOwner = !id; // no id = no existing post
    if (id) {
        const post = await Post.findByPk(id, {attributes: ['userId']});
        const postOwnerUserId = post.userId;
        isExistingPostOwner = postOwnerUserId === user.id;
    }

    if (!user || user.isAdmin || !isExistingPostOwner) {
        ctx.res.statusCode = 401;
        ctx.body = {status: 'fail'};
        return;
    }

    const postFields = {
        title,
        instaPostId,
        description,
        userId: user.id,
        isPublic: isPublic === 'true',
    };

    if (file) {
        postFields.picture = file.filename;
    }

    let post = null;
    if (id) {
        // update
        await Post.update(
            postFields,
            {
                where: {id}
            }
        );
    } else {
        // new
        post = await Post.create(postFields);
    }

    ctx.body = {
        status: 'success',
        postId: post ? post.id : parseInt(id),
    };
}
