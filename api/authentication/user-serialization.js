const passport = require('koa-passport');
const {User} = require('../database/models');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findByPk(id);

    if (user) {
        done(null, user);
    } else {
        done(
            new Error(`No user with id: ${id}`),
            null
        );
    }
});
