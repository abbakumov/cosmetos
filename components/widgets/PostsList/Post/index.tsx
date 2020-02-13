import React, {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'next/link';
import {PostId, PostBase} from '../../../../entities/Post/types';
import {AppState} from '../../../../store';

const styles = require('./styles.styl');

interface PostsListPostPublicProps {
    id: PostId
    nameVisible: boolean
    colorVisible: boolean
}

interface PostsListPostProps extends PostBase {
    name: string
    nameVisible: boolean
    colorVisible: boolean
    colorPicUrl: string
    colorTitle: string
}

class PostsListPost extends Component<PostsListPostProps> {
    render() {
        const {id, title, imageUrl, isPublic, nameVisible, name, colorVisible, colorPicUrl, colorTitle} = this.props;

        return (
            <Link href="/post/[id]" as={`/post/${id}`}>
                <a className={styles.root}>
                    <div className={styles.imageContainer}>
                        <img className={styles.image} src={imageUrl}/>
                        {!isPublic &&
                            <div className={styles.imageFade}>
                                <img
                                    className={styles.imageFadeIcon}
                                    src="/static/icons/blog-page/eye-cross-black.svg"
                                />
                            </div>
                        }
                    </div>
                    {nameVisible && <span className={styles.name}>{name}</span>}
                    <h2 className={styles.title}>{title}</h2>
                    {colorVisible && (
                        <div className={styles.color}>
                            <img className={styles.colorPic} src={colorPicUrl} />
                            <span className={styles.colorTitle}>{colorTitle}</span>
                        </div>
                    )}
                </a>
            </Link>
        )
    }
}

function mapStateToProps(state: AppState, ownProps: PostsListPostPublicProps): PostsListPostProps {
    const {id, nameVisible, colorVisible} = ownProps;

    const postData: PostBase = state.postBase.items[id];

    const {name} = state.blog.items[postData.authorLogin];

    let colorPicUrl, colorTitle;
    if (colorVisible) {
        const productId = state.pageProduct.id;
        const postProduct = Object.values(state.postProduct.items)
            .find(item => item.productId === productId && item.postId === id);
        if (postProduct) {
            const productColor = state.productColor.items[postProduct.productColorId];
            if (productColor) {
                colorPicUrl = productColor.picUrl;
                colorTitle = productColor.title;
            }
        }
    }

    return {
        ...postData,
        name,
        nameVisible,
        colorVisible: colorVisible && !!colorTitle,
        colorPicUrl,
        colorTitle,
    };
}

const ConnectedBlogListPost = connect(mapStateToProps)(PostsListPost);

export default ConnectedBlogListPost;
