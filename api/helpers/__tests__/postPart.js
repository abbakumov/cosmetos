const {getPartProductIds} = require('../postPart');

describe('method getPartProductIds', () => {
    const partMock = {
        PostPartProducts: [1, 2, 3],
    };
    const postPartProductsMock = {
        1: {
            Product: 1,
        },
        2: {
            UnassignedProduct: 1,
        },
        3: {
            Product: 2,
        },
    };

    test('with correct data', () => {
        expect(getPartProductIds(partMock, postPartProductsMock)).toEqual(['a1', 'u1', 'a2']);
    });

    test('with empty objects arguments', () => {
        expect(getPartProductIds({}, {})).toEqual([]);
    });

    test('with no arguments', () => {
        expect(getPartProductIds()).toEqual([]);
    });
});
