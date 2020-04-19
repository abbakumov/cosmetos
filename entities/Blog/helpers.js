const {cropPic} = require('../../src/helpers/cropPic');

const makeUserAvatarUrl = avatarPicture => avatarPicture
    ? `/static/crop/${cropPic(avatarPicture, 200, 200)}`
    : null;

module.exports = {
    makeUserAvatarUrl,
};
