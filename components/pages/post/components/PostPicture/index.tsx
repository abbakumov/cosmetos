import {Component} from 'react';
import {connect} from 'react-redux';

import {AppState} from '../../../../../store';
import {PostId} from '../../../../../entities/Post/types';
import {PostPartId} from '../../../../../entities/PostPart/types';

import {postPageToggleIsPicPartsOpenAction} from '../../state/actions';

import PostPicturePart from '../PostPicturePart';

const styles = require('./styles.styl');

export interface PostPictureProps {
    id: PostId;
}

interface MappedProps {
    imageUrl: string,
    partIds: PostPartId[];
}

interface ActionProps {
    toggleIsPicPartsOpenAction(): void;
}

interface Props extends MappedProps, ActionProps {}

class PostPicture extends Component<Props> {
    onPartsContainerClick = () => this.props.toggleIsPicPartsOpenAction();

    render() {
        const {imageUrl, partIds} = this.props;

        return (
            <div className={styles.root}>
                <img className={styles.image} src={imageUrl} />
                <div
                    className={styles.partsContainer}
                    onClick={this.onPartsContainerClick}
                >
                    {partIds.map(partId => (
                        <PostPicturePart key={partId} id={partId}/>
                    ))}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: PostPictureProps): MappedProps {
    const {id} = ownProps;

    const postExtra = state.postExtra.items[id];

    const {imageUrlBig, partIds} = postExtra;

    return {
        imageUrl: imageUrlBig,
        partIds
    };
}

const actionProps = {
    toggleIsPicPartsOpenAction: postPageToggleIsPicPartsOpenAction,
};

const ConnectedPostPicture = connect(mapStateToProps, actionProps)(PostPicture);

export default ConnectedPostPicture;