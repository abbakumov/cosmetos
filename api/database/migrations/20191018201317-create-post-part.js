module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('PostParts', {
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
            positionX: {
                allowNull: true,
                type: Sequelize.FLOAT,
            },
            positionY: {
                allowNull: true,
                type: Sequelize.FLOAT,
            },
            colorHex: {
                allowNull: true,
                type: Sequelize.STRING(6),
            },
            postId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Posts',
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
        return queryInterface.dropTable('PostParts');
    }
};