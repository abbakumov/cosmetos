const {Post, PostPart, PostPartProduct, UnassignedProduct} = require('../../database/models');

/**
 * If there is productId and no productColorText, then product is assigned anyway
 * @param {Object} productInfo
 * @param {number} productInfo.productId
 * @param {string} productInfo.productColorText
 */
function checkIfAssigned({productId, productColorText}) {
    return !!productId && !productColorText;
}

module.exports = async function postPostProduct(ctx) {
    const {
        postPartId,
        brandText,
        brandId,
        productText,
        productId,
        productColorText,
        productColorId,
    } = ctx.request.body;


    // ACCESS CHECK
    const {user} = ctx.req;
    const postPart = await PostPart.findByPk(
        postPartId,
        {
            attributes: ['postId'],
            include: [{
                model: Post,
                attributes: ['userId']
            }],
        }
    );
    const postOwnerId = postPart.Post.userId;
    if (!user || (!user.isAdmin && user.id !== postOwnerId)) {
        ctx.res.statusCode = 401;
        ctx.body = {status: 'fail'};
        return;
    }

    if (!checkIfAssigned({productId, productColorText})) {
        const {id: unassignedProductId} = await UnassignedProduct.create({
            brandId,
            brandText,
            productId,
            productText,
            productColorText,
        });
        const {id: postPartProductId} = await PostPartProduct.create({
            postPartId,
            unassignedProductId,
        });
        ctx.body = {
            status: 'success',
            unassignedProductId,
            postPartProductId,
        };
        return;
    }

    const {id: postPartProductId} = await PostPartProduct.create({
        postPartId,
        productId,
        productColorId,
    });
    ctx.body = {status: 'success', postPartProductId};
};
