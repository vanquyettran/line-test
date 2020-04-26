
let autoIncId = 0;

/**
 *
 * @param {{}} data
 * @return {IImage}
 */
function fromEndpoint(data) {
    return {
        id: '' + ++autoIncId,
        thumbnailUrl: data['thumb'],
        originalUrl: data['original'],
        width: data['width'],
        height: data['height']
    };
}

/**
 *
 * @param {IImage} file
 * @return {FormData}
 */
function toEndpoint(file) {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('type', 'PHOTO');

    return formData;
}

export default {
    fromEndpoint,
    toEndpoint
};
