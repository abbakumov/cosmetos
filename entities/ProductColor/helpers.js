const {cropPic} = require('../../src/helpers/cropPic');

const makeProductColorPicUrl = pic => pic ? `/static/uploads/${pic}` : null;
const makeProductColorSmallPicUrl = pic => pic ? `/static/crop/${cropPic(pic, 110)}` : null;

module.exports = {
    makeProductColorPicUrl,
    makeProductColorSmallPicUrl,
};
