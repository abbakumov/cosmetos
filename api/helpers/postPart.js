function getPartProductIds(part, postPartProducts) {
    // many kinds of incorrect data
    if (
        !part
        || !Array.isArray(part.PostPartProducts)
        || typeof postPartProducts !== 'object'
    ) {
        return [];
    }

    return part.PostPartProducts.map(id => {
        if (postPartProducts[id].Product) {
            return 'a' + postPartProducts[id].Product;
        } else {
            return 'u' + postPartProducts[id].UnassignedProduct;
        }
    });
}

module.exports = {
    getPartProductIds,
};
