import './ImageUploadTool.less';
import React from 'react';
import {translate} from "../../i18n";
import {fileExts, maxBytes, checkErrors} from '../../models/image/rules';
import {formatBytes} from '../../utils/number';
import DropBox from './components/drop-box/DropBox';
import BrowseButton from './components/browse-button/BrowseButton';
import Gallery from './components/gallery/Gallery';
import {readFileAsDataURL} from '../../utils/browser';
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
        const error = getFileError(file);

        const fileInfo = {
            data,
            error,
            uploading: error === null
        };

        this.addFileInfo(fileInfo);

        if (error === null) {
            this.uploadFile(file, fileInfo);
        }
    };

    onFileError = (error) => {
        const fileInfo = {
            data: null,
            error,
            uploading: false
        };

        this.addFileInfo(fileInfo);
    };

    addFileInfo = (fileInfo) => {
        this.state.fileInfoList.push(fileInfo);
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

        const onFinish = () => {
            fileInfo.uploading = false;
            this.forceUpdate();

            if (this.isAllUploadsEnded()) {
                this.onAllUploadsEnded();
            }
        };

        Request.add(new ImageUploadParcel(file))
            .then(onDone)
            .catch(onError)
            .finally(onFinish);
    };

    isAllUploadsEnded = () => {
        return this.state.fileInfoList.every(fileInfo => !fileInfo.uploading);
    };

    onAllUploadsEnded = () => {
        const {onDone} = this.props;
        const {uploadedImages} = this.state;

        if (uploadedImages.length > 0) {
            onDone(uploadedImages);
        }
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


ImageUploadTool.defaultProps = {
    onDone: (uploadedImages) => console.log('ImageUploadTool onDone is not defined.', uploadedImages)
};


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
