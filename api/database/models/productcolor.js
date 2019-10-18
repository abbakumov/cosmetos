module.exports = (sequelize, DataTypes) => {
    const ProductColor = sequelize.define('ProductColor', {
        productId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING(255),
        },
        colorHex: {
            allowNull: false,
            type: DataTypes.STRING(6),
        },
        picture: {
            allowNull: false,
            type: DataTypes.STRING(255),
        },
    }, {});

    ProductColor.associate = function(models) {
        ProductColor.belongsTo(models.Product);
        ProductColor.hasMany(models.PostPartProduct);
    };

    return ProductColor;
};