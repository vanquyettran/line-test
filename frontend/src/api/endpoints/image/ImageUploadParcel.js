import Parcel from '../../Parcel';
import ResponseError from '../../ResponseError';
import ResponseData from '../../ResponseData';

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
        this.setEndpoint('/_api/media/upload');
        this.setRequestMethod('PUT');
        this.setRequestBody(this.makeFormData(file));
    }

    /**
     *
     * @param file
     * @return {FormData}
     */
    makeFormData(file) {
        const formData = new FormData();

        formData.append('file', file);
        formData.append('type', 'PHOTO');

        return formData;
    }

    /**
     *
     * @param rawData
     * @return {ResponseData}
     */
    parseResponseData(rawData) {
        const success = rawData['resultCode'] === 1;

        if (success) {
            /**
             *
             * @type {IImage}
             */
            const image = {
                id: rawData['original'],
                thumbnailUrl: rawData['thumb'],
                originalUrl: rawData['original'],
                width: rawData['width'],
                height: rawData['height']
            };

            return new ResponseData(image, null);
        }

        const responseError = new ResponseError(rawData['errorMessage']);

        return new ResponseData(null, responseError);
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
