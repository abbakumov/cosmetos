const Router = require('koa-router');

const getBlog = require('./controllers/getBlog');
const getPost = require('./controllers/getPost');
const getPostEdit = require('./controllers/getPostEdit');
const getProduct = require('./controllers/getProduct');

const getUnProducts = require('./controllers/admin/getUnProducts');

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
        route: '/post/:id/edit',
        method: 'get',
        controller: getPostEdit,
    },
    {
        route: '/product/:id',
        method: 'get',
        controller: getProduct,
    },

    //admin
    {
        route: '/admin/un-products',
        method: 'get',
        controller: getUnProducts,
    },
];

function makeRouter() {
    const router = new Router();
    routes.forEach(({route, method, controller}) =>
        router[method](`/api${route}`, controller));

    return router;
}

module.exports = makeRouter;
