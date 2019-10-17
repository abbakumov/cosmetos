module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        title: {
            allowNull: false,
            type: DataTypes.STRING(255),
        },
        kind: {
            allowNull: true,
            type: DataTypes.STRING(255),
        },
        description: {
            allowNull: true,
            type: DataTypes.STRING(1023),
        },
        brandId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
    }, {});

    Product.associate = function(models) {
        Product.belongsTo(models.Brand);
    };

    return Product;
};