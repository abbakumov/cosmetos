module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('ProductPictures', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            productId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
					model: 'Product',
					key: 'id',
				},
            },
            order: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            picture: {
                allowNull: false,
                type: Sequelize.STRING(255),
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
        return queryInterface.dropTable('ProductPictures');
    }
};