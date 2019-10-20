const {schema} = require('normalizr');
const {postSchema} = require('../PostBase/schema');

const userSchema = new schema.Entity('users', {
    Posts: [postSchema],
});

module.exports = {
    userSchema,
};
