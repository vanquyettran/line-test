
export default class ResponseError {
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