'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Sessions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            sessionId: {
                type: Sequelize.STRING(255),
                allowNull: false,
                uniq: true,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                uniq: false,
            },
            data: {
                type: Sequelize.STRING(2047),
                allowNull: true,
                uniq: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('Sessions');
    }
};