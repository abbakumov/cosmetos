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
const {checkRequiredKeys, envKeys} = require('./configs/environment');
const {sessionConfig} = require('./configs/sessionConfig');
const {staticController, cropController} = require('./src/staticController');

require('./api/authentication/passport');

(async function() {
    // check all environment keys
    checkRequiredKeys();

    let app, handle;

    const server = new Koa();

    server.use(logger());

    // Router with API routes
    const router = makeRouter();

    // serve cropped static files
    router.get('/static/crop/*', cropController);

    // serve static files
    router.get('/static/*', staticController);

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
    server.keys = [envKeys.COSMETOS_SECRET];
    server.use(session(sessionConfig, server));

    // setting up passport for authentication
    server.use(passport.initialize());
    server.use(passport.session());

    server.use(router.routes());

    server.listen(port, () => console.log(`> Ready on http://localhost:${port}`));
})();
