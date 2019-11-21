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
    instaPostId: {
        type: String,
        required: true,
        message: 'ID поста в инстаграме не может быть пустым',
    },
});
