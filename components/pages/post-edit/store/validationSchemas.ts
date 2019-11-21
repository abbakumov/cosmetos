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

export const postPartEditSchema = new Schema({
    title: {
        type: String,
        required: true,
        message: 'Название области не может быть пустым',
    },
});

export const postProductEditSchema = new Schema({
    brandId: {
        type: Number,
        required: true,
        message: 'Бренд не может быть пустым',
    },
    productId: {
        type: Number,
        required: true,
        message: 'Продукт не может быть пустым',
    },
    productColorId: {
        type: Number,
        required: true,
        message: 'Цвет продукта не может быть пустым',
    },
});
