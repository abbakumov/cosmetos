const _ = require('lodash');
const {
    Product,
    ProductColor,
} = require('../database/models');

module.exports = async function getProductColors(ctx) {
    const {id} = ctx.params;

    const data = await Product.findByPk(
        id,
        {
            attributes: ['id', 'description'],
            include: [
                {
                    model: ProductColor,
                    attributes: ['id', 'title'],
                },
            ],
        }
    );

    const plainData = JSON.parse(JSON.stringify(data));
    const productColors = plainData.ProductColors;

    const productExtra = {
        ..._.pick(data, ['id', 'description']),
        postIds: [], // TODO: now it's always empty
        bigPicUrl: '', // TODO: this too
        colorIds: productColors.map(color => color.id),
    };

    const productColorMap = productColors.map(color => ({
        ...color,
        picUrl: '', // TODO: and this, yes
    }));
    const productColor = _.keyBy(productColorMap, 'id');

    // it's ok for some fields to be empty
    // if interface will need them, that's easy to do

    ctx.body = {
        productExtra,
        productColor,
    };
}
