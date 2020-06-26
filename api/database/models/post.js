module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        title: DataTypes.STRING(255),
        picture: DataTypes.STRING(255),
        userId: DataTypes.INTEGER,
        instaPostId: DataTypes.STRING(255),
        description: DataTypes.STRING(1023),
        isPublic: DataTypes.BOOLEAN,
        firstPublishedAt: DataTypes.DATE,
        wasPublished: DataTypes.BOOLEAN,
    }, {});

    Post.associate = function(models) {
        Post.belongsTo(models.User, { foreignKey: 'userId' });
        Post.hasMany(models.PostPart, { foreignKey: 'postId' });
    };

    return Post;
};