
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Posts', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			title: {
				allowNull: false,
				type: Sequelize.STRING(255),
			},
			picture: {
				allowNull: false,
				type: Sequelize.STRING(255)
			},
			userId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: 'Users',
					key: 'id',
				},
			},
			instaPostId: {
				allowNull: false,
				type: Sequelize.STRING(255),
			},
			description: {
				allowNull: true,
				type: Sequelize.STRING(1023),
			},
			isPublic: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
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
		return queryInterface.dropTable('Posts');
	}
};