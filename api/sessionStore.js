const {Session} = require('./database/models');

const store = {
    async get(sessionId) {
        const session = await Session.findOne({
            where: {sessionId},
        });

        if (session) {
            return JSON.parse(session.data);
        } else {
            return null;
        }
    },
    async set(sessionId, data, maxAge, {changed}) {
        if (!changed) {return;}

        const serializedData = JSON.stringify(data);
        const userId = data.passport ? data.passport.user : null;

        const session = await Session.findOne({
            where: {sessionId},
        });

        if (session) {
            await session.update({
                data: serializedData,
                userId,
            });
        } else {
            await Session.create({
                sessionId,
                userId,
                data: serializedData,
            });
        }
    },
    async destroy(sessionId) {
        await Session.destroy({
            where: {sessionId},
        });
    }
};

module.exports = {store};
