// const sharp = require('sharp');

const {Product, ProductPicture} = require('../../database/models');

module.exports = async function postAdminProduct(ctx) {
    // TODO: validate data

    const {id, title, kind, description, brandId} = ctx.request.body;

    // create or update product
    let product = null;
    const createOrUpdateParams = [{title, kind, description, brandId}];
    if (id) {
        product = await Product.findByPk(
            id,
            {attributes: ['id']}
        );

        if (!product) {
            // if no product was founded
            ctx.res.statusCode = 404;
            return;
        }

        await product.update(...createOrUpdateParams)
    } else {
        product = await Product.create(...createOrUpdateParams);
    }

    // creating or updating picture
    const {file} = ctx.request;
    if (file) {
        const picture = await ProductPicture.findOne({
            where: {productId: product.id},
            attributes: ['id']
        });
    
        const pictureParams = {picture: file.filename};
        if (picture) {
            await picture.update(pictureParams);
        } else {
            await ProductPicture.create({
                ...pictureParams,
                order: 0,
                productId: product.id,
            });
        }
    }

    ctx.body = {
        status: 'success',
        productId: product.id,
    };
}
