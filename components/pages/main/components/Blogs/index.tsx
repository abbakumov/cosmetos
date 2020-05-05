import React, {FC} from 'react';
import Link from 'next/link';
import {connect} from 'react-redux';
import SectionTitle from '../../../../widgets/SectionTitle';
import {AppState} from '../../../../../store';
import {Blog} from '../../../../../entities/Blog/types';

const styles = require('./styles.styl');

interface Props {
    blogs: Blog[]
}

const MainPageBlogs = (props: Props) => (
    <div>
        <SectionTitle>Новые блогеры</SectionTitle>
        <div className={styles.blogs}>
            {props.blogs.map(({login, name, imageUrl}) => (
                <Link key={login} href="/blog/[name]" as={`/blog/${login}`}>
                    <a key={login} className={styles.blog}>
                        <img src={imageUrl} className={styles.image} />
                        <div className={styles.name}>{name}</div>
                        <div className={styles.login}>{login}</div>
                    </a>
                </Link>
            ))}
        </div>
    </div>
);

const mapStateToProps = (state: AppState): Props => {
    const {blogLogins} = state.pageMain;
    const {items} = state.blog;

    const blogs = blogLogins.map(login => items[login]);

    return {blogs};
};

const ConnectedMainPageBlogs = connect(
    mapStateToProps,
)(MainPageBlogs);

export default ConnectedMainPageBlogs;
