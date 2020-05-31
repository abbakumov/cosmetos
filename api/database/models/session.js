'use strict';

module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define('Session', {
        sessionId: {
            type: DataTypes.STRING(255),
            allowNull: false,
            uniq: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            uniq: false,
        },
        data: {
            type: DataTypes.STRING(2047),
            allowNull: true,
            uniq: false,
        },
    }, {});

    Session.associate = function(models) {
        Session.belongsTo(models.User, {foreignKey: 'userId'})
    };

    return Session;
};
