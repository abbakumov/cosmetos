import {FunctionComponent} from 'react';

import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = require('../../styles.styl');

const UnProductsModal: FunctionComponent = () => (
    <Dialog open={false} onClose={() => console.log('on close')}>
        <DialogTitle>Выбор соответствующего продукта</DialogTitle>
        <DialogContent dividers>
            <div className={styles.unassignedProductInfo}>
                <div className={styles.line}>
                    <span className={styles.lineLabel}>Блог: </span>
                    <span>Лиза Иода</span>
                </div>
                <div className={styles.line}>
                    <span className={styles.lineLabel}>Бренд: </span>
                    <span>Nyx Shmiks</span>
                </div>
                <div className={styles.line}>
                    <span className={styles.lineLabel}>Название: </span>
                    <span>Какой-то там праймер или хз че</span>
                </div>
                <div className={styles.line}>
                    <span className={styles.lineLabel}>Цвет: </span>
                    <span>Красненький такой</span>
                </div>
            </div>
            <TextField
                className={styles.productIdField}
                label="ID продукта"
                variant="outlined"
            />
            <div>
                <div className={styles.circular}>
                    <CircularProgress className={styles.circular} />
                </div>
                <div className={styles.productInfo}>
                    <div className={styles.line}>
                        <span className={styles.lineLabel}>Бренд: </span>
                        <span>Nyx Shmiks</span>
                    </div>
                    <div className={styles.line}>
                        <span className={styles.lineLabel}>Название: </span>
                        <span>Какой-то там праймер или хз че</span>
                    </div>
                </div>
                <Select
                    className={styles.colorSelect}
                    value="blue"
                    inputProps={{
                        name: 'brand',
                    }}
                    variant="outlined"
                >
                    <MenuItem value="blue">Голубой</MenuItem>
                    <MenuItem value="red">Красный</MenuItem>
                </Select>                        
            </div>
        </DialogContent>
        <DialogActions>
            <Button color="primary">Выбрать</Button>
        </DialogActions>
    </Dialog>
);

export default UnProductsModal;
