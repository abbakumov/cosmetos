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
        PostPartProduct.belongsTo(models.PostPart);
        PostPartProduct.belongsTo(models.Product);
        PostPartProduct.belongsTo(models.ProductColor);
        PostPartProduct.belongsTo(models.UnassignedProduct);
    };

    return PostPartProduct;
};