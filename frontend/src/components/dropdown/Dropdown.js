import './Dropdown.less';
import React from 'react';
import LayoutPortal from '../../layout/components/layout-portal/LayoutPortal';
import {getLayoutScrollElement, getLayoutPortalElement} from '../../layout/domElements';

const openerClosers = [];

const addOpenerCloser = (opener, closer) => {
    if (openerClosers.some(([_opener]) => _opener === opener)) {
        return;
    }
    openerClosers.push([opener, closer]);
};

const closeOtherOpeners = (opener) => {
    console.log('closers',openerClosers);
    openerClosers.forEach(([_opener, _close]) => {
        if (_opener !== opener) {
            _close();
        }
    });
};

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

        this.mounted = false;
    }

    componentDidMount() {
        this.mounted = true;
        addOpenerCloser(this.props.opener, this.props.close);
        closeOtherOpeners(this.props.opener);
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
        // this.setStyle('width', op.rect.width + 'px');
        // this.setStyle('max-height', pt.rect.height + 'px');
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

    calcWidth = () => {

    };

    calcHeight = () => {

    };

    render = () => {
        const {children} = this.props;

        return <LayoutPortal name="dropdown">
            <div
                className="overlay"
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
    opener: document.body
};
