const {cropPic} = require('../../src/helpers/cropPic');

const makeProductPicUrl = pic => `/static/uploads/${pic}`;
const makeProductSmallPicUrl = pic => `/static/crop/${cropPic(pic, 112)}`;
const makeProductBigPicUrl = pic => `/static/crop/${cropPic(pic, 740)}`;

module.exports = {
    makeProductPicUrl,
    makeProductSmallPicUrl,
    makeProductBigPicUrl,
};
