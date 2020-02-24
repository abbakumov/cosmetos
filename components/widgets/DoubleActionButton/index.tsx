import React, {FC} from 'react';

const styles = require('./styles.styl');

interface DoubleActionButtonProps {
    leftText: string
    rightText: string
    onLeftClick?(): void
    onRightClick?(): void
}

const DoubleActionButton: FC<DoubleActionButtonProps> = (props: DoubleActionButtonProps) => {
    const {
        leftText,
        rightText,
        onLeftClick,
        onRightClick,
    } = props;

    return (
        <div className={styles.root}>
            <button
                className={styles.left}
                onClick={onLeftClick}
            >
                {leftText}
            </button>
            <button
                className={styles.right}
                onClick={onRightClick}
            >
                {rightText}
            </button>
        </div>
    );
}

export default DoubleActionButton;
