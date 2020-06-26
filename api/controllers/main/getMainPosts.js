const _ = require('lodash');
const {normalize} = require('normalizr');
const {fullPostSchema} = require('../../../entities/Post/schema');
const {makeUserAvatarUrl} = require('../../../entities/Blog/helpers');
const {makePostSmallPicUrl} = require('../../../entities/Post/helpers');

const {User, Post} = require('../../database/models');

module.exports = async function getMainPosts(ctx) {
    const {offset = '0'} = ctx.request.query;

    const parsedOffset = parseInt(offset, 10);

    const postData = await Post.findAll({
        limit: 10,
        offset: parsedOffset,
        order: [['firstPublishedAt', 'DESC']],
        where: {isPublic: true},
        attributes: ['id', 'title', 'picture', 'userId', 'isPublic'],
        include: [{
            model: User,
            attributes: ['id', 'login', 'name', 'avatarPicture'],
        }],
    });

    const pureData = JSON.parse(JSON.stringify(postData));

    const {
        result: postIds,
        entities,
    } = normalize(pureData, [fullPostSchema]);

    const {
        users = {},
        posts = {},
    } = entities;

    const blogArr = Object.values(users).map(user => ({
        ..._.pick(user, ['login', 'name']),
        imageUrl: makeUserAvatarUrl(user.avatarPicture),
    }));
    const blogMap = _.keyBy(blogArr, 'login');
    const blog = {
        data: blogMap,
        currentLogin: ctx.req.user ? ctx.req.user.login : null,
    };

    const postArr = Object.values(posts).map(post => ({
        ..._.pick(post, ['id', 'title', 'isPublic']),
        imageUrl: makePostSmallPicUrl(post.picture),
        authorLogin: users[post.userId].login,
    }));
    const post = _.keyBy(postArr, 'id');

    ctx.body = {
        postIds,
        blog,
        post,
        isMoreAvailable: !postIds.includes(1),
    };
};
