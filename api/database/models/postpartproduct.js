module.exports = (sequelize, DataTypes) => {
    const PostPartProduct = sequelize.define('PostPartProduct', {
        postPartId: {
            allowNull: true,
            type: DataTypes.INTEGER,
        },
        productId: {
            allowNull: true,
            type: DataTypes.INTEGER,
        },
        productColorId: {
            allowNull: true,
            type: DataTypes.INTEGER,
        },
        unassignedProductId: {
            allowNull: true,
            type: DataTypes.INTEGER,
        },
    }, {});

    PostPartProduct.associate = function(models) {
        PostPartProduct.belongsTo(models.PostPart, { foreignKey: 'postPartId' });
        PostPartProduct.belongsTo(models.Product, { foreignKey: 'productId' });
        PostPartProduct.belongsTo(models.ProductColor, { foreignKey: 'productColorId' });
        PostPartProduct.belongsTo(models.UnassignedProduct, { foreignKey: 'unassignedProductId' });
    };

    return PostPartProduct;
};