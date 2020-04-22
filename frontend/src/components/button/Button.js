import './Button.less';
import React from 'react';

export default class Button extends React.Component {
    render() {
        const {title, onClick} = this.props;
        return <button
            type="button"
            className="button"
            onClick={onClick}
        >
            {title}
        </button>;
    }
}