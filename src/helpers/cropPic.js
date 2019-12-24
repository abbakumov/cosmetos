function cropPic(fileName, width, height) {
    const [name, extention] = fileName.split('.');
    return `${name}_${width}${height ? 'x' + height : ''}.${extention}`;
}

module.exports = {
    cropPic,
};
