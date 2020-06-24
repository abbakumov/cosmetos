const path = require('path');
const mime = require('mime');

const multer = require('@koa/multer');
const crypto = require('crypto');

const limits = {
    // Max field name size (Default: 100 bytes)
    fieldNameSize: 100,
    // Max field value size (Default: 1MB)
    fieldSize: 16000000, // 16 MB
    // Max number of non- file fields (Default: Infinity)
    fields: 100,
    // For multipart forms, the max file size (in bytes)(Default: Infinity)
    fileSize: 16000000, // 16 MB
    // For multipart forms, the max number of file fields (Default: Infinity)
    files: 40,
    // For multipart forms, the max number of parts (fields + files)(Default: Infinity)
    parts: 10,
    // For multipart forms, the max number of header key=> value pairs to parse Default: 2000(same as node's http).
    headerPairs: 100,
    // Keep the full path of files instead of just the base name (Default: false)
    preservePath: false,
};

function fileFilter(req, file, cb) {
    const fileTypes = /jpeg|jpg|png/i;
    const extName = path.extname(file.originalname);

    fileExtentionTest = fileTypes.test(extName);
    fileMimeTypeTest = fileTypes.test(file.mimetype);

    if (!fileExtentionTest || !fileMimeTypeTest) {
        return cb(new Error('Only pngs and jpgs allowed!'));
    }
  
    cb(null, true);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './static/uploads/');
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
        });
    }
});

const upload = multer({
    dest: './static/uploads/',
    limits,
    fileFilter,
    storage,
});

module.exports = {
    upload,
};
