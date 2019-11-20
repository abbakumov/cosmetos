const {Post} = require('../database/models');

module.exports = async function postPostEdit(ctx) {
    const {id, title, instaPostId, description, isPublic} = ctx.request.body;
    const {file} = ctx.request;

    const postFields = {
        title,
        instaPostId,
        description,
        userId: 1, // TODO: add user info
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
