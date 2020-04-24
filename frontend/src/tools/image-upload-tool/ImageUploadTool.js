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
import {checkErrors} from '../../models/image/rules';
import ImageUploadParcel from '../../api/endpoints/image/ImageUploadParcel';
import Request from '../../api/Request';
import ResponseError from '../../api/ResponseError';


export default class ImageUploadTool extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: [],
            fileInfoList: [],
            uploadedImages: []
        };
    }

    handleFiles = files => {
        files.forEach(file =>
            readFileAsDataURL(file).then(
                data => this.onFileData(data, file)
            ).catch(
                error => this.onFileError(error)
            )
        );
    };

    onFileData = (data, file) => {
        const {fileInfoList} = this.state;

        const error = getFileError(file);

        const fileInfo = {
            data,
            error,
            uploading: error === null
        };

        fileInfoList.push(fileInfo);

        this.forceUpdate();

        if (error !== null) {
            return;
        }

        this.uploadFile(file, fileInfo);
    };

    onFileError = (error) => {
        const {fileInfoList} = this.state;

        const fileInfo = {
            data: null,
            error,
            uploading: false
        };

        fileInfoList.push(fileInfo);

        this.forceUpdate();
    };

    uploadFile = (file, fileInfo) => {
        const {uploadedImages} = this.state;

        /**
         * @type {IImage}
         */
        const onDone = image => {
            uploadedImages.push(image);
        };

        /**
         * @param {ResponseError} responseError
         */
        const onError = responseError => {
            fileInfo.error = responseError.getMessage();
        };

        Request.add(new ImageUploadParcel(file))
            .then(onDone)
            .catch(onError)
            .finally(() => {
                fileInfo.uploading = false;
                this.forceUpdate();
            });
    };

    render() {
        const {fileInfoList} = this.state;

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

/**
 *
 * @param {File} file
 */
function getFileError(file) {
    const ext = file.name.split('.').pop();
    const errors = checkErrors(file.type, ext, file.size);
    if (errors.length === 0) {
        return null;
    }
    return translate('Invalid: ::errors', {errors});
}
