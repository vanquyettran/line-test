const dispatchers = {};

/**
 *
 * @param id {string}
 * @param ignoredEls {[Node]}
 * @param close {function}
 */
function setCloseByOutsideDispatcher(id, ignoredEls, close) {
    if ('string' === typeof id
        && ignoredEls.every(el => el instanceof Node)
        && 'function' === typeof close
    ) {
        dispatchers[id] = [ignoredEls, close];
    } else {
        console.error('invalid arguments provided for ' + id);
    }
}

function unsetCloseByOutsideDispatcher(id) {
    delete dispatchers[id];
}

function dispatch(event, ignoredEls, close) {
    if (ignoredEls.every(ignoredEl => {
            return ignoredEl !== event.target
                && !ignoredEl.contains(event.target)
                && document.body.contains(event.target)
        })) {
        close();
    }
}

function dispatchAll() {
    for (let id in dispatchers) {
        if (dispatchers.hasOwnProperty(id)) {
            dispatch(event, ...dispatchers[id]);
        }
    }
}

document.addEventListener('mousedown', dispatchAll);

export {
    setCloseByOutsideDispatcher,
    unsetCloseByOutsideDispatcher
};