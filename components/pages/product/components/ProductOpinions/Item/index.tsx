import {Component} from 'react';
import {connect} from 'react-redux';

import {AppState} from '../../../../../../store';
import {BlogProductId} from '../../../../../../entities/BlogProduct/types';
import {BlogLogin} from '../../../../../../entities/Blog/types';
import Link from 'next/link';

const styles = require('./styles.styl');

export interface ProductOpinionsItemPublicProps {
    id: BlogProductId;
}

interface ProductOpinionsItemProps {
    blogLogin: BlogLogin;
    name: string;
    imageUrl: string;
    comment: string;
}

class ProductOpinionsItem extends Component<ProductOpinionsItemProps> {
    render() {
        const {blogLogin, name, imageUrl, comment} = this.props;

        return (
            <div className={styles.root}>
                <div className={styles.aside}>
                    <Link href="/blog/[name]" as={`/blog/${blogLogin}`}>
                        <a className={styles.imageLink}>
                            <img className={styles.image} src={imageUrl} />
                        </a>
                    </Link>
                </div>
                <div className={styles.content}>
                    <span className={styles.name}>{name}</span>
                    <span className={styles.comment}>{comment}</span>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: ProductOpinionsItemPublicProps): ProductOpinionsItemProps {
    const {id} = ownProps;

    const {blogLogin, comment} = state.blogProduct.items[id];
    const {name, imageUrl} = state.blog.items[blogLogin];

    return {
        blogLogin,
        name,
        imageUrl,
        comment,
    };
}

const ConnectedProductOpinionsItem = connect(mapStateToProps)(ProductOpinionsItem);

export default ConnectedProductOpinionsItem;