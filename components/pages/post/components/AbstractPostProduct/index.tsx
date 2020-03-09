import {FC} from 'react';

import {PostPartId} from '../../../../../entities/PostPart/types';
import {AbstractProductId} from '../../../../../entities/AbstractProduct/types';
import {getProductType, getProductId} from '../../../../../entities/AbstractProduct/helpers';

import AsPostProductContainer from '../AsPostProductContainer';
import UnPostProductContainer from '../UnPostProductContainer';

interface AbstractPostProductProps {
    id: AbstractProductId
    partId: PostPartId
    backIndex: number
    isShown: boolean
}

const AbstractPostProduct: FC<AbstractPostProductProps> = (props: AbstractPostProductProps) => {
    const productType = getProductType(props.id);
    const numberId = getProductId(props.id);

    switch (productType) {
        case 'ASSIGNED':
            return <AsPostProductContainer {...props} id={numberId} />;

        case 'UNASSIGNED':
            return <UnPostProductContainer {...props} id={numberId} />
    }

    return null;
};

export default AbstractPostProduct;
