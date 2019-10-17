module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        title: {
            allowNull: false,
            type: Sequelize.STRING(255),
        },
        kind: {
            allowNull: true,
            type: Sequelize.STRING(255),
        },
        description: {
            allowNull: true,
            type: Sequelize.STRING(1023),
        },
        brandId: {
            allowNull: false,
            type: Sequelize.INTEGER,
        },
    }, {});

    Product.associate = function(models) {
        Product.belongsTo(models.Brand);
    };

    return Product;
};