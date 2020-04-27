function timeToUTC(time) {
    const now = new Date(time);

    if (isNaN(now.getTime())) {
        return time;
    }

    const utc = Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds()
    );

    console.log(new Date(time).toISOString(), new Date(utc).toISOString());

    return utc;
}

function timeFromUTC(time) {
    // TODO: need to implement
    return time;
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
