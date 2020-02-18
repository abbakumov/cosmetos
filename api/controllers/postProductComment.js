const {
    UserProduct,
} = require('../database/models');

module.exports = async function postLogin(ctx) {
    const {user} = ctx.req;
    const {id: productId} = ctx.params;
    const {review} = ctx.request.body;

    if (!user || user.isAdmin) {
        ctx.body = {status: 'fail'};
        return;
    }

    const userId = user.id;

    const userProductUpdatedParams = {
        userId: user.id,
        productId,
        review,
    };

    let userProduct = await UserProduct.findOne({
        where: {productId, userId},
    });

    try {
        if (userProduct) {
            await userProduct.update(userProductUpdatedParams);
            console.log('updated userProduct: ', userProduct);
        } else {
            userProduct = await UserProduct.create(userProductUpdatedParams);
            console.log('created userProduct: ', userProduct);
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