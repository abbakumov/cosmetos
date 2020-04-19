import React, {FC, useCallback} from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../../../../store';
import DoubleActionButton from '../../../../widgets/DoubleActionButton';
import MobileInput from '../../../../widgets/MobileInput';
import {
    pageBlogChangeFieldAction,
    PageBlogEditField,
    pageBlogChangeImageFileAction,
    pageBlogEditCancelAction,
    pageBlogSaveAction,
} from '../../state/actions';

const styles = require('./styles.styl');

interface MappedProps {
    name: string
    instagramLogin: string
    imageUrl: string
    bio: string
    isImageExist: boolean
}

interface ActionProps {
    changeField(field: PageBlogEditField, value: string): void
    changeImage(file: File, url: string): void
    cancel(): void
    save(): void
}

interface Props extends MappedProps, ActionProps {}

const BlogHead: FC<Props> = (props: Props) => {
    const {name, instagramLogin, imageUrl, bio, isImageExist, changeField, changeImage} = props;

    const changeNameField = useCallback(value => changeField('newName', value), []);
    const changeInstagramField = useCallback(value => changeField('newInstagramLogin', value), []);
    const changeBioField = useCallback(e => changeField('newBio', e.target.value), []);
    const cancel = useCallback(() => props.cancel(), []);
    const save = useCallback(() => props.save(), []);

    const onImageChange = (e) => {
        const target: HTMLInputElement = e.target;
        const file: File = target.files[0];

        if (!file) return;

        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            changeImage(file, fileReader.result as string);
        };
    }

    return (
        <div className={styles.root}>
            <div className={styles.mainContainer}>
                <div className={styles.left}>
                    <label>
                        {isImageExist && (
                            <div className={styles.imageContainer}>
                                <img className={styles.image} src={imageUrl} />
                            </div>
                        )}
                        {!isImageExist && <div className={styles.imagePlaceholder} />}
                        <img className={styles.imageIcon} src="/static/icons/blog-page/photo-edit.svg" />
                        <input
                            className={styles.imageInput}
                            type="file"
                            accept="image/x-png,image/jpeg"
                            onChange={onImageChange}
                        />
                    </label>
                </div>
                <div className={styles.center}>
                    <div className={styles.input}>
                        <MobileInput
                            label="Имя"
                            value={name}
                            onChange={changeNameField}
                        />
                    </div>
                    <div className={styles.input}>
                        <MobileInput
                            label="Instagram login"
                            value={instagramLogin}
                            onChange={changeInstagramField}
                        />
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
                        onLeftClick={cancel}
                        rightText="Сохранить"
                        onRightClick={save}
                    />
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state: AppState): MappedProps {
    const {newImageUrl, newName, newInstagramLogin, newBio} = state.pageBlog.edit;
    const isImageExist = Boolean(newImageUrl);

    return {
        name: newName,
        instagramLogin: newInstagramLogin,
        imageUrl: newImageUrl,
        bio: newBio,
        isImageExist,
    };
}

const actionProps = {
    changeField: pageBlogChangeFieldAction,
    changeImage: pageBlogChangeImageFileAction,
    cancel: pageBlogEditCancelAction,
    save: pageBlogSaveAction,
};

const ConnectedBlogHead = connect(mapStateToProps, actionProps)(BlogHead);

export default ConnectedBlogHead;