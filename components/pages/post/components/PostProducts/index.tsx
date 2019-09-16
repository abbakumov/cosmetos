import {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'next/link';

import {AppState} from '../../../../../store';
import {PostId} from '../../../../../entities/PostBase/types';
import {PostPartId} from '../../../../../entities/PostPart/types';

import PostProductsPart from '../PostProductsPart';

export interface PostProductsPublicProps {
    id: PostId;
}

interface PostProductsProps {
    partIds: PostPartId[];
}

class PostProducts extends Component<PostProductsProps> {
    render() {
        const {partIds} = this.props;

        return (
            <div>
                {partIds.map(id => (
                    <PostProductsPart key={id} id={id} />
                ))}
            </div>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: PostProductsPublicProps): PostProductsProps {
    const {id} = ownProps;

    const postExtra = state.postExtra.items[id];
    const {partIds} = postExtra;

    return {
        partIds,
    };
}

const ConnectedPostProducts = connect(mapStateToProps)(PostProducts);

export default ConnectedPostProducts;