const {cropPic} = require('../../src/helpers/cropPic');

const makeUserAvatarUrl = avatarPicture => `/static/crop/${cropPic(avatarPicture, 200, 200)}`;

module.exports = {
    makeUserAvatarUrl,
};
