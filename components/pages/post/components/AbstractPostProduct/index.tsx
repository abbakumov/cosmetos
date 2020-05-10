import React, {FC} from 'react';
import {connect} from 'react-redux';

import {PostPartId} from '../../../../../entities/PostPart/types';
import {PostPartProductId, PostPartProduct} from '../../../../../entities/PostPartProduct/types';
import {AppState} from '../../../../../store';

import AsPostProductContainer from '../AsPostProductContainer';
import UnPostProductContainer from '../UnPostProductContainer';

export interface AbstractPostProductProps {
    id: PostPartProductId
    partId: PostPartId
    backIndex: number
    isShown: boolean
}

interface Props extends AbstractPostProductProps, PostPartProduct {}

const AbstractPostProduct: FC<AbstractPostProductProps> = (props: Props) => {
    if (props.unProductId) {
        return (
            <UnPostProductContainer
                id={props.unProductId}
                partId={props.partId}
                backIndex={props.backIndex}
                isShown={props.isShown}
            />
        );
    }

    return (
        <AsPostProductContainer
            id={props.productId}
            productColorId={props.productColorId}
            partId={props.partId}
            backIndex={props.backIndex}
            isShown={props.isShown}
        />
    );
};

const mapStateToProps = (state: AppState, ownProps: AbstractPostProductProps) => {
    return {
        ...ownProps,
        ...state.postPartProduct.items[ownProps.id],
    };
};

const ConnectedAbstractPostProduct = connect(mapStateToProps)(AbstractPostProduct);

export default ConnectedAbstractPostProduct;
