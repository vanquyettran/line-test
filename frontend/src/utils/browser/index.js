import {translate} from '../../i18n';

/**
 *
 * @param {File} file
 * @return {Promise}
 */
function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.addEventListener('load', event => {
            resolve(event.target.result);
        });

        reader.addEventListener('error', event => {
            reject(translate('Failed to read file'));
            reader.abort();
        });

        reader.readAsDataURL(file);
    });
}

export {
    readFileAsDataURL
}