const {normalize} = require('normalizr');
const _ = require('lodash');

const {userSchema} = require('../../entities/Blog/schema');
const {makeUserAvatarUrl} = require('../../entities/Blog/helpers');
const {makePostSmallPicUrl} = require('../../entities/Post/helpers');
const {User, UserSocial, Post} = require('../database/models');

module.exports = async function getBlog(ctx) {
    const {login} = ctx.params;
    const {offset = '0'} = ctx.request.query;

    // check if not public posts are available
    const {user} = ctx.req;
    const isAdminOrOwner = !!user && (user.isAdmin || user.login === login);
    const postWhere = {};
    if (!isAdminOrOwner) {
        postWhere.isPublic = true;
    }

    const parsedOffset = parseInt(offset, 10);

    // data fetching
    const data = await User.findOne({
        where: {login},
        attributes: ['id', 'login', 'name', 'avatarPicture'],
        include: [
            {
                model: UserSocial,
                attributes: ['instaLogin'],
            },
            {
                model: Post,
                limit: 10,
                offset: parsedOffset,
                order: [['createdAt', 'DESC']],
                attributes: ['id', 'title', 'picture', 'isPublic'],
                where: postWhere,
            },
        ],
    });

    const postsTotal = await Post.count({
        where: {userId: data.id},
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

    const blogItem = {
        ..._.pick(userEntity, ['login', 'name']),
        imageUrl: makeUserAvatarUrl(userEntity.avatarPicture),
    };
    const blog = {
        data: {
            [blogItem.login]: blogItem,
        },
        currentLogin: user ? user.login : null,
    };
    if (user) {
        const currentUserItem = {
            ..._.pick(user, ['login', 'name']),
            imageUrl: makeUserAvatarUrl(user.avatarPicture),
        };
        blog.data[currentUserItem.login] = currentUserItem;
    }

    const blogExtra = {
        ..._.pick(userEntity, ['login']),
        postIds: userEntity.Posts,
        instagramLogin: userEntity.UserSocial.instaLogin,
        postsTotal,
    };

    const postEntities = Object.keys(posts).map(id => posts[id]);

    const postsBaseMap = postEntities.map(post => ({
        ..._.pick(post, ['id', 'title', 'isPublic']),
        imageUrl: makePostSmallPicUrl(post.picture),
        authorLogin: blogItem.login,
    }));
    const postsBase = _.keyBy(postsBaseMap, 'id');

    const result = {
        blog,
        blogExtra,
        postsBase,
    };

    ctx.body = result;
};
