import React from 'react';
import ReactDOM from 'react-dom';
import {getLayoutPortalElement} from '../../../utils/dom';

export default class LayoutPortal extends React.Component {

    constructor(props) {
        super(props);

        this.el = document.createElement('div');
        this.el.className = props.className;
    }

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
