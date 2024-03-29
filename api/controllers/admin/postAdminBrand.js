const _ = require('lodash');

const {Brand} = require('../../database/models');

module.exports = async function postAdminBrand(ctx) {
    try {
        const data = ctx.request.body;
        const {id} = data;

        let result;

        if (id) {
            result = await Brand.update(
                data,
                {where: {id}}
            );
        } else {
            result = await Brand.create(_.pick(data, ['titleShort', 'titleFull']));
        }

        ctx.body = {
            status: 'success',
            brandId: result.id || id,
        };
    } catch (err) {
        console.error(err);
        ctx.body = {
            status: 'fail',
        };
    }
}
