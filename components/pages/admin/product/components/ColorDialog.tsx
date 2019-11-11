import {Component} from 'react';
import {connect} from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {AppState} from '../../../../../store';

import {
    pageAdminProductColorChangeFieldAction,
    pageAdminProductColorChangePictureAction,
    pageAdminProductColorCancelAction,
    pageAdminProductColorSaveAction,
} from '../store/actions';
import {
    ProductColorFieldName,
} from '../store/types';

interface MappedProps {
    isActive: boolean;
    title: string;
    colorHex: string;
    pictureUrl: string;
}

interface ActionProps {
    changeFieldAction(name: ProductColorFieldName, value: string): void;
    changePictureAction(file: File, url: string): void;
    cancelAction(): void;
    saveAction(): void;
}

interface Props extends MappedProps, ActionProps {}

class AdminProductColorDialog extends Component<Props> {
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
        if (!this.props.isActive) {
            return null;
        }

        return (
            <Dialog
                onClose={() => {this.props.cancelAction()}}
                aria-labelledby="brand-dialog"
                open={true}
            >
                <DialogTitle>Добавление цвета</DialogTitle>
                <DialogContent dividers>
                    <TextField
                        style={{marginRight: 20}}
                        label="Название"
                        value={this.props.title}
                        onChange={e => this.props.changeFieldAction('title', e.target.value)}
                    />
                    {/* <TextField
                        label="hex code (6 знаков)"
                        value={this.props.colorHex}
                        onChange={e => this.props.changeFieldAction('colorHex', e.target.value)}
                    /> */}
                    <p
                        style={{
                            marginTop: '20px',
                            marginBottom: '10px',
                        }}
                    >
                        Изображение:
                    </p>
                    <input
                        type="file"
                        accept="image/x-png,image/jpeg"
                        onChange={this.onImageChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {this.props.cancelAction()}}
                        color="primary"
                    >
                        Отмена
                    </Button>
                    <Button
                        autoFocus
                        onClick={() => {this.props.saveAction()}}
                        color="primary"
                    >
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

function mapStateToProps(state: AppState): MappedProps {
    const {productColorEdit} = state.pageAdminProduct;

    const isActive = Boolean(productColorEdit);

    return {
        isActive,
        title: productColorEdit ? productColorEdit.title : '',
        colorHex: productColorEdit? productColorEdit.colorHex : '',
        pictureUrl: productColorEdit ? productColorEdit.pictureUrl : '',
    };
}

const actionProps = {
    changeFieldAction: pageAdminProductColorChangeFieldAction,
    changePictureAction: pageAdminProductColorChangePictureAction,
    cancelAction: pageAdminProductColorCancelAction,
    saveAction: pageAdminProductColorSaveAction,
};

const ConnectedAdminProductColorDialog = connect(mapStateToProps, actionProps)(AdminProductColorDialog);

export default ConnectedAdminProductColorDialog;
