import './Dropdown.less';
import React from 'react';
import LayoutPortal from '../../layout/components/layout-portal/LayoutPortal';
import {getLayoutScrollElement, getLayoutPortalElement} from '../../layout/domElements';
import {setCloseByOutsideDispatcher, unsetCloseByOutsideDispatcher} from '../../utils/dom';

let autoIncId = 0;

export default class Dropdown extends React.Component {
    constructor(props) {
        super(props);

        this.id = ++autoIncId;

        /**
         *
         * @type {HTMLDivElement}
         */
        this.el = null;
    }

    componentDidMount() {
        this.setupCloseHandling();
        this.setDOMEventListeners();
        this.refreshDisplay();
    }

    componentWillUnmount() {
        this.endupCloseHandling();
    }

    componentDidUpdate() {
        this.refreshDisplay();
    }

    setupCloseHandling = () => {
        setCloseByOutsideDispatcher(
            `components.Dropdown.${this.id}`,
            [this.el, this.props.opener],
            this.props.close
        );
    };

    endupCloseHandling = () => {
        unsetCloseByOutsideDispatcher(`components.Dropdown.${this.id}`);
    };

    setDOMEventListeners = () => {
        getLayoutScrollElement().addEventListener('scroll', () => this.refreshDisplay());
        getLayoutScrollElement().addEventListener('resize', () => this.refreshDisplay());
    };

    refreshDisplay = () => {
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
        const {name, children} = this.props;

        return <LayoutPortal name="dropdown">
            <div
                className={`dropdown ${name}-dropdown`}
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
