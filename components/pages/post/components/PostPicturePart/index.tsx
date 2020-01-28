import {Component} from 'react';
import {connect} from 'react-redux';
import cn from 'classnames';

import {AppState} from '../../../../../store';
import {PostPartId} from '../../../../../entities/PostPart/types';
import {Position} from '../../../../../entities/Position';
import {postPageOpenScrollPartAction} from '../../state/actions';

const styles = require('./styles.styl');

export interface PostPicturePartPublicProps {
    id: PostPartId;
}

interface DataProps {
    id: PostPartId;
    position: Position;
    title: string;
    color: string;
    isOpen: boolean;
}

interface ActionProps {
    postPageOpenScrollPartAction(id: PostPartId): void;
}

interface Props extends DataProps, ActionProps {}

class PostPicturePart extends Component<Props> {
    onClick = e => {
        e.stopPropagation();
        this.props.postPageOpenScrollPartAction(this.props.id);
    };

    render() {
        const {
            position,
            title,
            color,
            isOpen,
        } = this.props;

        const style = {
            left: `${position.x}%`,
            bottom: `${position.y}%`,
        };

        const contentStyle = {
            backgroundColor: `#${color}`,
        };

        const circleClassName = cn(
            styles.circle,
            {[styles.circleHidden]: isOpen}
        );

        const contentClassName = cn(
            styles.content,
            {[styles.contentHidden]: !isOpen}
        );

        return (
            <div
                className={styles.root}
                style={style}
                onClick={this.onClick}
            >
                <div className={circleClassName}>
                    <div className={styles.circleInner} style={contentStyle} />
                </div>
                <div className={contentClassName} style={contentStyle}>
                    {title}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: PostPicturePartPublicProps): DataProps {
    const {id} = ownProps;

    const postPart = state.postPart.items[id];
    const {position, title, color} = postPart;

    const isOpen = state.pagePost.isPicPartsOpen;

    return {id, position, title, color, isOpen};
}

const actions = {
    postPageOpenScrollPartAction,
};

const ConnectedPostPicturePart = connect(mapStateToProps, actions)(PostPicturePart);

export default ConnectedPostPicturePart;