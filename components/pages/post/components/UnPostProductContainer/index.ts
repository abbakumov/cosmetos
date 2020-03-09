import {connect} from 'react-redux';

import {UnProductId} from '../../../../../entities/UnProduct/types';
import {PostPartId} from '../../../../../entities/PostPart/types';
import {AppState} from '../../../../../store';

import PostProduct, {PostProductProps} from '../PostProduct';

export interface UnPostProductProps {
    id: UnProductId
    partId: PostPartId
    backIndex: number
    isShown: boolean
}

function mapStateToProps(state: AppState, props: UnPostProductProps): PostProductProps {
    const {id, backIndex, isShown} = props;

    return {
        brand: '',
        title: '',
        color: '',
        backIndex,
        isShown,
    };
}

const UnPostProductContainer = connect(mapStateToProps)(PostProduct);

export default UnPostProductContainer;
