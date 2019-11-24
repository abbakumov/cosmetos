const passport = require('koa-passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

const {User} = require('../database/models');

const options = {};

const localStrategy = new LocalStrategy(
    options,
    async (login, password, done) => {
        const user = await User.findOne({
            where: {login}
        });

        if (!user) {
            return done(null, false);
        }

        const passwordComparisonResult = await bcrypt.compare(
            password,
            user.passwordHash
        );

        // just to be shure it's boolean value
        if (passwordComparisonResult === true) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }
)

passport.use(localStrategy);
  