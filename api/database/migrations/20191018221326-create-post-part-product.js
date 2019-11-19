module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('PostPartProducts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            postPartId: {
                allowNull: true,
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'PostParts',
                    key: 'id',
                },
            },
            productId: {
                allowNull: true,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Products',
                    key: 'id',
                },
            },
            productColorId: {
                allowNull: true,
                type: Sequelize.INTEGER,
                references: {
                    model: 'ProductColors',
                    key: 'id',
                },
            },
            unassignedProductId: {
                allowNull: true,
                type: Sequelize.INTEGER,
                references: {
                    model: 'UnassignedProducts',
                    key: 'id',
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('PostPartProducts');
    }
};