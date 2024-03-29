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
                    passwordHash: '$2b$10$ChThhiGLykr3PJWf2TIevu2q/gxQA4DC1KazVV4VWUEatgi6d4YUG', // pass (10 rounds salt)
                    isAdmin: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    login: 'katekry',
                    name: 'Крючкова Екатерина',
                    avatarPicture: 'user_1.jpg',
                    bio: 'Админ',
                    passwordHash: '$2b$10$ChThhiGLykr3PJWf2TIevu2q/gxQA4DC1KazVV4VWUEatgi6d4YUG', // pass (10 rounds salt)
                    isAdmin: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },
};
