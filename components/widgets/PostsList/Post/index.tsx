import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import Link from 'next/link';
import {PostId, PostBase} from '../../../../entities/Post/types';
import {AppState} from '../../../../store';
import { PostPartProduct } from '../../../../entities/PostPartProduct/types';

const styles = require('./styles.styl');

interface PostsListPostPublicProps {
    id: PostId
    nameVisible: boolean
    colorVisible: boolean
}

interface Color {
    picUrl: string
    title: string
}

interface PostsListPostProps extends PostBase {
    name: string
    nameVisible: boolean
    colorVisible: boolean
    colors: Color[]
}

class PostsListPost extends Component<PostsListPostProps> {
    render() {
        const {id, title, imageUrl, isPublic, nameVisible, name, colorVisible, colors} = this.props;

        return (
            <Link href="/post/[id]" as={`/post/${id}`}>
                <a className={styles.root}>
                    <div className={styles.imageContainer}>
                        <img className={styles.image} src={imageUrl} />
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
                        <div className={styles.colors}>
                            {colors.map(color => (
                                <div key={color.title} className={styles.color}>
                                    <img className={styles.colorPic} src={color.picUrl} />
                                    <span className={styles.colorTitle}>{color.title}</span>
                                </div>
                            ))}
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

    const productId = state.pageProduct.id;
    const allColors: Color[] = colorVisible
        ? Object.values(state.postPartProduct.items)
            .filter((item: PostPartProduct) =>
                item.productId === productId && item.postId === id && Boolean(item.productColorId))
            .map((item: PostPartProduct): Color => {
                const productColor = state.productColor.items[item.productColorId];
                return {
                    picUrl: productColor.picUrl,
                    title: productColor.title,
                };
            })
        : [];
    const colors: Color[] = _.uniqBy(allColors, 'title');

    return {
        ...postData,
        name,
        nameVisible,
        colorVisible: colorVisible && Boolean(colors.length),
        colors,
    };
}

const ConnectedBlogListPost = connect(mapStateToProps)(PostsListPost);

export default ConnectedBlogListPost;
