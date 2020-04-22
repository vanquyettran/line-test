import './Button.less';
import React from 'react';

export default class Button extends React.Component {
    render() {
        const {size = 'medium', children} = this.props;
        return <button
            className="button"
            type="button"
        >
            {children}
        </button>;
    }
}