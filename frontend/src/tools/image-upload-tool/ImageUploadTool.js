import './ImageUploadTool.less';
import React from 'react';
import Button from '../../components/button/Button';
import Icon from '../../components/icon/Icon';
import {translate} from "../../i18n";
import {
    mimeTypes,
    fileExts,
    maxBytes
} from '../../models/image/rules';
import {
    formatBytes
} from '../../utils/number';
import DropBox from './components/drop-box/DropBox';
import BrowseButton from './components/browse-button/BrowseButton';


export default class ImageUploadTool extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: []
        };
    }

    handleFile = file => {
        console.log('handleFile', file);

    };

    render() {
        const {onDone} = this.props;

        return <div className="image-upload-tool">
            <div className="workspace">
                <DropBox onChange={file => this.handleFile(file)}>
                    <div className="guideline">{translate('Drop your photo here')}</div>
                    <div className="guideline">{translate('or')}</div>
                    <div className="browse">
                        <BrowseButton onChange={file => this.handleFile(file)}/>
                    </div>
                </DropBox>
            </div>
            <div className="hint">
                <p>{translate('Formats: ::exts', {exts: fileExts.map(t => t.toUpperCase())})}</p>
                <p>{translate('File size: ::size', {size: formatBytes(maxBytes)})}</p>
            </div>
        </div>;
    }
}