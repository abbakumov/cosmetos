module.exports = (sequelize, DataTypes) => {
    const ProductPicture = sequelize.define('ProductPicture', {
        productId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        order: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        picture: {
            allowNull: false,
            type: DataTypes.STRING(255),
        },
    }, {});

    ProductPicture.associate = function(models) {
        ProductPicture.belongsTo(models.Product);
    };

    return ProductPicture;
};