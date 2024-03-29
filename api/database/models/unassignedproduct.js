module.exports = (sequelize, DataTypes) => {
	const UnassignedProduct = sequelize.define('UnassignedProduct', {
		brandId: {
            allowNull: true,
            type: DataTypes.INTEGER,
        },
		brandText: {
            allowNull: true,
            type: DataTypes.STRING,
        },
		productId: {
            allowNull: true,
            type: DataTypes.INTEGER,
        },
		productText: {
            allowNull: true,
            type: DataTypes.STRING,
        },
		productColorText: {
            allowNull: true,
            type: DataTypes.STRING,
        },
    }, {});

	UnassignedProduct.associate = function(models) {
        UnassignedProduct.belongsTo(models.Product, { foreignKey: 'productId' });
        UnassignedProduct.belongsTo(models.Brand, { foreignKey: 'brandId' });
        UnassignedProduct.hasOne(models.PostPartProduct, { foreignKey: 'unassignedProductId' });
    };

	return UnassignedProduct;
};