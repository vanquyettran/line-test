
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
        return this.message;
    }
}