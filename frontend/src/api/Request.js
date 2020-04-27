import {getCookie} from '../utils/cookie';

/**
 *
 * Make a request
 * The request might be queued caused by ConnectionsPerHostname of each browser
 * @param {Parcel} parcel
 * @return {Promise}
 */
function add(parcel) {
    // add authorization info
    authentify(parcel);

    return new Promise((resolve, reject) => {
        fetch(
            parcel.getRequestUrl(),
            {
                method: parcel.getRequestMethod(),
                headers: parcel.getRequestHeaders(),
                body: parcel.getRequestBody(),
                mode: 'same-origin',
                credentials: 'same-origin',
            }
        )
            .then((response) => response.json())
            .then((rawData) => {
                const responseData = parcel.parseResponseData(rawData);

                if (responseData.getError() === null) {
                    resolve(responseData.getResult());
                    return;
                }

                reject(responseData.getError());
            })
            .catch((rawError) => {
                reject(parcel.parseResponseError(rawError.message));
            });
    });
}

/**
 *
 * Add authentication info to parcel
 * These info can be saved in cookie when an user logged in successfully
 * @param {Parcel} parcel
 */
function authentify(parcel) {
    const token = getAuthToken();
    parcel.setRequestHeader('Authorization', `Bearer ${token}`);
}

/**
 *
 * Get authorization token,
 * that might be saved in browser's cookie when and user logged in successfully
 * @return {string}
 */
function getAuthToken() {
    return getCookie('Authorization');
}

export default {
    add
}
