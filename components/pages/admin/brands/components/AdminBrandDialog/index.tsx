import {Component} from 'react';
import {connect} from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {AppState} from '../../../../../../store';
import {Brand} from '../../../../../../entities/Brand/types';

import {
    pageAdminBrandsChangeFieldAction,
    pageAdminBrandsSaveAction,
    pageAdminBrandsCancelAction,
} from '../../store/actions';

import {PageAdminBrandsChangeFieldName} from '../../store/types';

interface MappedProps {
    editBrand: Brand;
}

interface ActionProps {
    changeFieldAction(name: PageAdminBrandsChangeFieldName, value: string): void;
    brandsSaveAction(): void;
    brandsCancelAction(): void;
}

interface Props extends MappedProps, ActionProps {}

class AdminBrandDialog extends Component<Props> {
    titleText() {
        if (!this.props.editBrand.id) {
            return 'Новый бренд';
        } else {
            return `Реактирование бренда (id: ${this.props.editBrand.id})`;
        }
    }

    render() {
        const {editBrand} = this.props;

        if (!editBrand) return null;

        return (
            <Dialog
                onClose={() => {this.props.brandsCancelAction()}}
                aria-labelledby="brand-dialog"
                open={true}
            >
                <DialogTitle>
                    {this.titleText()}
                </DialogTitle>
                <DialogContent dividers>
                    <TextField
                        style={{marginRight: 20}}
                        label="Полное название"
                        value={editBrand.titleFull}
                        onChange={e => this.props.changeFieldAction('titleFull', e.target.value)}
                    />
                    <TextField
                        label="Краткое название"
                        value={editBrand.titleShort}
                        onChange={e => this.props.changeFieldAction('titleShort', e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => {this.props.brandsCancelAction()}} color="primary">
                        Отмена
                    </Button>
                    <Button autoFocus onClick={() => {this.props.brandsSaveAction()}} color="primary">
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

function mapStateToProps(state: AppState) {
    const {editBrand} = state.pageAdminBrands;

    return {editBrand};
}

const mapDispatchToProps = {
    changeFieldAction: pageAdminBrandsChangeFieldAction,
    brandsSaveAction: pageAdminBrandsSaveAction,
    brandsCancelAction: pageAdminBrandsCancelAction,
};

const ConnectedAdminBrandDialog = connect(mapStateToProps, mapDispatchToProps)(AdminBrandDialog);

export default ConnectedAdminBrandDialog;
