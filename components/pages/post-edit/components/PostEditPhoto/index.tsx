import {FunctionComponent} from 'react';

import Paper from '@material-ui/core/Paper';

const styles = require('./styles.styl');

const PostEditPhoto: FunctionComponent = () => (
    <Paper className={styles.root}>
        <div
            className={styles.imageContainer}
        >
            <img src="/static/fake/pics/liza_3.png" />
        </div>
    </Paper>
);

export default PostEditPhoto;
