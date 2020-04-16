import React, {FC, useCallback} from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../../../../store';
import DoubleActionButton from '../../../../widgets/DoubleActionButton';
import MobileInput from '../../../../widgets/MobileInput';
import {pageBlogChangeFieldAction, PageBlogEditField} from '../../state/actions';

const styles = require('./styles.styl');

interface MappedProps {
    name: string
    instagramLogin: string
    imageUrl: string
    bio: string
}

interface ActionProps {
    changeField(field: PageBlogEditField, value: string): void
}

interface Props extends MappedProps, ActionProps {}

const BlogHead: FC<Props> = (props: Props) => {
    const {name, instagramLogin, imageUrl, bio, changeField} = props;

    const changeNameField = useCallback(value => changeField('newName', value), []);
    const changeInstagramField = useCallback(value => changeField('newInstagramLogin', value), []);
    const changeBioField = useCallback(e => changeField('newBio', e.target.value), []);

    return (
        <div className={styles.root}>
            <div className={styles.mainContainer}>
                <div className={styles.left}>
                    <img className={styles.image} src={imageUrl} />
                </div>
                <div className={styles.center}>
                    <div className={styles.input}>
                        <MobileInput label="Имя" value={name} onChange={changeNameField} />
                    </div>
                    <div className={styles.input}>
                        <MobileInput label="Instagram" value={instagramLogin} onChange={changeInstagramField} />
                    </div>
                </div>
            </div>
            <div className={styles.subContainer}>
                <div className={styles.subContainerItem}>
                    <div className={styles.bioLabel}>О себе:</div>
                    <textarea
                        className={styles.bioInput}
                        value={bio}
                        maxLength={300}
                        placeholder="Напиши о себе (максимум 300 символов)"
                        onChange={changeBioField}
                    />
                </div>
                <div className={styles.subContainerItem}>
                    <DoubleActionButton
                        leftText="Отменить"
                        rightText="Сохранить"
                    />
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state: AppState): MappedProps {
    const {newImageUrl, newName, newInstagramLogin, newBio} = state.pageBlog.edit;

    return {
        name: newName,
        instagramLogin: newInstagramLogin,
        imageUrl: newImageUrl,
        bio: newBio,
    };
}

const actionProps = {
    changeField: pageBlogChangeFieldAction,
};

const ConnectedBlogHead = connect(mapStateToProps, actionProps)(BlogHead);

export default ConnectedBlogHead;