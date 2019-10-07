import {FunctionComponent} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';

import {AppState} from '../../../../../store';

import PostEditPartProductDropDown from '../PostEditPartProductDropDown';

const styles = require('./styles.styl');

interface Props {

}

const PostEditPartAddProduct: FunctionComponent<Props> = (props: Props) => (
    <div className={styles.root}>
        <div className={styles.head}>Добавление продукта</div>
        <div className={styles.content}>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <PostEditPartProductDropDown />
                </Grid>
                <Grid item xs={4}>
                    {/* <PostEditPartProductDropDown /> */}
                </Grid>
                <Grid item xs={4}>
                    {/* <PostEditPartProductDropDown /> */}
                </Grid>
            </Grid>
        </div>
    </div>
);

function mapStateToProps(state: AppState) {
    return {

    };
}

const ConnectedPostEditPartAddProduct = connect(mapStateToProps)(PostEditPartAddProduct);

export default ConnectedPostEditPartAddProduct;
