const _ = require('lodash');

const {Post, PostPart} = require('../../database/models');

module.exports = async function postPostPart(ctx) {
    const {id, title, position, color} = ctx.request.body;
    const {postId: strPostId} = ctx.params;

    const postId = parseInt(strPostId, 10);


    // ACCESS CHECK
    const post = await Post.findByPk(
        postId,
        {attributes: ['userId']}
    );
    const {user} = ctx.req;
    if (!user || (!user.isAdmin && user.id !== post.userId)) {
        ctx.res.statusCode = 401; // TODO: status doesn't work
        ctx.body = {status: 'fail'};
        return;
    }


    const partParams = {
        title,
        positionX: position.x / 100,
        positionY: position.y / 100,
        colorHex: color,
        postId,
    };

    let partId;
    if (id) {
        // edit
        await PostPart.update(
            partParams,
            {
                where: {id}
            }
        );
        partId = parseInt(id);
    } else {
        // new
        postPart = await PostPart.create(partParams);
        partId = postPart.id;
    }

    ctx.body = {
        status: 'success',
        partId,
    };
};
