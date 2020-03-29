const {normalize} = require('normalizr');
const _ = require('lodash');

const {
    UnassignedProduct,
    Brand,
    Product,
    PostPartProduct,
    PostPart,
    Post,
    User,
} = require('../../database/models');

const {unProductSchema} = require('../../../entities/UnProduct/schema');
const {brandSchema} = require('../../../entities/Brand/schema');

module.exports = async function getUnProducts(ctx) {
    const unProductsDataPromise = UnassignedProduct.findAll({
        attributes: ['id', 'brandId', 'brandText', 'productId', 'productText', 'productColorText'],
        include: [
            {
                model: Product,
                attributes: ['id', 'title', 'kind', 'description', 'brandId'],
            },
            {
                model: PostPartProduct,
                attributes: ['id', 'postPartId'],
                include: [{
                    model: PostPart,
                    attributes: ['id', 'postId'],
                    include: [{
                        model: Post,
                        attributes: ['id', 'title', 'userId'],
                        include: [{
                            model: User,
                            attributes: ['id', 'name'],
                        }],
                    }],
                }],
            },
        ],
    });

    const brandsDataPromise = Brand.findAll({
        attributes: ['id', 'titleShort', 'titleFull'],
    });

    const [unProductsData, brandsData] = await Promise.all([unProductsDataPromise, brandsDataPromise]);

    const plainUnProductsData = JSON.parse(JSON.stringify(unProductsData));
    const plainBrandsData = JSON.parse(JSON.stringify(brandsData));

    const normalizedUnProductsData = normalize(plainUnProductsData, [unProductSchema]);
    const normalizedBrandsData = normalize(plainBrandsData, [brandSchema]);

    const unProductIds = normalizedUnProductsData.result;

    const entities = _.defaultsDeep({},
        normalizedUnProductsData.entities,
        normalizedBrandsData.entities,
    );

    const {
        products = {},
        unProducts = {},
        brands = {},
    } = entities;

    const productsArr = Object.values(products)
        .map(productEntity => ({
            ..._.pick(productEntity, ['id', 'kind', 'title']),
            brand: brands[productEntity.brandId].titleShort,
            smallPicUrl: '',
        }));
    const productBase = _.keyBy(productsArr, 'id');

    const unProductsArr = Object.values(unProducts)
        .map(unProduct => _.pick(unProduct, ['id', 'brandId', 'brandText', 'productId', 'productText', 'productColorText']));
    const unProduct = _.keyBy(unProductsArr, 'id');

    const brandsArr = Object.values(brands).map(brand => _.pick(brand, ['id', 'titleShort', 'titleFull']));
    const brand = _.keyBy(brandsArr, 'id');

    const unProductExtraArr = Object.values(unProducts).map(unProduct => {
        const post = unProduct.PostPartProduct.PostPart.Post;
        const user = post.User;
        return {
            id: unProduct.id,
            userName: user.name,
            postId: post.id,
            postTitle: post.title,
        };
    });
    const unProductExtra = _.keyBy(unProductExtraArr, 'id');

    ctx.body = {
        unProductIds,
        productBase,
        unProduct,
        brand,
        unProductExtra,
    };
}
