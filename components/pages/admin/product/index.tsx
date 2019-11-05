import {FunctionComponent} from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import AdminLayout from '../../../layouts/AdminLayout';
import {ProductId} from '../../../../entities/ProductBase/types';

import AdminProductColorsTable from './components/ColorsTable';
import AdminProductOffersTable from './components/OffersTable';

const styles = require('./styles.styl');

export interface AdminProductPageProps {
    id: ProductId;
}

const AdminProductPage: FunctionComponent<AdminProductPageProps> = () => (
    <AdminLayout>
        <Paper>
            <Toolbar>
                <Grid container spacing={2}>
                    <Grid item>
                        <FormControl>
                            <InputLabel>
                                Бренд
                            </InputLabel>
                            <Select
                                value="huix"
                                inputProps={{
                                    name: 'brand',
                                }}
                            >
                                <MenuItem value="nyx">Nyx</MenuItem>
                                <MenuItem value="huix">Huix</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField label="Тип" />
                    </Grid>
                    <Grid item>
                        <TextField label="Название" />
                    </Grid>
                </Grid>
            </Toolbar>
            <Toolbar>
                <Grid container>
                    <Grid item xs={6}>
                        <TextField
                            className={styles.descriptionField}
                            label="Описание"
                            multiline
                            rows={4}
                        />
                    </Grid>
                </Grid>
            </Toolbar>
            <Toolbar>
                <div className={styles.pictureLabel}>Изображение (не более 10mb): </div>
                <input type="file" className={styles.pictureInput} />
            </Toolbar>
            <Toolbar>
                <div className={styles.pictureContainer}>
                    <div className={styles.emptyPictureLabel}>нет изображения</div>
                </div>
            </Toolbar>
            <Toolbar>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <AdminProductColorsTable />
                    </Grid>
                    <Grid item xs={6}>
                        <AdminProductOffersTable />
                    </Grid>
                </Grid>
            </Toolbar>
            <Toolbar>
                <Button variant="contained" color="primary">Сохранить продукт</Button>
            </Toolbar>
        </Paper>
    </AdminLayout>
);

export default AdminProductPage;
