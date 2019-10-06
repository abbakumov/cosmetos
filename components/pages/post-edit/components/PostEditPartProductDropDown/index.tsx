import {FunctionComponent} from 'react';
import {connect} from 'react-redux';
import Downshift from 'downshift';

import {AppState} from '../../../../../store';

export interface PostEditPartProductDropDownProps {

}

interface MappedProps {

}

interface ActionProps {

}

interface Props extends MappedProps, ActionProps {

}

const PostEditPartProductDropDown: FunctionComponent = () => (
    <div>

    </div>
);

function mapStateToProps(state: AppState, ownProps: PostEditPartProductDropDownProps): MappedProps {
    return {

    };
}

const mapDispatchToProps: ActionProps = {

};

const ConnectedPostEditPartProductDropDown =
    connect(mapStateToProps, mapDispatchToProps)(PostEditPartProductDropDown);

export default ConnectedPostEditPartProductDropDown;
