const {
    UserProduct,
} = require('../database/models');

module.exports = async function postLogin(ctx) {
    const {user} = ctx.req;
    const {id: productId} = ctx.params;
    const {text} = ctx.request.body;

    if (!user || user.isAdmin) {
        ctx.body = {status: 'fail'};
        return;
    }

    const userId = user.id;

    const userProductUpdatedParams = {
        userId: user.id,
        productId,
        review: text,
    };

    let userProduct = await UserProduct.findOne({
        where: {productId, userId},
    });

    try {
        if (userProduct) {
            await userProduct.update(userProductUpdatedParams);
        } else {
            userProduct = await UserProduct.create(userProductUpdatedParams);
        }
    } catch (e) {
        ctx.body = {status: 'fail'};
        return;
    }

    ctx.body = {
        status: 'success',
        id: userProduct.id,
    };
}