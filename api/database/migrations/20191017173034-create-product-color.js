module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('ProductColors', {
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
                    model: 'Products',
                    key: 'id',
                },
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING(255),
            },
            colorHex: {
                allowNull: true,
                type: Sequelize.STRING(6),
            },
            picture: {
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
            },
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('ProductColors');
    }
};