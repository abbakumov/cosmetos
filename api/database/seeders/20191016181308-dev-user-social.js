module.exports = {
    up(queryInterface) {
        return queryInterface.bulkInsert(
            'UserSocials', 
            [
                {
                    userId: 1,
                    instaLogin: 'elizabethioda',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ],
            {}
        );
    },
};
