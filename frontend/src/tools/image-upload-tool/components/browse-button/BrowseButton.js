import './BrowseButton.less';
import React from 'react';
import Icon from '../../../../components/icon/Icon';
import {translate} from '../../../../i18n';
import ImageRuler from '../../../../models/image/ImageRuler';

export default class BrowseButton extends React.Component {
    constructor(props) {
        super(props);
    }

    handleFileInputChange = (ev) => {
        ev.preventDefault();

        const files = [].slice.call(ev.target.files, 0);
        this.props.onChange(files);
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
                multiple="multiple"
                accept={ImageRuler.mimeTypes.join(',')}
                onChange={this.handleFileInputChange}
            />
        </label>;
    }
}

BrowseButton.defaultProps = {
    onChange: (file) => console.log('BrowseButton onChange', file),
};