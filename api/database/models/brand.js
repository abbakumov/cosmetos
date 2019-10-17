module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define('Brand', {
        titleShort: {
            allowNull: false,
            type: DataTypes.STRING(255),
        },
        titleFull: {
            allowNull: false,
            type: DataTypes.STRING(255),
        },
    }, {});

    Brand.associate = function(models) {
        Brand.hasMany(models.Product);
    };

    return Brand;
};