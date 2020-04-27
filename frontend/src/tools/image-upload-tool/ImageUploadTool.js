import './ImageUploadTool.less';
import React from 'react';
import {translate} from "../../i18n";
import ImageRuler from '../../models/image/ImageRuler';
import {formatNumberLocalized, formatBytesLocalized} from '../../utils/number';
import DropBox from './components/drop-box/DropBox';
import BrowseButton from './components/browse-button/BrowseButton';
import Gallery, {
    GALLERY_FULL,
    GALLERY_GRID
} from './components/gallery/Gallery';
import {readFileAsDataURL} from '../../utils/browser';
import ImageUploadParcel from '../../api/endpoints/image/ImageUploadParcel';
import Request from '../../api/Request';
import ResponseError from '../../api/ResponseError';
import BottomBar, {
    STATUS_EMPTY,
    STATUS_ALL_SUCCESS,
    STATUS_ALL_ERROR,
    STATUS_BOTH_SUCCESS_ERROR,
    STATUS_PROGRESSING
} from './components/bottom-bar/BottomBar';

const MAX_FILES = 12;

export default class ImageUploadTool extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fileInfoList: [],
            uploadedImages: [],
            isReadingFiles: false,
            galleryLayout: this.getGalleryLayout(0)
        };
    }

    getGalleryLayout = (numOfFiles) => {
        if (numOfFiles > 1) {
            return GALLERY_GRID;
        }

        return GALLERY_FULL;
    };

    readFileSequentially = (index, files, numRead, onDone) => {
        const file = files[index];

        const next = () => {
            if (index < numRead - 1) {
                this.readFileSequentially(index + 1, files, numRead, onDone);
                return;
            }
            onDone();
        };

        const error = getFileError(file);
        if (error !== null) {
            this.onFileError(error, file);
            next();
            return;
        }

        readFileAsDataURL(file)
            .then(data => this.onFileData(data, file))
            .catch(error => this.onFileError(error, file))
            .finally(next);
    };

    handleFiles = files => {
        const numRead = Math.min(files.length, MAX_FILES);

        this.setState(
            {
                isReadingFiles: true,
                galleryLayout: this.getGalleryLayout(numRead)
            },
            () => this.readFileSequentially(
                0,
                files,
                numRead,
                () => this.setState({isReadingFiles: false})
            )
        );
    };

    /**
     *
     * @param {File} file
     * @param {string|null} data
     * @param {string|null} error
     * @param uploading
     * @return {IFileInfo}
     */
    createFileInfo = (file, data, error, uploading) => {
        return {
            name: file.name,
            data,
            error,
            uploading
        };
    };

    onFileData = (data, file) => {
        const fileInfo = this.createFileInfo(file, data, null, true);

        this.addFileInfo(fileInfo);
        this.uploadFile(file, fileInfo);
    };

    onFileError = (error, file) => {
        const fileInfo = this.createFileInfo(file, null, error, false);

        this.addFileInfo(fileInfo);
    };

    addFileInfo = (fileInfo) => {
        this.state.fileInfoList.push(fileInfo);
        this.forceUpdate();
    };

    uploadFile = (file, fileInfo) => {
        const {uploadedImages} = this.state;

        /**
         * @param {IImage} image
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
        };

        Request.add(new ImageUploadParcel(file))
            .then(onDone)
            .catch(onError)
            .finally(onFinish);
    };

    getIsUploading = () => {
        return this.state.fileInfoList.some(fileInfo => fileInfo.uploading);
    };

    getStatus = () => {

        if (this.state.isReadingFiles || this.getIsUploading()) {
            return STATUS_PROGRESSING;
        }

        const {uploadedImages, fileInfoList} = this.state;

        if (fileInfoList.length === 0) {
            return STATUS_EMPTY;
        }

        if (fileInfoList.length === uploadedImages.length) {
            return STATUS_ALL_SUCCESS;
        }

        if (fileInfoList.length > 0 && uploadedImages.length === 0) {
            return STATUS_ALL_ERROR;
        }

        return STATUS_BOTH_SUCCESS_ERROR;
    };

    apply = () => {
        this.props.onDone(this.state.uploadedImages);
    };

    reset = () => {
        this.state.fileInfoList.length = 0;
        this.state.uploadedImages.length = 0;
        this.forceUpdate();
    };

    filter = () => {
        this.state.fileInfoList = this.state.fileInfoList.filter(fileInfo => fileInfo.error === null);
        this.forceUpdate();
    };

    cancel = () => {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    };

    render() {
        const {fileInfoList, galleryLayout} = this.state;

        return <div className="image-upload-tool">
            <div className="workspace">
                {
                    fileInfoList.length > 0
                        ?
                        <Gallery
                            fileInfoList={fileInfoList}
                            layout={galleryLayout}
                        />
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
            {getHintBlock()}
            <BottomBar
                apply={this.apply}
                reset={this.reset}
                filter={this.filter}
                cancel={this.cancel}
                status={this.getStatus()}
            />
        </div>;
    }
}


ImageUploadTool.defaultProps = {
    onDone: (uploadedImages) => console.log('ImageUploadTool onDone is not defined.', uploadedImages),
    onCancel: () => {}
};


/**
 *
 * @param {File} file
 */
function getFileError(file) {
    const ext = file.name.split('.').pop();
    const errors = ImageRuler.checkErrors(file.type, ext, file.size);
    if (errors.length === 0) {
        return null;
    }
    return errors.join('; ');
}

/**
 *
 * @return {Component}
 */
function getHintBlock() {
    return <div className="hint">
        <p>{translate('Formats: ::exts', {exts: ImageRuler.fileExts.map(t => t.toUpperCase())})}</p>
        <p>{translate('File size: ::size', {size: formatBytesLocalized(ImageRuler.maxBytes)})}</p>
        <p>{translate('Limit: ::max files', {max: formatNumberLocalized(MAX_FILES)})}</p>
    </div>;
}

