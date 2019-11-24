const Koa = require('koa');
const logger = require('koa-logger');
const session = require('koa-session');
const passport = require('koa-passport');
const next = require('next');
const bodyParser = require('koa-bodyparser');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const serverOnly = process.env.COS_SERVER_ONLY === '1';

const makeRouter = require('./api/routes');
const {checkRequiredKeys} = require('./configs/environment');

require('./api/authentication/passport');

const defaultStatusCodeMiddleware = async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
}

(async function() {
    // check all environment keys
    checkRequiredKeys();

    let app, handle;

    const server = new Koa();

    server.use(logger());

    // default status code
    server.use(defaultStatusCodeMiddleware);

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

    server.use(bodyParser()); // parse json data

    // setting up a session
    const secretKey = process.env.COSMETOS_SECRET;
    if (!secretKey) {
        throw Error('Provide env variable COSMETOS_SECRET for sessions');
    }
    server.keys = [secretKey];
    server.use(session(server));

    // setting up passport for authentication
    server.use(passport.initialize());
    server.use(passport.session());

    server.use(router.routes());

    server.listen(port, () => console.log(`> Ready on http://localhost:${port}`));
})();
