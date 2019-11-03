module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define('Brand', {
        titleShort: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING(255),
        },
        titleFull: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING(255),
        },
    }, {});

    Brand.associate = function(models) {
        Brand.hasMany(models.Product, { foreignKey: 'brandId' });
        Brand.hasMany(models.UnassignedProduct, { foreignKey: 'brandId' });
    };

    return Brand;
};