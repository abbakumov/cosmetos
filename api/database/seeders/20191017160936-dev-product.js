module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert(
            'Products',
            [
                {
                    title: 'SHINE KILLER 01',
                    kind: 'Матирующий праймер',
                    description: 'Первый матирующий праймер в сидах',
                    brandId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'SHINE KILLER 02',
                    kind: 'Матирующий праймер',
                    description: 'Второй матирующий праймер в сидах',
                    brandId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    title: 'SHINE KILLER 03',
                    kind: 'Матирующий праймер',
                    description: 'Третий матирующий праймер в сидах',
                    brandId: 1,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },
};
