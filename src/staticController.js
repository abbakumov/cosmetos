const send = require('koa-send');

async function staticController(ctx) {
    await send(ctx, ctx.path, {root: '.'});
}

module.exports = {
    staticController,
};
