
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            login: {
                type: Sequelize.STRING(31),
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            avatarPicture: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            bio: {
                type: Sequelize.STRING(1023),
                allowNull: true,
            },
            passwordHash: {
                type: Sequelize.STRING(1023),
                allowNull: false,
            },
            isAdmin: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
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
        return queryInterface.dropTable('Users');
    }
};