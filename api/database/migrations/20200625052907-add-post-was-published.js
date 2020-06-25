'use strict';

/**
 * Describes if post already was published.
 * That info is used to change firstPublishAt when post is published at the first time.
 */

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            'Posts',
            'wasPublished',
            {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
        );
        return queryInterface.sequelize.query(
            'UPDATE "Posts" SET "wasPublished" = true;'
        );
    },
    down: queryInterface =>
        queryInterface.removeColumn(
            'Posts',
            'wasPublished',
        ),
};
