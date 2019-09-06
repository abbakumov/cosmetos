const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const makeRouter = require('./api/routes');

app.prepare().then(() => {
    const server = new Koa()

    // default status code
    server.use(async (ctx, next) => {
        ctx.res.statusCode = 200;
        await next();
    })

    // Router with API routes
    const router = makeRouter();

    router.get('/some', ctx => {
        ctx.body = 'Hi!';
    });

    // Next routes
    router.get('*', async ctx => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
    })
    server.use(router.routes());

    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`)
    });
})




//   router.get('/a', async ctx => {
//     await app.render(ctx.req, ctx.res, '/a', ctx.query)
//     ctx.respond = false
//   })
