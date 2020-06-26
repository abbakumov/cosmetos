const {Post} = require('../../database/models');

module.exports = async function postPostEdit(ctx) {
    const {user} = ctx.req;

    const {id, title, instaPostId, description, isPublic: _isPublic} = ctx.request.body;
    const {file} = ctx.request;

    // ACCESS CHECK
    // this checks if post owned by current user if post already exists
    let isExistingPostOwner = !id; // no id = no existing post
    if (id) {
        const {userId} = await Post.findByPk(id, {attributes: ['userId']});
        const postOwnerUserId = userId;
        isExistingPostOwner = postOwnerUserId === user.id;
    }

    if (!user || (!user.isAdmin && !isExistingPostOwner)) {
        ctx.res.statusCode = 401;
        ctx.body = {status: 'fail'};
        return;
    }

    const post = await Post.findByPk(id, {
        attributes: ['userId', 'isPublic', 'firstPublishedAt', 'wasPublished'],
    });

    const isPublic = _isPublic === 'true';
    const postFields = {
        title,
        instaPostId,
        description,
        userId: user.id,
        isPublic,
    };

    const isFirstTimePublication = isPublic && (!!post && !post.wasPublished);
    if (isFirstTimePublication) {
        postFields.firstPublishedAt = new Date();
        postFields.wasPublished = true;
    }

    if (file) {
        postFields.picture = file.filename;
    }

    let newPost = null;
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
        newPost = await Post.create(postFields);
    }

    ctx.body = {
        status: 'success',
        postId: newPost ? newPost.id : parseInt(id),
    };
}
