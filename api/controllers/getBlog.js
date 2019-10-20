const {normalize} = require('normalizr');
const _ = require('lodash');

const {userSchema} = require('../../entities/Blog/schema');
const {makeUserAvatarUrl} = require('../../entities/Blog/helpers');
const {makePostPicUrl} = require('../../entities/PostBase/helpers');
const {User, UserSocial, Post} = require('../database/models');

module.exports = async function getBlog(ctx) {
    const {login} = ctx.params;

    // data fetching
    const data = await User.findOne({
        where: {
            login,
        },
        limit: 10,
        include: [
            { model: UserSocial },
            { model: Post },
        ],
    });

    const plainData = JSON.parse(JSON.stringify(data));

    // normalization
    const nomalizedUser = normalize(
        plainData,
        userSchema
    );

    // fields mapping
    const {users, posts} = nomalizedUser.entities;
    const userEntity = users[nomalizedUser.result];

    const user = {
        ..._.pick(userEntity, ['login', 'name']),
        imageUrl: makeUserAvatarUrl(userEntity.avatarPicture),
        postIds: userEntity.Posts,
        instagramLogin: userEntity.UserSocial.instaLogin,
    };

    const postEntities = Object.keys(posts).map(id => posts[id]);

    const postsBase = postEntities.map(post => ({
        ..._.pick(post, ['id', 'title']),
        imageUrl: makePostPicUrl(post.picture),
        authorLogin: user.login,
    })).reduce(
        (acc, post) => ({
            ...acc,
            [post.id]: post,
        }),
        {}
    );

    const result = {
        blog: user,
        postsBase,
    };

    ctx.body = result;
};
