import './IconButton.less';
import React from 'react';
import Icon from '../icon/Icon';

export default class IconButton extends React.Component {
    render() {
        const {
            icon,
            onClick,
            appearance = 'neutral', // primary, neutral
            size = 'medium', // small, medium, large, custom
            name = ''
        } = this.props;

        return <button
            type="button"
            className={`iconbutton ${name} appearance-${appearance} size-${size}`}
            onClick={onClick}
        >
            <Icon name={icon}/>
        </button>;
    }
}