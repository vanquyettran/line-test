import './Dropdown.less';
import React from 'react';
import LayoutPortal from '../../layout/components/layout-portal/LayoutPortal';
import {getLayoutScrollElement, getLayoutPortalElement} from '../../layout/domElements';

export default class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        /**
         *
         * @type {HTMLDivElement}
         */
        this.el = null;
    }

    componentDidMount() {
        closeOthers(this.props.opener, this.props.close);

        this.updateAll();
        this.setDOMEventListeners();
    }

    componentDidUpdate() {
        this.updateAll();
    }

    setDOMEventListeners = () => {
        getLayoutScrollElement().addEventListener('scroll', () => this.updateAll());
        getLayoutScrollElement().addEventListener('resize', () => this.updateAll());
    };

    updateAll = () => {
        if (this.el === null) {
            return;
        }

        if (!this.props.opener) {
            throw new Error('props.opener must be specified');
        }

        const op = this.getOpenerValues();
        const pt = this.getPortalValues();

        this.updateDimensions(op, pt);
        this.updatePosition(op, pt);
    };

    /**
     *
     * @param {{style: CSSStyleDeclaration, rect: ClientRect}} op
     * @param {{style: CSSStyleDeclaration, rect: ClientRect}} pt
     */
    updateDimensions = (op, pt) => {
        if (!this.props.matchOpenerWidth) {
            return;
        }

        this.setStyle('width', op.rect.width + 'px');
    };

    /**
     *
     * @param {{style: CSSStyleDeclaration, rect: ClientRect}} op
     * @param {{style: CSSStyleDeclaration, rect: ClientRect}} pt
     */
    updatePosition = (op, pt) => {
        this.setStyle('left', op.rect.left + 'px');
        this.setStyle('top', op.rect.bottom + 'px');
    };

    /**
     *
     * @param {string} name
     * @param {string|number} value
     */
    setStyle = (name, value) => {
        this.el.style[name] = value;
    };

    /**
     *
     * @return {{style: CSSStyleDeclaration, rect: ClientRect}}
     */
    getOpenerValues = () => {
        const {opener} = this.props;
        return {
            style: window.getComputedStyle(opener),
            rect: opener.getBoundingClientRect()
        };
    };

    /**
     *
     * @return {{style: CSSStyleDeclaration, rect: ClientRect}}
     */
    getPortalValues = () => {
        const portal = getLayoutPortalElement();
        return {
            style: window.getComputedStyle(portal),
            rect: portal.getBoundingClientRect(),
        };
    };

    render = () => {
        const {children} = this.props;

        return <LayoutPortal name="dropdown">
            <div
                className="dropdown"
                ref={el => this.el = el}
                style={{
                    display: 'table',
                    position: 'fixed'
                }}
            >
                {children}
            </div>
        </LayoutPortal>;
    };
}


Dropdown.defaultProps = {
    opener: null,
    matchOpenerWidth: false
};


// CLOSE DISPATCHERS
const closeDispatchers = [];

function closeOthers(opener, close) {
    closeDispatchers.forEach(([_opener, _close]) => {
        if (_opener !== opener) {
            _close();
        }
    });

    addCloseDispatcherIfNotYet(opener, close);
}

function addCloseDispatcherIfNotYet(opener, close) {
    if (closeDispatchers.some(([_opener]) => _opener === opener)) {
        return;
    }

    closeDispatchers.push([opener, close]);
}
