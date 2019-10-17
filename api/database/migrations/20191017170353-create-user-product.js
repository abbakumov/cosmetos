module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('UserProducts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
					model: 'Users',
					key: 'id',
				},
            },
            productId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
					model: 'Products',
					key: 'id',
				},
            },
            review: {
                allowNull: true,
                type: Sequelize.STRING(1023),
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            }
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('UserProducts');
    }
};