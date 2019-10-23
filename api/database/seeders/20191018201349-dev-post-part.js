module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert(
            'PostParts',
            [
                {
                    title: 'Губы',
                    positionX: 0.3,
                    positionY: 0.4,
                    colorHex: 'cccccc',
                    postId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Глаза',
                    positionX: 0.7,
                    positionY: 0.6,
                    colorHex: '777777',
                    postId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'Губы',
                    positionX: 0.3,
                    positionY: 0.4,
                    colorHex: 'cccccc',
                    postId: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },
};
