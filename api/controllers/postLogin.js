const passport = require('koa-passport');

module.exports = function postLogin(ctx) {
    return passport.authenticate('local', (error, user) => {
        if (user && !error) {
            ctx.login(user);
            ctx.body = {
                status: 'success',
                login: user.login,
                isAdmin: user.isAdmin,
            };
        } else {
            ctx.status = 400;
            ctx.body = {
                status: 'fail',
            };
        }
    })(ctx);
}
