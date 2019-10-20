module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        title: DataTypes.STRING(255),
        picture: DataTypes.STRING(255),
        userId: DataTypes.INTEGER,
        instaUrl: DataTypes.STRING(255),
        description: DataTypes.STRING(1023),
    }, {});

    Post.associate = function(models) {
        Post.belongsTo(models.User, { foreignKey: 'userId' });
        Post.hasMany(models.PostPart);
    };

    return Post;
};