import Parcel from '../../Parcel';
import ResponseError from '../../ResponseError';
import ResponseData from '../../ResponseData';
import PostDataConverter from './PostDataConverter';

export default class PostUploadParcel extends Parcel {
    /**
     *
     * @param {IPost} post
     */
    constructor(post) {
        super();

        this.compose(post);
    }

    /**
     *
     * @param {IPost} post
     */
    compose(post) {
        this.setEndpoint('/_api/post/upload');
        this.setRequestMethod('POST');
        this.setRequestHeader('Content-Type', 'application/json');
        this.setRequestBody(PostDataConverter.toPayload(post));
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
             * @type {IPost}
             */
            const post = PostDataConverter.fromEndpoint(rawData['resultData']);

            return new ResponseData(post, null);
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
