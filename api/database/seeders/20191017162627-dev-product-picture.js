module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'ProductPictures',
            [
                {
                    productId: 1,
                    order: 1,
                    picture: 'nyx_shine_killer.png',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    productId: 2,
                    order: 1,
                    picture: 'nyx_shine_killer.png',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    productId: 3,
                    order: 1,
                    picture: 'nyx_shine_killer.png',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },
};
