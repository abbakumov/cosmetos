import {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'next/link';

import {AppState} from '../../../../../store';
import {PostId} from '../../../../../entities/Post/types';
import {PostPartId} from '../../../../../entities/PostPart/types';

import PostPicturePart from '../PostPicturePart';

const styles = require('./styles.styl');

export interface PostPicturePublicProps {
    id: PostId;
}

interface PostPictureProps {
    imageUrl: string,
    partIds: PostPartId[];
}

class PostPicture extends Component<PostPictureProps> {
    render() {
        const {imageUrl, partIds} = this.props;

        return (
            <div className={styles.root}>
                <img className={styles.image} src={imageUrl} />
                <div className={styles.partsContainer}>
                    {partIds.map(partId => (
                        <PostPicturePart key={partId} id={partId}/>
                    ))}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: PostPicturePublicProps): PostPictureProps {
    const {id} = ownProps;

    const postExtra = state.postExtra.items[id];

    const {imageUrlBig, partIds} = postExtra;

    return {
        imageUrl: imageUrlBig,
        partIds
    };
}

const ConnectedPostPicture = connect(mapStateToProps)(PostPicture);

export default ConnectedPostPicture;