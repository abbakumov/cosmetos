import {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'next/link';

import {AppState} from '../../../../../store';
import {PostPartId} from '../../../../../entities/PostPart/types';
import {Position} from '../../../../../entities/Position';

const styles = require('./styles.styl');

export interface PostPicturePartPublicProps {
    id: PostPartId;
}

interface PostPicturePartProps {
    id: PostPartId;
    position: Position;
    title: string;
    color: string;
    isOpen: boolean;
}

class PostPicturePart extends Component<PostPicturePartProps> {
    render() {
        const {id, position, title, color, isOpen} = this.props;

        const style = {
            left: `${position.x}%`,
            bottom: `${position.y}%`,
        }

        const contentStyle = {
            backgroundColor: color,
        }

        const className = `${styles.root} ${styles.isOpen}`;

        return (
            <div className={className} style={style}>
                <div className={styles.content} style={contentStyle}>
                    {title}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: PostPicturePartPublicProps): PostPicturePartProps {
    const {id} = ownProps;

    const postPart = state.postPart.items[id];

    const {position, title, color} = postPart;

    const isOpen = true;

    return {id, position, title, color, isOpen};
}

const ConnectedPostPicturePart = connect(mapStateToProps)(PostPicturePart);

export default ConnectedPostPicturePart;