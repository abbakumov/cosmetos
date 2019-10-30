import {Component, createRef} from 'react';
import {connect} from 'react-redux';

import Paper from '@material-ui/core/Paper';

import {AppState} from '../../../../../store';
import {PostPartId} from '../../../../../entities/PostPart/types';
import {Position} from '../../../../../entities/Position';

import PostEditPhotoPart from '../PostEditPhotoPart';

import {postEditPartChangePositionAction} from '../../store/actions';

const styles = require('./styles.styl');

interface MappedProps {
    isActivePartEdit: boolean;
    partIds: PostPartId[];
}

interface ActionProps {
    postEditPartChangePositionAction(position: Position): void;
}

interface Props extends MappedProps, ActionProps {}

class PostEditPhoto extends Component<Props> {
    private containerRef = createRef<HTMLDivElement>();

    clickHandler = (e) => {
        const node = this.containerRef.current;
        const rect = node.getBoundingClientRect();

        const numX = e.clientX - rect.left;
        const reverceNumY = e.clientY - rect.top;

        const x = (numX / rect.width) * 100;
        const y = 100 - ((reverceNumY / rect.height) * 100);

        const position = {x, y};

        if (this.props.isActivePartEdit) {
            this.props.postEditPartChangePositionAction(position);
        }
    }

    render() {
        return (
            <Paper className={styles.root}>
                <div
                    className={styles.imageContainer}
                    onClick={this.clickHandler}
                    ref={this.containerRef}
                >
                    <img src="/static/fake/pics/liza_3.png" />
                    {this.props.partIds.map(id => (
                        <PostEditPhotoPart key={id} id={id}/>
                    ))}
                </div>
            </Paper>
        );
    }
};

function mapStateToProps(state: AppState): MappedProps {
    const {postPartIds} = state.pagePostEdit;

    const activePart = state.pagePostEdit.editPostPart;
    const isActivePartEdit = Boolean(activePart);

    const partIds = activePart ? [activePart.id] : postPartIds;

    return {
        isActivePartEdit,
        partIds,
    };
}

const mapDispatchToProps = {
    postEditPartChangePositionAction,
};

const ConnectedPostEditPhoto = connect(mapStateToProps, mapDispatchToProps)(PostEditPhoto);

export default ConnectedPostEditPhoto;
