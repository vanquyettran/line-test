import './ImageCard.less';
import React from 'react';
import IconButton from '../../../../../../components/icon-button/IconButton';
import Button from '../../../../../../components/button/Button';
import {translate} from "../../../../../../i18n";
import Icon from "../../../../../../components/icon/Icon";
import Popup from "../../../../../../components/popup/Popup";
import ImageUploadTool from '../../../../../image-upload-tool/ImageUploadTool';
import ImageRuler from '../../../../../../models/image/ImageRuler';
import {formatBytesLocalized} from '../../../../../../utils/number';

export default class ImageCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toolShown: false
        };
    }

    showTool = () => {
        if (!this.state.toolShown) {
            this.setState({toolShown: true});
        }
    };

    hideTool = () => {
        if (this.state.toolShown) {
            this.setState({toolShown: false});
        }
    };

    /**
     *
     * @param {IImage[]} newImages
     */
    addImages = (newImages) => {
        const {images, updateImages} = this.props;
        images.push(...newImages);
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
        const {toolShown} = this.state;
        const {images} = this.props;

        return <div className="image-card">
            {
                images.length > 0
                    ? getCardContent(images, this.showTool, this.removeImage)
                    : getCardPlaceholder(this.showTool)
            }
            {
                toolShown &&
                <Popup title={translate('Upload photo')} close={() => this.hideTool()}>
                    <ImageUploadTool
                        onDone={(images) => {
                            this.addImages(images);
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
            <p>{translate('Formats: ::exts', {exts: ImageRuler.fileExts.map(t => t.toUpperCase())})}</p>
            <p>{translate('File size: ::size', {size: formatBytesLocalized(ImageRuler.maxBytes)})}</p>
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
                images.map((image, index) => <li key={image.id}>
                    <div className="aspect-ratio-keeper">
                        {getImageThumbnail(image, requestRemoveImage)}
                    </div>
                </li>)
            }
            <li>
                <div className="aspect-ratio-keeper">
                    {getAddButton(requestAddImage)}
                </div>
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
            name="remove-button"
            icon="times"
            size="custom"
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
    return <div
        className="adding-pad"
        onClick={() => requestAddImage()}
    >
        <Icon name="plus"/>
    </div>;
}