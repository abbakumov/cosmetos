import {Component} from 'react';
import {connect} from 'react-redux';

import {AppState} from '../../../../../../store';
import {
    pageProductEditCommentCancelAction,
    pageProductCommentChangeAction,
} from '../../../state/actions';

const styles = require('./styles.styl');

interface MappedProps {
    text: string
    isActive: boolean
}

interface ActionProps {
    editCommentCancelAction(): void
    commentChangeAction(text: string): void
}

interface Props extends MappedProps, ActionProps {}

class ProductOpinionsEdit extends Component<Props> {
    commentChangeAction = (e) => this.props.commentChangeAction(e.target.value);

    editCommentCancelAction = () => this.props.editCommentCancelAction();

    render() {
        const {text, isActive} = this.props;

        if (!isActive) {
            return null;
        }

        return (
            <div className={styles.root}>
                <div className={styles.title}>Твой отзыв:</div>
                <div className={styles.counter}>{text.length} / 300</div>
                <textarea
                    className={styles.input}
                    value={text}
                    maxLength={300}
                    placeholder="Отзыв о продукте, максимум 300 символов"
                    onChange={this.commentChangeAction}
                />
                <div className={styles.controls}>
                    <button
                        className={styles.cancel}
                        onClick={this.editCommentCancelAction}
                    >
                        Отмена
                    </button>
                    <button
                        className={styles.save}
                    >
                        Сохранить
                    </button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: AppState): MappedProps {
    const {commentEdit} = state.pageProduct;

    if (!commentEdit) {
        return {
            text: '',
            isActive: false,
        };
    }

    const {text} = commentEdit;

    return {
        text,
        isActive: true,
    };
}

const actionProps = {
    editCommentCancelAction: pageProductEditCommentCancelAction,
    commentChangeAction: pageProductCommentChangeAction,
}

const ConnectedProductOpinionsEdit = connect(mapStateToProps, actionProps)(ProductOpinionsEdit);

export default ConnectedProductOpinionsEdit;