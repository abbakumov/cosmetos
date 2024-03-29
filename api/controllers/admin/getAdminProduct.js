const {normalize} = require('normalizr');
const _ = require('lodash');

const {Product, Brand,  ProductColor, ProductPicture} = require('../../database/models');
const {productSchema} = require('../../../entities/ProductBase/schema');
const {makeProductPicUrl} = require('../../../entities/ProductBase/helpers');
const {makeProductColorPicUrl} = require('../../../entities/ProductColor/helpers');

module.exports = async function getAdminProduct(ctx) {
    const {id} = ctx.params;

    // data fetching
    const productDataPromise = Product.findByPk(
        id,
        {
            attributes: ['id', 'title', 'kind', 'description', 'brandId'],
            include: [
                {
                    model: ProductColor,
                    attributes: ['id', 'title', 'productId', 'colorHex', 'picture']
                },
                {
                    model: ProductPicture,
                    attributes: ['picture'],
                },
            ],
        },
    );
    const brandsDataPromise = Brand.findAll({
        attributes: ['id', 'titleShort', 'titleFull'],
    });

    const [productData, brandsData] = await Promise.all([productDataPromise, brandsDataPromise]);

    const plainProductData = JSON.parse(JSON.stringify(productData));
    const plainBrandsData = JSON.parse(JSON.stringify(brandsData));

    // data normalization
    const normalizedProduct = normalize(
        plainProductData,
        productSchema,
    );

    const productEntity = normalizedProduct.entities.products[normalizedProduct.result];
    const pictureEntity = productEntity.ProductPictures[0];

    const product = {
        ..._.pick(productEntity, ['id', 'title', 'kind', 'description', 'brandId']),
        colorIds: productEntity.ProductColors,
        pictureUrl: pictureEntity ? makeProductPicUrl(pictureEntity.picture) : null,
    };

    const brandIds = plainBrandsData.map(brand => brand.id);
    const brand = _.keyBy(plainBrandsData, 'id')

    const productColorEntities = normalizedProduct.entities.productColors || {};
    const productColorMap = Object.values(productColorEntities)
        .map(value => ({
            ..._.pick(value, ['id', 'title']),
            picUrl: makeProductColorPicUrl(value.picture),
        }))
    const productColor = _.keyBy(productColorMap, 'id');

    ctx.body = {
        product,
        brandIds,
        brand,
        productColor,
    };
};
