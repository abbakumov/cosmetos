module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert(
            'UserProducts',
            [
                {
                    userId: 1,
                    productId: 1,
                    review: 'Всем привет, это мой обзор на первый продукт!',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    userId: 1,
                    productId: 2,
                    review: 'А это уже обзор на второй продукт!',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    userId: 1,
                    productId: 3,
                    review: 'А эээто обзор на третий!',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },
};
