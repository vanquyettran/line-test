export default class Parcel {
    constructor() {
        this.endpoint = '';
        this.requestMethod = '';
        this.requestHeaders = {};
        this.requestBody = null;
        this.queryParams = {};
    }

    /**
     *
     * @param {string} endpoint
     */
    setEndpoint(endpoint) {
        this.endpoint = endpoint;
    }

    /**
     *
     * @param {string} method
     */
    setRequestMethod(method) {
        this.requestMethod = method;
    }

    /**
     *
     * @param {string} name
     * @param {string} value
     */
    setRequestHeader(name, value) {
        this.requestHeaders[name] = value;
    }

    /**
     *
     * @param {string} name
     * @param {string} value
     */
    setQueryParam(name, value) {
        this.queryParams[name] = value;
    }

    /**
     *
     * @param {*} body
     */
    setRequestBody(body) {
        this.requestBody = body;
    }

    /**
     *
     * @return {string}
     */
    getEndpoint() {
        return this.endpoint;
    }

    /**
     * @return {string}
     */
    getQueryString() {
        let result = '';
        for (let name in this.queryParams) {
            if (!this.queryParams.hasOwnProperty(name)) {
                continue;
            }
            const value = this.queryParams[name];

            if (result.length > 0) {
                result += '&';
            }
            result += encodeURIComponent(name);
            result += '=';
            result += encodeURIComponent('string' === typeof value ? value : JSON.stringify(value));
        }

        return result;
    }

    /**
     *
     * @return {string}
     */
    getRequestUrl() {
        return this.getEndpoint() + '?' + this.getQueryString();
    }

    /**
     * @return {string}
     */
    getRequestMethod() {
        return this.requestMethod;
    }

    /**
     *
     * @return {{}}
     */
    getRequestHeaders() {
        return this.requestHeaders;
    }

    /**
     *
     * @return {*}
     */
    getRequestBody() {
        return this.requestBody;
    }

    /**
     * @abstract
     *
     * @param {*} rawData
     * @return {ResponseData}
     */
    parseResponseData(rawData) {}

    /**
     * @abstract
     *
     * @param {*} rawError
     * @return {ResponseError}
     */
    parseResponseError(rawError) {}

}
