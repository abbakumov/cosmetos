const Router = require('koa-router');
const {upload} = require('./helpers/multerSetup');

const getBlog = require('./controllers/getBlog');
const getPost = require('./controllers/getPost');
const getPostEdit = require('./controllers/getPostEdit');
const postPostEdit = require('./controllers/postPostEdit');
const postPostAddProduct = require('./controllers/postPostAddProduct');
const postPostPart = require('./controllers/postPostPart');
const getProduct = require('./controllers/getProduct');
const getProductColors = require('./controllers/getProductColors');
const getBrandProducts = require('./controllers/getBrandProducts');

const getUnProducts = require('./controllers/admin/getUnProducts');
const getAdminBrands = require('./controllers/admin/getAdminBrands');
const postAdminBrand = require('./controllers/admin/postAdminBrand');
const getAdminProducts = require('./controllers/admin/getAdminProducts');
const getAdminProduct = require('./controllers/admin/getAdminProduct');
const postAdminProduct = require('./controllers/admin/postAdminProduct');
const postAdminProductColor = require('./controllers/admin/postAdminProductColor');
const deleteAdminProductColor = require('./controllers/admin/deleteAdminProductColor');

const routes = [
    {
        route: '/blog/:login',
        method: 'get',
        controllers: [getBlog],
    },
    {
        route: '/post/:id',
        method: 'get',
        controllers: [getPost],
    },
    {
        route: '/post/:id/edit',
        method: 'get',
        controllers: [getPostEdit],
    },
    {
        route: '/post',
        method: 'post',
        controllers: [upload.single('pictureFile'), postPostEdit],
    },
    {
        route: '/post/:id/add-product',
        method: 'post',
        controllers: [postPostAddProduct],
    },
    {
        route: '/post/:postId/part',
        method: 'post',
        controllers: [postPostPart],
    },
    {
        route: '/product/:id',
        method: 'get',
        controllers: [getProduct],
    },
    {
        route: '/product/:id/colors',
        method: 'get',
        controllers: [getProductColors],
    },
    {
        route: '/brand/:id/products',
        method: 'get',
        controllers: [getBrandProducts],
    },

    //admin
    {
        route: '/admin/un-products',
        method: 'get',
        controllers: [getUnProducts],
    },
    {
        route: '/admin/brands',
        method: 'get',
        controllers: [getAdminBrands],
    },
    {
        route: '/admin/brands',
        method: 'post',
        controllers: [postAdminBrand],
    },
    {
        route: '/admin/product',
        method: 'get',
        controllers: [getAdminProducts],
    },
    {
        route: '/admin/product/:id',
        method: 'get',
        controllers: [getAdminProduct],
    },
    {
        route: '/admin/product',
        method: 'post',
        controllers: [upload.single('pictureFile'), postAdminProduct],
    },
    {
        route: '/admin/product-color',
        method: 'post',
        controllers: [upload.single('pictureFile'), postAdminProductColor],
    },
    {
        route: '/admin/product-color/:id',
        method: 'delete',
        controllers: [deleteAdminProductColor],
    },
];

function makeRouter() {
    const router = new Router();
    routes.forEach(({route, method, controllers}) =>
        router[method](`/api${route}`, ...controllers));

    return router;
}

module.exports = makeRouter;
