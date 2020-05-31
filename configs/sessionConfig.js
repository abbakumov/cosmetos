const {store} = require('../api/sessionStore');

const sessionConfig = {
    maxAge: 1000 * 60 * 60 * 24 * 365, // one year to expire
    store,
};

module.exports = {
    sessionConfig,
};
