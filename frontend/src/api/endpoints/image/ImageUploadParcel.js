import Parcel from '../../Parcel';
import ResponseError from '../../ResponseError';

export default class ImageUploadParcel extends Parcel {
    /**
     *
     * @param {File} file
     */
    constructor(file) {
        super();

        this.compose(file);
    }

    /**
     *
     * @param {File} file
     */
    compose(file) {
        this.setRequestMethod('POST');
        this.setEndpoint('/_api/media/upload');
        this.setRequestBody(this.makeFormData(file));
    }

    /**
     *
     * @param file
     * @return {FormData}
     */
    makeFormData(file) {
        const formData = new FormData();
        formData.append('type', 'PHOTO');
        formData.append('file', file);
        return formData;
    }

    /**
     *
     * @param rawData
     * @return {IImage}
     */
    parseResponseData(rawData) {
        return {
            id: rawData['original'],
            thumbnailUrl: rawData['thumb'],
            originalUrl: rawData['original'],
            width: rawData['width'],
            height: rawData['height'],
        };
    }

    /**
     *
     * @param rawError
     * @return {ResponseError}
     */
    parseResponseError(rawError) {
        return new ResponseError(JSON.stringify(rawError));
    }
}
