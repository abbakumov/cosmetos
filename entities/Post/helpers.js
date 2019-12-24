const {cropPic} = require('../../src/helpers/cropPic');

const makePostPicUrl = picture => `/static/uploads/${picture}`;
const makePostSmallPicUrl = picture => `/static/crop/${cropPic(picture, 350)}`;
const makePostBigPicUrl = picture => `/static/crop/${cropPic(picture, 740)}`;

module.exports = {
    makePostPicUrl,
    makePostSmallPicUrl,
    makePostBigPicUrl,
};
