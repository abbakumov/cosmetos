import React, {FC} from 'react';

const styles = require('./styles.styl');

const Spinner: FC = () => (
    <div className={styles.root}>
        <img
            className={styles.animation}
            src="/static/icons/fetching-anim.svg"
        />
    </div>
);

export default Spinner;
