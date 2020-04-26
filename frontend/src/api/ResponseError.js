import {translate} from '../i18n';


export default class ResponseError {
    /**
     *
     * @param {string} message
     */
    constructor(message) {
        this.message = message;
    }

    /**
     *
     * @return {string}
     */
    getMessage() {
        return this.message || translate('something_went_wrong');
    }
}