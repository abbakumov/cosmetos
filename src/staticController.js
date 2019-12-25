const send = require('koa-send');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function staticController(ctx) {
    await send(ctx, ctx.path, {root: '.'});
}

async function cropController(ctx) {
    // if request came to node
    // than it means there is no crop yet
    // because otherwise it were be sent by nginx

    const filename = path.basename(ctx.path);

    // check if correct url
    if (filename.indexOf('_') === -1) {
        ctx.res.statusCode = 400;
        return;
    }

    // get the size
    const [fileNameNoFormat, sizeAndFormatString] = filename.split('_');
    const [sizeString, format] = sizeAndFormatString.split('.');
    const [widthString, heightString] = sizeString.split('x');
    const width = parseInt(widthString, 10);
    const height = heightString ? parseInt(heightString, 10) : null;
    const sizeArr = [width];
    if (height) {
        sizeArr.push(height)
    };

    const originalFilePath = `./static/uploads/${fileNameNoFormat}.${format}`;

    // check if file exists
    if(!fs.existsSync(originalFilePath)) {
        console.warn('Original file does not exist');
        ctx.res.statusCode = 404;
        return;
    }

    const resultFilePath = '.' + ctx.path;

    try {
        await sharp(originalFilePath)
            .resize(...sizeArr)
            .toFile(resultFilePath);
    } catch (e) {
        console.warn('File resize error: ', e);
    }

    await send(ctx, ctx.path, {root: '.'});
}

module.exports = {
    staticController,
    cropController
};
