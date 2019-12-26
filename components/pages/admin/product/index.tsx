import {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import {AppState} from '../../../../store';

import AdminLayout from '../../../layouts/AdminLayout';
import {ProductId} from '../../../../entities/ProductBase/types';
import {Brand, BrandId} from '../../../../entities/Brand/types';

import AdminProductColorsTable from './components/ColorsTable';
import AdminProductColorDialog from './components/ColorDialog';
import {
    pageAdminProductChangeBrandIdAction,
    pageAdminProductChangeFieldAction,
    pageAdminProductChangePictureAction,
    pageAdminProductSaveAction,
} from './store/actions';
import {ProductFieldName} from './store/types';
// import AdminProductOffersTable from './components/OffersTable';

const styles = require('./styles.styl');

interface MappedProps {
    isSaved: boolean;
    brands: Brand[];
    brandId: BrandId;
    kind: string;
    title: string;
    description: string;
    pictureUrl: string;
}

interface ActionProps {
    changeBrandIdAction(id: BrandId): void;
    changeFieldAction(name: ProductFieldName, value: string): void;
    changePictureAction(file: File, url: string): void;
    saveAction(): void;
}

interface Props extends MappedProps, ActionProps {}

class AdminProductPage extends Component<Props> {
    onImageChange = (e) => {
        const target: HTMLInputElement = e.target;
        const file: File = target.files[0];

        if (!file) return;

        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            this.props.changePictureAction(file, fileReader.result as string);
        };
    }

    render() {
        return  (
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
                                        value={this.props.brandId}
                                        className={styles.brandInput}
                                        inputProps={{
                                            name: 'brand',
                                        }}
                                        onChange={e => this.props.changeBrandIdAction(e.target.value as number)}
                                    >
                                        {this.props.brands.map(brand => (
                                            <MenuItem key={brand.id} value={brand.id}>{brand.titleFull}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Тип"
                                    value={this.props.kind}
                                    onChange={e => this.props.changeFieldAction('kind', e.target.value)}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Название"
                                    value={this.props.title}
                                    onChange={e => this.props.changeFieldAction('title', e.target.value)}
                                />
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
                                    value={this.props.description}
                                    rows={7}
                                    onChange={e => this.props.changeFieldAction('description', e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </Toolbar>
                    <Toolbar>
                        <div className={styles.pictureLabel}>Изображение (не более 10mb): </div>
                        <input
                            type="file"
                            accept="image/x-png,image/jpeg"
                            onChange={this.onImageChange}
                            className={styles.pictureInput}
                        />
                    </Toolbar>
                    {!this.props.pictureUrl &&
                        <Toolbar>
                            <div className={styles.pictureEmpty}>
                                <div className={styles.emptyPictureLabel}>нет изображения</div>
                            </div>
                        </Toolbar>
                    }
                    {this.props.pictureUrl &&
                        <Toolbar>
                            <img
                                className={styles.picture}
                                src={this.props.pictureUrl}
                            />
                        </Toolbar>
                    }
                    <Toolbar>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => this.props.saveAction()}
                        >
                            Сохранить продукт
                        </Button>
                    </Toolbar>
                    <Toolbar>
                        <Grid container spacing={2}>
                            {this.props.isSaved &&
                                <Grid item xs={6}>
                                    <AdminProductColorsTable />
                                </Grid>
                            }
                            {/* <Grid item xs={6}>
                                <AdminProductOffersTable />
                            </Grid> */}
                        </Grid>
                    </Toolbar>
                </Paper>
                <AdminProductColorDialog />
            </AdminLayout>
        );
    }
}

function mapStateToProps(state: AppState): MappedProps {
    const {brandIds, productEdit} = state.pageAdminProduct;

    const brands = brandIds.map(id => state.brand.items[id]);

    const isSaved = Boolean(productEdit.id)

    return {
        ..._.pick(
            productEdit,
            ['brandId', 'kind', 'title', 'description', 'pictureUrl']
        ),
        isSaved,
        brands,
    };
}

const actionProps = {
    changeBrandIdAction: pageAdminProductChangeBrandIdAction,
    changeFieldAction: pageAdminProductChangeFieldAction,
    changePictureAction: pageAdminProductChangePictureAction,
    saveAction: pageAdminProductSaveAction,
};

const ConnectedAdminProductPage = connect(mapStateToProps, actionProps)(AdminProductPage);

export default ConnectedAdminProductPage;
