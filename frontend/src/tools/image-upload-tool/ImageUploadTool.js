import './ImageUploadTool.less';
import React from 'react';
import Button from '../../components/button/Button';
import Icon from '../../components/icon/Icon';
import {translate} from "../../i18n/i18n";
import {
    fileExts,
    maxBytes
} from '../../models/image/rules';
import {
    formatBytes
} from '../../utils/number';

export default class ImageUploadTool extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {onDone} = this.props;

        return <div className="image-upload-tool">
            <div className="workspace">
                <div className="drop-box">
                    <div className="guideline">{translate('Drop your photo here')}</div>
                    <div className="guideline">{translate('or')}</div>
                    <div className="browse">
                        <button
                            type="button"
                            className="browse-button"
                        >
                            <span className="text">{translate('Browse')}</span>
                            <span className="icon-holder">
                                <Icon name="plus" size="small"/>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="hint">
                <p>{translate('Formats: ::exts', {exts: fileExts.map(t => t.toUpperCase())})}</p>
                <p>{translate('File size: ::size', {size: formatBytes(maxBytes)})}</p>
            </div>
        </div>;
    }
}