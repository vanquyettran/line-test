
function jsonCopy(json_var) {
    return JSON.parse(JSON.stringify(json_var))
}

function jsonCompare(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

export {
    jsonCopy,
    jsonCompare
}
