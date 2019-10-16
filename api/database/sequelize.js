const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'cosmetos-dev', // db name
    'postgres', // db login
    'postgres', // db password
    {
        host: '127.0.0.1',
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
