const makeProductColorPicUrl = pic => pic ? `/static/uploads/${pic}` : null;

module.exports = {
    makeProductColorPicUrl,
};
