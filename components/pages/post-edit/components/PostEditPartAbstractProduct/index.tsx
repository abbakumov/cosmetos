import React, {FC} from 'react';

import {getProductType, getProductId} from '../../../../../entities/AbstractProduct/helpers';
import {AbstractProductId} from '../../../../../entities/AbstractProduct/types';

import PostEditPartAsProductContainer from '../PostEditPartAsProductContainer';
import PostEditPartUnProductContainer from '../PostEditPartUnProductContainer';

export interface PostEditPartAbstractProductProps {
    id: AbstractProductId
}

const PostEditPartAbstractProduct: FC<PostEditPartAbstractProductProps> = (props: PostEditPartAbstractProductProps) => {
    const productType = getProductType(props.id);
    const numberId = getProductId(props.id);

    switch (productType) {
        case 'ASSIGNED':
            return <PostEditPartAsProductContainer id={numberId} />;

        case 'UNASSIGNED':
            return <PostEditPartUnProductContainer id={numberId} />;
    }

    return null;
}

export default PostEditPartAbstractProduct;
