import './IconButton.less';
import React from 'react';
import Icon from '../icon/Icon';

export default class IconButton extends React.Component {
    render() {
        const {
            icon,
            onClick,
            appearance = 'neutral', // primary, neutral
            size = 'medium', // small, medium, large
        } = this.props;

        return <button
            type="button"
            className={`icon-button appearance-${appearance} size-${size}`}
            onClick={onClick}
        >
            <Icon name={icon}/>
        </button>;
    }
}