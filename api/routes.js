const Router = require('koa-router');

const getBlog = require('./controllers/getBlog');
const getPost = require('./controllers/getPost');
const getProduct = require('./controllers/getProduct');

const routes = [
    {
        route: '/blog/:name',
        method: 'get',
        controller: getBlog,
    },
    {
        route: '/post/:id',
        method: 'get',
        controller: getPost,
    },
    {
        route: '/product/:id',
        method: 'get',
        controller: getProduct,
    },
];

function makeRouter() {
    const router = new Router();
    routes.forEach(({route, method, controller}) =>
        router[method](`/api${route}`, controller));

    return router;
}

module.exports = makeRouter;
