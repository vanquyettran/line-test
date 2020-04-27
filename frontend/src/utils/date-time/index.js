function timeToUTC(time) {
    const tz = (new Date().getTimezoneOffset());
    return time + tz * 60 * 1000;
}

function timeFromUTC(time) {
    const tz = (new Date().getTimezoneOffset());
    return time - tz * 60 * 1000;
}

function getTimezoneStamp() {
    const gmt = -(new Date().getTimezoneOffset());

    let hours = Math.floor(gmt / 60);
    let minutes = gmt - (60 * hours);

    let hh = (hours < 0 ? '' : '+') + hours;
    let mm = (minutes < 10 ? '0' : '') + minutes;

    return `GMT ${hh}:${mm}`;
}

export {
    timeToUTC,
    timeFromUTC,
    getTimezoneStamp,
}
