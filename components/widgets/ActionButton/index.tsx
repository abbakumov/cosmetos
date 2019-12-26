import {FunctionComponent} from 'react';
import Link from 'next/link';

const styles = require('./styles.styl');

interface Props {
    href?: string;
    as?: string;
    onClick?(): void;
    text: string;
}

const ActionButton = ({href, as, onClick, text}: Props) => {
    const RootNode = href ? Link : 'div';
    return (
        <RootNode
            href={href}
            as={as}
        >
            <div
                className={styles.root}
                onClick={onClick}
            >
                {text}
            </div>
        </RootNode>
    );
};

export default ActionButton;
