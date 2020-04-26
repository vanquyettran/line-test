/**
 *
 * @return {Window}
 */
function getLayoutScrollElement() {
    return window;
}

/**
 *
 * @return {Element|HTMLElement}
 */
function getLayoutPortalElement() {
    return document.querySelector('#layout-portal') || document.body;
}

export {
    getLayoutScrollElement,
    getLayoutPortalElement
};
