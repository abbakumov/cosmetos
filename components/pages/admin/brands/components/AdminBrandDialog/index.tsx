import {Component} from 'react';
import {connect} from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

interface MappedProps {

}

interface ActionProps {

}

interface Props extends MappedProps, ActionProps {}

class AdminBrandDialog extends Component<Props> {
    render() {
        return (
            <Dialog
                onClose={() => {}}
                aria-labelledby="brand-dialog"
                open={false}
            >
                <DialogTitle>
                    Новый бренд
                </DialogTitle>
                <DialogContent dividers>
                    <TextField style={{marginRight: 20}} label="Полное название" />
                    <TextField label="Краткое название" />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => {}} color="primary">
                        Отмена
                    </Button>
                    <Button autoFocus onClick={() => {}} color="primary">
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

function mapStateToProps() {
    return {

    };
}

const mapDispatchToProps = {

};

const ConnectedAdminBrandDialog = connect(mapStateToProps, mapDispatchToProps)(AdminBrandDialog);

export default ConnectedAdminBrandDialog;
