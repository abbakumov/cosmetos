function getPartProductIds(part, postPartProducts) {
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
