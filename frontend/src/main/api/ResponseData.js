
export default class ResponseData {
    /**
     *
     * @param {*} result
     * @param {ResponseError|null} error
     */
    constructor(result, error) {
        this.result = result;
        this.error = error;
    }

    /**
     *
     * @return {*}
     */
    getResult() {
        return this.result;
    }

    /**
     *
     * @return {ResponseError|null}
     */
    getError() {
        return this.error;
    }
}