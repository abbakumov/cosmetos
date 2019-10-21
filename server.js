const Koa = require('koa');
const next = require('next');
const Router = require('koa-router');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const serverOnly = process.env.COS_SERVER_ONLY === '1';

const makeRouter = require('./api/routes');

const defaultStatucCodeMiddleware = async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
}

(async function() {
    let app, handle;

    const server = new Koa();

    // default status code
    server.use(defaultStatucCodeMiddleware);

    // Router with API routes
    const router = makeRouter();

    if (!serverOnly) {
        app = next({dev});
        handle = app.getRequestHandler();
        await app.prepare();

        // Next routes
        router.get('*', async ctx => {
            await handle(ctx.req, ctx.res);
            ctx.respond = false;
        });
    }

    server.use(router.routes());

    server.listen(port, () => console.log(`> Ready on http://localhost:${port}`));
})();
