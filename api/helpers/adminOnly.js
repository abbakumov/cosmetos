module.exports = async function adminOnlyMiddleware(ctx, next) {

    if (ctx.isAuthenticated() && ctx.req.user.isAdmin) {
        await next();
    } else {
        ctx.res.statusCode = 403;
    }
}
