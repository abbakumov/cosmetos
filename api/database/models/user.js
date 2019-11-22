module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        login: DataTypes.STRING(31),
        name: DataTypes.STRING(255),
        avatarPicture: DataTypes.STRING(255),
        bio: DataTypes.STRING(1023),
        passwordHash: {
            type: DataTypes.STRING(1023),
            allowNull: false,
        },
    }, {});

    User.associate = models => {
        User.hasOne(models.UserSocial, { foreignKey: 'userId' });
        User.hasMany(models.Post, { foreignKey: 'userId' });
        User.hasMany(models.UserProduct, { foreignKey: 'userId' });
    };

    return User;
};
