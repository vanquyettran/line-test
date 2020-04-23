import './ImageCard.less';
import React from 'react';
import IconButton from '../../../../../../components/icon-button/IconButton';
import {translate} from "../../../../../../i18n/i18n";
import Icon from "../../../../../../components/icon/Icon";
import Popup from "../../../../../../components/popup/Popup";
import ImageUploadTool from '../../../../../image-upload-tool/ImageUploadTool';
import {
    mimeTypes,
    fileExts,
    maxBytes
} from '../../../../../../models/image/rules';
import {
    formatBytes
} from '../../../../../../utils/number';

export default class ImageCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toolShown: false
        };
    }

    showTool = () => {
        if (this.state.toolShown === false) {
            this.setState({toolShown: true});
        }
    };

    hideTool = () => {
        if (this.state.toolShown === true) {
            this.setState({toolShown: false});
        }
    };

    /**
     *
     * @param {IImage} image
     */
    addImage = (image) => {
        const {images, updateImages} = this.props;
        images.push(image);
        updateImages(images);
    };

    /**
     *
     * @param {IImage} image
     */
    removeImage = (image) => {
        const {images, updateImages} = this.props;
        const index = images.indexOf(image);
        images.splice(index, 1);
        updateImages(images);
    };

    render() {
        const {
            toolShown
        } = this.state;

        const {
            images
        } = this.props;

        return <div className="image-card">
            {
                images.length > 0
                    ? getCardContent(images, this.showTool, this.removeImage)
                    : getCardPlaceholder(this.showTool)
            }
            {
                toolShown &&
                <Popup close={this.hideTool}>
                    <ImageUploadTool
                        onDone={(image) => {
                            this.addImage(image);
                            this.hideTool();
                        }}
                        onCancel={() => this.hideTool()}
                    />
                </Popup>
            }
        </div>;
    }
}

/**
 *
 * @param {function} requestAddImage
 * @return {Component}
 */
function getCardPlaceholder(requestAddImage) {
    return <div className="card-placeholder">
        <div className="click-box" onClick={() => requestAddImage()}>
            <div className="text">{translate('Upload Photo')}</div>
            <div className="icon-holder">
                <Icon name="photo"/>
            </div>
        </div>
        <div className="hint">
            <p>{translate('Formats: ::exts', {exts: fileExts.map(t => t.toUpperCase())})}</p>
            <p>{translate('File size: ::size', {size: formatBytes(maxBytes)})}</p>
        </div>
    </div>;
}

/**
 * @param {IImage[]} images
 * @param {function} requestAddImage
 * @param {function} requestRemoveImage
 * @return {Component}
 */
function getCardContent(images, requestAddImage, requestRemoveImage) {
    return <div className="card-content">
        <ul>
            {
                images.map(image => (
                    <li key={image.id}>
                        {getImageThumbnail(image, requestRemoveImage)}
                    </li>
                ))
            }
            <li>
                {
                    getAddButton(requestAddImage)
                }
            </li>
        </ul>
    </div>;
}

/**
 *
 * @param {IImage} image
 * @param {function} requestRemoveImage
 * @return {Component}
 */
function getImageThumbnail(image, requestRemoveImage) {
    return <div
        className="image-thumbnail"
    >
        <img src={image.thumbnailUrl}/>
        <IconButton
            className="remove-button"
            icon="times"
            onClick={() => requestRemoveImage(image)}
        />
    </div>;
}

/**
 *
 * @param {function} requestAddImage
 * @return {Component}
 */
function getAddButton(requestAddImage) {
    return <button
        className="add-button"
        type="button"
        onClick={() => requestAddImage()}
    >
        <Icon name="plus"/>
    </button>;
}