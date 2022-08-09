const valFields = require('./val-fields');
const validateFileUpload = require('../middlewares/file-validate');



module.exports = {
    ...valFields,
    ...validateFileUpload
}