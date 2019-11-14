const _ = require('lodash');

const {PostPart} = require('../database/models');

module.exports = async function postPostAddProduct(ctx) {
    const {id, title, position, color} = ctx.request.body;
    const {postId: strPostId} = ctx.params;

    const postId = parseInt(strPostId, 10);

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
