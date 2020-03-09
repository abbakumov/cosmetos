import {ProductId} from '../ProductBase/types';
import {UnProductId} from '../UnProduct/types';

import {AbstractProductId, AbstractProductType} from './types';

export function getProductType(id: AbstractProductId): AbstractProductType | null {
    const idFirstChar = id[0];

    switch (idFirstChar) {
        case 'a':
            return 'ASSIGNED';

        case 'u': 
            return 'UNASSIGNED';
    }

    return null;
}

export function getProductId(id: AbstractProductId): ProductId | UnProductId {
    return parseInt(id.substr(1), 10);
}
