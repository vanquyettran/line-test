import {translate} from '../../i18n';
import {formatBytesLocalized} from '../../utils/number';

const mimeTypes = [
    'image/jpeg',
    'image/png'
];

const fileExts = [
    'jpg',
    'jpeg',
    'png'
];

const maxBytes = 0.5 * 1024 * 1024;

/**
 *
 * @param {string} mimeType
 * @param {string} fileExt
 * @param {number} bytes
 * @return {Array}
 */
const checkErrors = (mimeType, fileExt, bytes) => {
    const errors = [];

    if (!mimeTypes.includes(mimeType) || !fileExts.concat(fileExts.map(t => t.toUpperCase())).includes(fileExt)) {
        errors.push(translate('Invalid format. Accept: ::exts', {exts: fileExts.map(t => t.toUpperCase())}));
    }

    if (bytes > maxBytes) {
        errors.push(translate('File size ::size has exceeded limit ::limit',
            {size: formatBytesLocalized(bytes), limit: formatBytesLocalized(maxBytes)}));
    }

    return errors;
};

export default {
    mimeTypes,
    fileExts,
    maxBytes,
    checkErrors
}
