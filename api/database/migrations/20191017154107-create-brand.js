module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Brands', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            titleShort: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING(255),
            },
            titleFull: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING(255),
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
        return queryInterface.dropTable('Brands');
    }
};