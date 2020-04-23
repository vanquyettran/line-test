import './BrowseButton.less';
import React from 'react';
import Icon from '../../../../components/icon/Icon';
import {translate} from '../../../../i18n';
import {
    mimeTypes,
} from '../../../../models/image/rules';

export default class BrowseButton extends React.Component {
    constructor(props) {
        super(props);
    }

    handleFileInputChange = (ev) => {
        ev.preventDefault();

        const file = ev.target.files[0];
        this.props.onChange(file);
    };

    render() {
        return <label
            className="browse-button"
        >
            <div className="text">{translate('Browse')}</div>
            <div className="icon-holder">
                <Icon name="plus" size="small"/>
            </div>
            <input
                type="file"
                accept={mimeTypes.join(',')}
                onChange={this.handleFileInputChange}
            />
        </label>;
    }
}

BrowseButton.defaultProps = {
    onChange: (file) => console.log('BrowseButton onChange', file),
};