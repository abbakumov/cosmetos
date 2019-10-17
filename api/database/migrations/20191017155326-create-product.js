module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING(255),
            },
            kind: {
                allowNull: true,
                type: Sequelize.STRING(255),
            },
            description: {
                allowNull: true,
                type: Sequelize.STRING(1023),
            },
            brandId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
					model: 'Brands',
					key: 'id',
				},
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
        return queryInterface.dropTable('Products');
    }
};