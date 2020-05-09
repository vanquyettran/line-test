import Parcel from '../../Parcel';
import ResponseError from '../../ResponseError';
import ResponseData from '../../ResponseData';
import ImageDataConverter from './ImageDataConverter';

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
        this.setRequestBody(ImageDataConverter.toPayload(file));
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
            const image = ImageDataConverter.fromEndpoint(rawData['resultData']);

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
        return new ResponseError(rawError.message);
    }
}
