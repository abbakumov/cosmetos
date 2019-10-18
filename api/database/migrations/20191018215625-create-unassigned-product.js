module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('UnassignedProducts', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			brandId: {
                allowNull:true,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Brands',
                    key: 'id',
                },
			},
			brandText: {
                allowNull: true,
				type: Sequelize.STRING(255),
			},
			productId: {
                allowNull: true,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Products',
                    key: 'id',
                },
			},
			productText: {
                allowNull: true,
				type: Sequelize.STRING(255),
			},
			productColorText: {
                allowNull: true,
				type: Sequelize.STRING(255),
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
		return queryInterface.dropTable('UnassignedProducts');
	}
};
