import Schema from 'validate';

export const postEditSchema = new Schema({
    imageUrl: {
        type: String,
        required: true,
        message: 'Нельзя сохранить пост без изображения',
    },
    title: {
        type: String,
        required: true,
        message: 'Заголовок не может быть пустым',
    },
});

export const postPartEditSchema = new Schema({
    title: {
        type: String,
        required: true,
        message: 'Название области не может быть пустым',
    },
});
