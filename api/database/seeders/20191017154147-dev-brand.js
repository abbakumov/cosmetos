module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'Brands', 
            [
                {
                    titleShort: 'Nyx',
                    titleFull: 'Nyx Cosmetics',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ],
            {}
        );
    },
};
