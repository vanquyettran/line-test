
/**
 *
 * @param {Parcel} parcel
 * @return {Promise}
 */
function add(parcel) {

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
