const Router = require('koa-router');

const {upload} = require('./helpers/multerSetup');
const adminOnly = require('./helpers/adminOnly');

const getBlog = require('./controllers/getBlog');
const getPost = require('./controllers/getPost');
const getProduct = require('./controllers/getProduct');
const getProductColors = require('./controllers/getProductColors');
const postProductComment = require('./controllers/postProductComment');
const getBrandProducts = require('./controllers/getBrandProducts');
const deleteUnProduct = require('./controllers/deleteUnProduct');

const postLogin = require('./controllers/postLogin');

// /postEdit
const getPostEdit = require('./controllers/postEdit/getPostEdit');
const postPostPublish = require('./controllers/postEdit/postPostPublish');
const postPostEdit = require('./controllers/postEdit/postPostEdit');
const postPostProduct = require('./controllers/postEdit/postPostProduct');
const deletePostProduct = require('./controllers/postEdit/deletePostProduct');
const deletePostPart = require('./controllers/postEdit/deletePostPart');
const postPostPart = require('./controllers/postEdit/postPostPart');

// /admin
const getAdminUnProducts = require('./controllers/admin/getAdminUnProducts');
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
        route: '/post/:id/publish',
        method: 'post',
        controllers: [postPostPublish],
    },
    {
        route: '/post',
        method: 'post',
        controllers: [upload.single('pictureFile'), postPostEdit],
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
        route: '/product/:id/comment',
        method: 'post',
        controllers: [postProductComment],
    },
    {
        route: '/post-product',
        method: 'post',
        controllers: [postPostProduct],
    },
    {
        route: '/post-product/:id',
        method: 'delete',
        controllers: [deletePostProduct],
    },
    {
        route: '/post-part/:id',
        method: 'delete',
        controllers: [deletePostPart],
    },
    {
        route: '/brand/:id/products',
        method: 'get',
        controllers: [getBrandProducts],
    },
    {
        route: '/un-product/:id',
        method: 'delete',
        controllers: [deleteUnProduct],
    },
    {
        route: '/login',
        method: 'post',
        controllers: [postLogin],
    },

    //admin
    {
        route: '/admin/un-product',
        method: 'get',
        controllers: [
            adminOnly,
            getAdminUnProducts
        ],
    },
    {
        route: '/admin/brands',
        method: 'get',
        controllers: [
            adminOnly,
            getAdminBrands
        ],
    },
    {
        route: '/admin/brands',
        method: 'post',
        controllers: [
            adminOnly,
            postAdminBrand
        ],
    },
    {
        route: '/admin/product',
        method: 'get',
        controllers: [
            adminOnly,
            getAdminProducts
        ],
    },
    {
        route: '/admin/product/:id',
        method: 'get',
        controllers: [
            adminOnly,
            getAdminProduct
        ],
    },
    {
        route: '/admin/product',
        method: 'post',
        controllers: [
            adminOnly,
            upload.single('pictureFile'),
            postAdminProduct
        ],
    },
    {
        route: '/admin/product-color',
        method: 'post',
        controllers: [
            adminOnly,
            upload.single('pictureFile'),
            postAdminProductColor
        ],
    },
    {
        route: '/admin/product-color/:id',
        method: 'delete',
        controllers: [
            adminOnly,
            deleteAdminProductColor
        ],
    },
];

function makeRouter() {
    const router = new Router();
    routes.forEach(({route, method, controllers}) =>
        router[method](`/api${route}`, ...controllers));

    return router;
}

module.exports = makeRouter;
