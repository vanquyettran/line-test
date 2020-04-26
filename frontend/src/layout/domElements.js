/**
 *
 * @return {Element|HTMLElement}
 */
function getLayoutScrollElement() {
    return document.body;
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
