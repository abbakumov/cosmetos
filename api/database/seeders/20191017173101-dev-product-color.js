module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert(
            'ProductColors',
            [
                {
                    productId: 1,
                    name: 'Синий первого продукта',
                    colorHex: '0000ff',
                    picture: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    productId: 1,
                    name: 'Красный первого продукта',
                    colorHex: 'ff0000',
                    picture: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    productId: 1,
                    name: 'Зеленый первого продукта',
                    colorHex: '00ff00',
                    picture: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    productId: 2,
                    name: 'Синий второго продукта',
                    colorHex: '0000ff',
                    picture: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    productId: 2,
                    name: 'Красный второго продукта',
                    colorHex: 'ff0000',
                    picture: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    productId: 2,
                    name: 'Зеленый второго продукта',
                    colorHex: '00ff00',
                    picture: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    productId: 3,
                    name: 'Синий третьего продукта',
                    colorHex: '0000ff',
                    picture: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    productId: 3,
                    name: 'Красный третьего продукта',
                    colorHex: 'ff0000',
                    picture: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    productId: 3,
                    name: 'Зеленый третьего продукта',
                    colorHex: '00ff00',
                    picture: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },
};
