module.exports = (sequelize, DataTypes) => {
    const UserProduct = sequelize.define('UserProduct', {
        userId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        productId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        review: {
            allowNull: false,
            type: DataTypes.STRING(1023),
        },
    }, {});

    UserProduct.associate = function(models) {
        UserProduct.belongsTo(models.Product);
        UserProduct.belongsTo(models.User);
    };

    return UserProduct;
};