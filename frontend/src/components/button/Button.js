import './Button.less';
import React from 'react';

export default class Button extends React.Component {
    render() {
        const {
            title,
            onClick,
            appearance = 'neutral', // neutral, primary
            size = 'medium', // small, medium, large
        } = this.props;

        return <button
            type="button"
            className={`button appearance-${appearance} size-${size}`}
            onClick={onClick}
        >
            {title}
        </button>;
    }
}