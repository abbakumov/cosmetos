import {FunctionComponent} from 'react';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const styles = require('./styles.styl');

const PostIditInfo: FunctionComponent = () => (
    <Paper className={styles.root}>
        <TextField
            className={styles.input}
            label="Заголовок"
            variant="outlined"
        />
        <TextField
            className={styles.input}
            label="instagram post id"
            variant="outlined"
        />
        <TextField
            className={styles.input}
            label="Описание"
            multiline
            rows={4}
            variant="outlined"
        />
    </Paper>
);

export default PostIditInfo;
