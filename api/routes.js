const Router = require('koa-router');

const getBlog = require('./controllers/getBlog');
const getPost = require('./controllers/getPost');
const getPostEdit = require('./controllers/getPostEdit');
const postPostAddProduct = require('./controllers/postPostAddProduct');
const postPostSavePart = require('./controllers/postPostSavePart');
const getProduct = require('./controllers/getProduct');
const getProductColors = require('./controllers/getProductColors');
const getBrandProducts = require('./controllers/getBrandProducts');

const getUnProducts = require('./controllers/admin/getUnProducts');
const getAdminBrands = require('./controllers/admin/getAdminBrands');
const postAdminBrand = require('./controllers/admin/postAdminBrand');
const getAdminProducts = require('./controllers/admin/getAdminProducts');

const routes = [
    {
        route: '/blog/:login',
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
        route: '/post/:id/add-product',
        method: 'post',
        controller: postPostAddProduct,
    },
    {
        route: '/post/:postId/save-part',
        method: 'post',
        controller: postPostSavePart,
    },
    {
        route: '/product/:id',
        method: 'get',
        controller: getProduct,
    },
    {
        route: '/product/:id/colors',
        method: 'get',
        controller: getProductColors,
    },
    {
        route: '/brand/:id/products',
        method: 'get',
        controller: getBrandProducts,
    },

    //admin
    {
        route: '/admin/un-products',
        method: 'get',
        controller: getUnProducts,
    },
    {
        route: '/admin/brands',
        method: 'get',
        controller: getAdminBrands,
    },
    {
        route: '/admin/brands',
        method: 'post',
        controller: postAdminBrand,
    },
    {
        route: '/admin/product',
        method: 'get',
        controller: getAdminProducts,
    },
];

function makeRouter() {
    const router = new Router();
    routes.forEach(({route, method, controller}) =>
        router[method](`/api${route}`, controller));

    return router;
}

module.exports = makeRouter;
