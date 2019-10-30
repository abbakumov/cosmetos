import {FunctionComponent} from 'react';
import {connect} from 'react-redux';

import {AppState} from '../../../../../store';
import {PostPartId} from '../../../../../entities/PostPart/types';

const styles = require('./styles.styl');

interface PostEditPhotoPartProps {
    id: PostPartId,
}

interface Props {
    left: number;
    bottom: number;
    color: string;
}

const PostEditPhotoPart: FunctionComponent<Props> = (props: Props) => {
    const style = {
        left: `${props.left}%`,
        bottom: `${props.bottom}%`,
    }

    const contentStyle = {
        backgroundColor: `#${props.color}`,
    }

    return (
        <div
            className={styles.root}
            style={style}
        >
            <div className={styles.circleOuter}>
                <div className={styles.circleInner} style={contentStyle} />
            </div>
        </div>
    );
}


function mapStateToProps(state: AppState, ownProps: PostEditPhotoPartProps): Props {
    const {id} = ownProps;

    const postPart = state.pagePostEdit.editPostPart || state.postPart.items[id];

    return {
        left: postPart.position.x,
        bottom: postPart.position.y,
        color: postPart.color,
    };
}

const ConnectedPostEditPhotoPart = connect(mapStateToProps)(PostEditPhotoPart);

export default ConnectedPostEditPhotoPart;
