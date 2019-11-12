module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert(
            'Posts', 
            [
                {
                    title: 'Sleeping beauty Aurora',
                    picture: 'liza_1.png',
                    userId: 1,
                    instaPostId: 'B2OjZ88nP01',
                    description: 'Ну допустим какое-то описание первого поста Лизы',
                    isPublic: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Снова Дейнерис',
                    picture: 'liza_2.png',
                    userId: 1,
                    instaPostId: 'B2OjZ88nP01',
                    description: 'А тут допустим описание второго поста',
                    isPublic: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },
};
