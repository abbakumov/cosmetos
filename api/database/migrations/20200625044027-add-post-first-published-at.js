'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            'Posts',
            'firstPublishedAt',
            {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date(),
            },
        );
        return queryInterface.sequelize.query(
            'UPDATE "Posts" SET "firstPublishedAt" = "createdAt";'
        );
    },
    down: queryInterface =>
        queryInterface.removeColumn(
            'Posts',
            'firstPublishedAt',
        ),
};
