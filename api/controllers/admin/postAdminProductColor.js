const {ProductColor} = require('../../database/models');

module.exports = async function postAdminProductColor(ctx) {
    const {productId, title, colorHex} = ctx.request.body;
    const {file} = ctx.request;

    await ProductColor.create({
        productId,
        title,
        colorHex,
        picture: file.filename,
    });

    ctx.body = {
        status: 'success',
    };
};
