const {normalize} = require('normalizr');
const _ = require('lodash');

const {userSchema} = require('../../entities/Blog/schema');
const {makeUserAvatarUrl} = require('../../entities/Blog/helpers');
const {makePostSmallPicUrl} = require('../../entities/Post/helpers');
const {User, UserSocial, Post} = require('../database/models');

module.exports = async function getBlog(ctx) {
    const {login} = ctx.params;

    // data fetching
    const data = await User.findOne({
        where: {login},
        attributes: ['login', 'name', 'avatarPicture'],
        include: [
            {
                model: UserSocial,
                attributes: ['instaLogin'],
            },
            {
                model: Post,
                limit: 10,
                attributes: ['id', 'title', 'picture', 'isPublic'],
            },
        ],
    });

    if (data.isAdmin) {
        ctx.res.statusCode = 404;
        return;
    }

    const plainData = JSON.parse(JSON.stringify(data));

    // normalization
    const nomalizedUser = normalize(
        plainData,
        userSchema
    );

    // fields mapping
    const {
        users,
        posts = {},
    } = nomalizedUser.entities;
    const userEntity = users[nomalizedUser.result];

    const blog = {
        ..._.pick(userEntity, ['login', 'name']),
        imageUrl: makeUserAvatarUrl(userEntity.avatarPicture),
    };

    const blogExtra = {
        ..._.pick(userEntity, ['login']),
        postIds: userEntity.Posts,
        instagramLogin: userEntity.UserSocial.instaLogin,
    };

    const postEntities = Object.keys(posts).map(id => posts[id]);

    const postsBaseMap = postEntities.map(post => ({
        ..._.pick(post, ['id', 'title', 'isPublic']),
        imageUrl: makePostSmallPicUrl(post.picture),
        authorLogin: blog.login,
    }));
    const postsBase = _.keyBy(postsBaseMap, 'id');

    const result = {
        blog,
        blogExtra,
        postsBase,
    };

    ctx.body = result;
};
