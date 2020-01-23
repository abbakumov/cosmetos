import React, {FC, ReactNode} from 'react';
import Link from 'next/link';
import {UrlObject} from 'url';

const styles = require('./styles.styl');

interface Props {
    href: string | UrlObject;
    as?: string | UrlObject;
    children: ReactNode;
}

const BackLink: FC<Props> = (props: Props) => (
    <Link href={props.href} as={props.as}>
        <a className={styles.root}>
            <img className={styles.icon} src="/static/icons/back-link-arr.svg" />
            <span className={styles.title}>{props.children}</span>
        </a>
    </Link>
);

export default BackLink;
