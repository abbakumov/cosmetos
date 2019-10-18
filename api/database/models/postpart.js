module.exports = (sequelize, DataTypes) => {
    const PostPart = sequelize.define('PostPart', {
        title: {
            allowNull: false,
            type: DataTypes.STRING(255),
        },
        positionX: {
            allowNull: true,
            type: DataTypes.FLOAT,
        },
        positionY: {
            allowNull: true,
            type: DataTypes.FLOAT,
        },
        colorHex: {
            allowNull: true,
            type: DataTypes.STRING(6),
        },
        postId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
    }, {});

    PostPart.associate = function(models) {
        PostPart.belongsTo(models.Post);
        PostPart.hasMany(models.PostPartProduct);
    };

    return PostPart;
};
