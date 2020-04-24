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
import Gallery from './components/gallery/Gallery';
import {readFileAsDataURL} from '../../utils/browser';


export default class ImageUploadTool extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: [],
            fileInfoList: []
        };
    }

    handleFiles = files => {
        const {fileInfoList} = this.state;

        files.forEach(file =>
            readFileAsDataURL(file).then(
                data => fileInfoList.push({
                    data,
                    error: null
                })
            ).catch(
                error => fileInfoList.push({
                    data: null,
                    error
                })
            ).finally(
                () => this.forceUpdate()
            )
        );
    };

    render() {
        const {fileInfoList} = this.props;

        return <div className="image-upload-tool">
            <div className="workspace">
                {
                    fileInfoList.length > 0
                        ?
                        <Gallery fileInfoList={fileInfoList}/>
                        :
                        <DropBox onChange={files => this.handleFiles(files)}>
                            <div className="guideline">{translate('Drop your photo here')}</div>
                            <div className="guideline">{translate('or')}</div>
                            <div className="browse">
                                <BrowseButton onChange={files => this.handleFiles(files)}/>
                            </div>
                        </DropBox>
                }
            </div>
            <div className="hint">
                <p>{translate('Formats: ::exts', {exts: fileExts.map(t => t.toUpperCase())})}</p>
                <p>{translate('File size: ::size', {size: formatBytes(maxBytes)})}</p>
            </div>
        </div>;
    }
}

