import {Component} from 'react';
import {connect} from 'react-redux';

import {AppState} from '../../../../../../store';
import {BlogProductId} from '../../../../../../entities/BlogProduct/types';
import {BlogLogin} from '../../../../../../entities/Blog/types';
import Link from 'next/link';
import DoubleActionButton from '../../../../../widgets/DoubleActionButton';
import { pageProductEditCommentAction } from '../../../state/actions';

const styles = require('./styles.styl');

export interface ProductOpinionsItemProps {
    id: BlogProductId
}

interface MappedProps {
    blogLogin: BlogLogin
    name: string
    imageUrl: string
    review: string
    isEditable: boolean
    isHidden: boolean
}

interface ActionProps {
    editCommentAction(text: string): void
}

interface Props extends MappedProps, ActionProps {}

class ProductOpinionsItem extends Component<Props> {
    editCommentAction = () => this.props.editCommentAction(this.props.review);

    render() {
        const {blogLogin, name, imageUrl, review, isEditable, isHidden} = this.props;

        if (isHidden) {
            return null;
        }

        return (
            <div className={styles.root}>
                <div className={styles.main}>
                    <div className={styles.aside}>
                        <Link href="/blog/[name]" as={`/blog/${blogLogin}`}>
                            <a className={styles.imageLink}>
                                <img className={styles.image} src={imageUrl} />
                            </a>
                        </Link>
                    </div>
                    <div className={styles.content}>
                        <span className={styles.name}>{name}</span>
                        <span className={styles.review}>"{review}"</span>
                    </div>
                </div>
                {isEditable && (
                    <div className={styles.controls}>
                        <DoubleActionButton
                            leftText="Удалить"
                            rightText="Изменить"
                            onLeftClick={() => {}}
                            onRightClick={this.editCommentAction}
                        />
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: ProductOpinionsItemProps): MappedProps {
    const {id} = ownProps;

    const {blogLogin, review} = state.blogProduct.items[id];
    const {name, imageUrl} = state.blog.items[blogLogin];

    const isEditable = state.blog.currentLogin === blogLogin;
    const isHidden = isEditable && Boolean(state.pageProduct.commentEdit);

    return {
        blogLogin,
        name,
        imageUrl,
        review,
        isEditable,
        isHidden,
    };
}

const actions = {
    editCommentAction: pageProductEditCommentAction
};

const ConnectedProductOpinionsItem = connect(mapStateToProps, actions)(ProductOpinionsItem);

export default ConnectedProductOpinionsItem;