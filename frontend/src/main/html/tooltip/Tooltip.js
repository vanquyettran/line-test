import './Tooltip.less';

const ATTR_TOOLTIP = 'aria-label';

/**
 *
 * @param {HTMLElement|Node} el
 * @param {number?} triedCount
 * @return {*}
 */
function findOpener(el, triedCount = 0) {
    if (!(el instanceof HTMLElement)) {
        return null;
    }

    if (el.getAttribute(ATTR_TOOLTIP)) {
        return el;
    }

    if (triedCount < 5) {
        return findOpener(el.parentNode, triedCount + 1);
    }

    return null;
}

function createTooltip(opener) {
    const el = document.createElement('div');
    el.className = 'tooltip';
    el.textContent = opener.getAttribute(ATTR_TOOLTIP);
    return el;
}

function appendTooltip(tooltip) {
    document.body.appendChild(tooltip);
}

function removeTooltip(tooltip) {
    tooltip.parentNode.removeChild(tooltip);
}

function updatePosition(tooltip, opener) {
    const frameEl = document.body;
    const frameRect = frameEl.getBoundingClientRect();

    const frameTop = frameRect.top;
    const frameLeft = frameRect.left;

    // use element client with instead of offset width or rect.width to exclude scroll bar, border, padding....
    const frameWidth = frameEl.clientWidth;
    const frameHeight = frameEl.clientHeight;

    const openerRect = opener.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    const marginEdge = 5; // margin to frame edge

    tooltip.style.top = Math.max(
            Math.min(
                openerRect.top,
                frameTop + frameHeight
            ) - tooltipRect.height - marginEdge,
            frameTop + marginEdge
        ) + 'px';

    tooltip.style.left = Math.max(
            Math.min(
                openerRect.left + openerRect.width / 2 - tooltipRect.width / 2,
                frameLeft + frameWidth - tooltipRect.width - marginEdge
            ),
            frameLeft + marginEdge
        ) + 'px';
}

let activeTooltip = null;
let activeOpener = null;

function deactivate() {
    removeTooltip(activeTooltip);

    activeTooltip = null;
    activeOpener = null;
}

function activate(tooltip, opener) {
    activeTooltip = tooltip;
    activeOpener = opener;
    appendTooltip(tooltip);
    updatePosition(tooltip, opener);
}

function isActive() {
    return activeTooltip !== null;
}

function onMouseMove(ev) {
    const opener = findOpener(ev.target);

    if (opener === activeOpener) {
        return;
    }

    if (isActive()) {
        deactivate();
    }

    if (opener === null) {
        return;
    }

    activate(createTooltip(opener), opener);
}

function initTooltip() {
    document.addEventListener('mousemove', onMouseMove);
}

const Tooltip = {
    init: initTooltip,
    attr: ATTR_TOOLTIP
};

export default Tooltip;
