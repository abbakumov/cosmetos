module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'PostPartProducts',
            [
                {
                    postPartId: 1,
                    productId: 1,
                    productColorId: 1,
                    unassignedProductId: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    postPartId: 1,
                    productId: 2,
                    productColorId: 5,
                    unassignedProductId: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    postPartId: 2,
                    productId: 3,
                    productColorId: 9,
                    unassignedProductId: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    postPartId: 3,
                    productId: 3,
                    productColorId: 8,
                    unassignedProductId: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },
};
