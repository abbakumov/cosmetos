const {schema} = require('normalizr');

const postSchema = new schema.Entity('posts');

module.exports = {
    postSchema,
};
