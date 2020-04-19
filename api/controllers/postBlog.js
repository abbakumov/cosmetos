const {UserSocial} = require('../database/models')

module.exports = async function postBlog(ctx) {
    const {user} = ctx.req;
    if (!user) {
        ctx.body = {success: 'fail'};
        return;
    }

    const {name, instagramLogin, bio} = ctx.request.body;
    const {file} = ctx.request;

    if (name) {
        user.name = name;
    }
    if (bio) { 
        user.bio = bio;
    }
    if (file) {
        user.avatarPicture = file.filename;
    }
    await user.save();

    if (instagramLogin) {
        const userSocial = await UserSocial.findOne({where: {userId: user.id}});
        if (userSocial) {
            await UserSocial.update(
                {instaLogin: instagramLogin},
                {where: {userId: user.id}}
            );
        } else {
            await UserSocial.create({
                userId: user.id,
                instaLogin: instagramLogin,
            });
        }
    }

    ctx.body = {status: 'success'};
}
