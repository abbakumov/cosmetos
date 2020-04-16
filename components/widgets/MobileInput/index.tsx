import React, {FC, useCallback} from 'react';

const styles = require('./styles.styl');

interface Props {
    label: string
    value: string
    onChange(value: string): void
}

const MobileInput: FC<Props> = (props: Props) => {
    const onChange = useCallback((e) => props.onChange(e.target.value), []);

    return (
        <div className={styles.root}>
            <div className={styles.label}>{props.label}:</div>
            <input className={styles.input} onChange={onChange} value={props.value} />
        </div>
    );
};

export default MobileInput;
