import {Component} from 'react';
import Link from 'next/link';
import cn from 'classnames';

import {ProductId} from '../../../../../entities/ProductBase/types';
import {UnProductId} from '../../../../../entities/UnProduct/types';
import {PostId} from '../../../../../entities/Post/types';

const styles = require('./styles.styl');

const DEFAULT_PIC_URL = '/static/icons/post-page/empty-product-pic.png';

export interface PostProductProps {
    id: ProductId | UnProductId
    brand: string
    title: string
    smallPicUrl?: string
    review?: string
    reviewAuthorImageUrl?: string
    color: string
    backIndex: number
    isShown: boolean
    postId?: PostId
    colorPicUrl?: string
    colorTitle?: string
    isUnassigned: boolean
}

class PostProduct extends Component<PostProductProps> {
    render() {
        const {
            id,
            brand,
            title,
            smallPicUrl,
            review,
            reviewAuthorImageUrl,
            color,
            backIndex,
            isShown,
            postId,
            colorTitle,
            colorPicUrl,
            isUnassigned,
        } = this.props;

        const style = {
            borderColor: `#${color}`,
            zIndex: backIndex,
        };

        const rootClassName = cn(styles.root, {
            [styles.rootHidden]: !isShown,
            [styles.rootUnassigned]: isUnassigned,
        });

        const RootElement = isUnassigned ? 'div' : Link;
        const rootElementParams = {href: '', as: ''};
        if (!isUnassigned && id && postId) {
            rootElementParams.href = `/product/[id]?refPost=${postId}`;
            rootElementParams.as = `/product/${id}?refPost=${postId}`;
        }

        const SecondRootElement = id ? 'a' : 'div';

        return (
            <RootElement {...rootElementParams} >
                <SecondRootElement className={rootClassName} style={style}>
                    <div className={styles.left}>
                        <img className={styles.img} src={smallPicUrl ? smallPicUrl : DEFAULT_PIC_URL} />
                    </div>
                    <div className={styles.content}>
                        <div className={styles.brand}>{brand}</div>
                        <h3 className={styles.title}>{title}</h3>
                        {colorTitle &&
                            <div className={styles.color}>
                                {colorPicUrl && <img className={styles.colorImage} src={colorPicUrl} />}
                                <span className={styles.colorText}>{colorTitle}</span>
                            </div>
                        }
                        {!!review && (
                            <div className={styles.review}>
                                <img className={styles.reviewImage} src={reviewAuthorImageUrl}/>
                                <div className={styles.reviewText}>"{review}"</div>
                            </div>
                        )}
                    </div>
                    {!isUnassigned && <img className={styles.arr} src="/static/icons/post-page/product-arr.svg" />}
                </SecondRootElement>
            </RootElement>
        );
    }
}

export default PostProduct;
