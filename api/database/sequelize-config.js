module.exports = {
    "development": {
        "username": process.env.PG_LOGIN,
        "password": process.env.PG_PASSWORD,
        "database": "cosmetos-dev",
        "host": process.env.PG_HOST,
        "dialect": "postgres",
        "operatorsAliases": false
    },
    "production": {
        "username": process.env.PG_LOGIN,
        "password": process.env.PG_PASSWORD,
        "database": "cosmetos-production",
        "host": process.env.PG_HOST,
        "dialect": "postgres",
        "operatorsAliases": false
    }
};
