module.exports = {
    up(queryInterface) {
        return queryInterface.bulkInsert(
            'Users', 
            [
                {
                    login: 'elizabethioda',
                    name: 'Elizabeth Ioda',
                    avatarPicture: 'user_1.jpg',
                    bio: 'bio bio bio hey hey hey',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ],
            {}
        );
    },
};
