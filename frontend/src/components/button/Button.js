import './Button.less';
import React from 'react';

export default class Button extends React.Component {
    render() {
        const {
            title,
            tooltip,
            onClick,
            appearance = 'neutral', // neutral, primary
            size = 'medium', // small, medium, large
            disabled,
        } = this.props;

        return <button
            type="button"
            className={`button appearance-${appearance} size-${size} ${disabled ? 'disabled' : ''}`}
            onClick={ev => disabled || onClick(ev)}
            {...{'aria-label': tooltip || ''}}
        >
            {title}
        </button>;
    }
}