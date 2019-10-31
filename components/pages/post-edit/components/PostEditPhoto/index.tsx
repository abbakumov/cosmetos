import {Component, createRef} from 'react';
import {connect} from 'react-redux';

import Paper from '@material-ui/core/Paper';

import {AppState} from '../../../../../store';
import {PostPartId} from '../../../../../entities/PostPart/types';
import {Position} from '../../../../../entities/Position';

import PostEditPhotoPart from '../PostEditPhotoPart';

import {
    postEditFileChange,
    postEditPartChangePositionAction,
} from '../../store/actions';

const styles = require('./styles.styl');

interface MappedProps {
    isActivePartEdit: boolean;
    partIds: PostPartId[];
    imageUrl: string;
}

interface ActionProps {
    postEditPartChangePositionAction(position: Position): void;
    postEditFileChange(file: File, url: string): void;
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

    onImageChange = (e) => {
        const target: HTMLInputElement = e.target;
        const file: File = target.files[0];

        if (!file) return;

        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            this.props.postEditFileChange(file, fileReader.result as string);
        };
    }

    render() {
        const imageText = this.props.imageUrl ? 'Новое изображение' : 'Изображение';

        return (
            <Paper className={styles.root}>
                {this.props.imageUrl &&
                    <div
                        className={styles.imageContainer}
                        onClick={this.clickHandler}
                        ref={this.containerRef}
                    >
                        <img src={this.props.imageUrl} />
                        {this.props.partIds.map(id => (
                            <PostEditPhotoPart key={id} id={id}/>
                        ))}
                    </div>
                }
                {!this.props.imageUrl &&
                    <div className={styles.imagePlaceholder}>
                        <p>Выберите изображение</p>
                    </div>
                }
                <div className={styles.imagePickerContainer}>
                    <p className={styles.imagePickerLabel}>{imageText} (.png или .jpeg):</p>
                    <input
                        type="file"
                        accept="image/x-png,image/jpeg"
                        onChange={this.onImageChange}
                    />
                </div>
            </Paper>
        );
    }
};

function mapStateToProps(state: AppState): MappedProps {
    const {postPartIds, postEdit} = state.pagePostEdit;

    const activePart = state.pagePostEdit.editPostPart;
    const isActivePartEdit = Boolean(activePart);

    const partIds = activePart ? [activePart.id] : postPartIds;

    return {
        isActivePartEdit,
        partIds,
        imageUrl: postEdit.imageUrl,
    };
}

const mapDispatchToProps = {
    postEditPartChangePositionAction,
    postEditFileChange,
};

const ConnectedPostEditPhoto = connect(mapStateToProps, mapDispatchToProps)(PostEditPhoto);

export default ConnectedPostEditPhoto;
