
/**
 *
 * @param {Parcel} parcel
 * @return {Promise}
 */
function add(parcel) {
    return new Promise((resolve, reject) => {
        fetch(
            parcel.getRequestUrl(),
            {
                method: parcel.getRequestMethod(),
                headers: parcel.getRequestHeaders(),
                body: parcel.getRequestBody(),
                credentials: 'same-origin'
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
 * @param {Parcel[]} parcels
 * @return {Promise}
 */
function parallel(parcels) {
    return Promise.all(parcels.map(parcel => add(parcel)));
}

export default {
    add,
    parallel
}
