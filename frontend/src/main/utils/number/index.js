import {getLanguageCode} from "../../i18n";

/**
 *
 * @param {number} number
 * @param {number?} n: length of decimal
 * @param {string?}   s: sections delimiter
 * @param {string?}   c: decimal delimiter
 * @return {string}
 */
const formatNumber = (number, n, s, c) => {
    if (typeof number !== 'number') {
        console.error(`${JSON.stringify(number)} is not a number`);
        return String(number);
    }
    let re = '\\d(?=(\\d{3})+' + (n > 0 ? '\\D' : '$') + ')';
    let num = number.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

/**
 *
 * @param {number} number
 * @param {number?} n: length of decimal
 * @return {string}
 */
const formatNumberLocalized = (number, n) => {
    let s = ',';
    let c = '.';
    if (getLanguageCode() === 'vi') {
        s = '.';
        c = ',';
    }
    if (n === undefined) {
        let decimalPart = number.toString().split('.')[1];
        if (decimalPart) {
            n = decimalPart.length;
        } else {
            n = 0;
        }
    }
    return formatNumber(number, n, s, c);
};

/**
 *
 * @param bytes
 * @param decimals
 * @return {string}
 */
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 *
 * @param bytes
 * @param decimals
 * @return {string}
 */
function formatBytesLocalized(bytes, decimals) {
    return formatBytes(bytes, decimals);
}

export {
    formatNumber,
    formatNumberLocalized,
    formatBytes,
    formatBytesLocalized
};

