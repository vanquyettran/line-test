
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
 * @param {IImage} image
 * @return {{}}
 */
function toEndpoint(image) {
    return {
        'thumb': image.thumbnailUrl,
        'original': image.originalUrl,
        'width': image.width,
        'height': image.height
    };
}

/**
 *
 * @param {File} file
 * @return {FormData}
 */
function toPayload(file) {
    const formData = new FormData();

    formData.append('file_to_upload', file);
    formData.append('type', 'PHOTO');

    return formData;
}

export default {
    fromEndpoint,
    toEndpoint,
    toPayload
};
