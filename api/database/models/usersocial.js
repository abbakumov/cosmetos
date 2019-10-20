module.exports = (sequelize, DataTypes) => {
    const UserSocial = sequelize.define('UserSocial', {
        userId: DataTypes.INTEGER,
        instaLogin: DataTypes.STRING(127),
    }, {});

    UserSocial.associate = function(models) {
        UserSocial.belongsTo(models.User, { foreignKey: 'userId' });
    };

    return UserSocial;
};
