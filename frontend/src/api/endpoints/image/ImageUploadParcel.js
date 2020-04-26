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
     * @param res
     * @return {ResponseData}
     */
    parseResponseData(res) {
        const success = res['resultCode'] === 1;

        if (success) {
            /**
             *
             * @type {IImage}
             */
            const image = ImageDataConverter.fromEndpoint(res['resultData']);

            return new ResponseData(image, null);
        }

        const responseError = new ResponseError(res['errorMessage']);

        return new ResponseData(null, responseError);
    }

    /**
     *
     * @param err
     * @return {ResponseError}
     */
    parseResponseError(err) {
        return new ResponseError(err);
    }
}
