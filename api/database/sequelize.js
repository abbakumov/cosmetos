const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.NODE_ENV === 'production' ? 'cosmetos-production' : 'cosmetos-dev', // db name
    process.env.PG_LOGIN,
    process.env.PG_PASSWORD,
    {
        host: process.env.PG_HOST,
        dialect: 'postgres',
    }
);

sequelize
    .authenticate()
        .then(() => {
            console.log('PostgreSQL connection has been established successfully.');
        })
        .catch(err => {
            console.error('PostgreSQL unable to connect to the database:', err);
        });

module.exports = {
    sequelize,
};
