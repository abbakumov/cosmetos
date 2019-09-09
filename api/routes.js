const Router = require('koa-router');

const getBlog = require('./controllers/getBlog');

const routes = [
    {
        route: '/blog/:name',
        method: 'get',
        controller: getBlog,
    },
];

function makeRouter() {
    const router = new Router();
    routes.forEach(({route, method, controller}) =>
        router[method](`/api${route}`, controller));

    return router;
}

module.exports = makeRouter;
