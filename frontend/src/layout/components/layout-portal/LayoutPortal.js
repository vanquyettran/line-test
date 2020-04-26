import React from 'react';
import ReactDOM from 'react-dom';
import {getLayoutPortalElement} from '../../domElements';

export default class LayoutPortal extends React.Component {

    constructor(props) {
        super(props);

        this.initEl();
    }

    initEl = () => {
        this.el = document.createElement('div');
        this.el.className = this.props.name;
        this.el.style.display = 'contents';
    };

    componentDidMount() {
        getLayoutPortalElement().appendChild(this.el);
    }

    componentWillUnmount() {
        this.el.parentNode.removeChild(this.el);
        this.el = undefined;
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el
        );
    }
}

LayoutPortal.defaultProps = {
    name: ''
};