import './ImageCard.less';
import React from 'react';
import IconButton from '../../../../../../components/icon-button/IconButton';
import {translate} from "../../../../../../i18n/i18n";
import Icon from "../../../../../../components/icon/Icon";
import Popup from "../../../../../../components/popup/Popup";
import ImageUploadTool from '../../../../../image-upload-tool/ImageUploadTool';

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
                    ? getCardContent(images, this.showTool)
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
 * @param {function} addImage
 * @return {Component}
 */
function getCardPlaceholder(addImage) {
    return <div
        className="card-placeholder"
        onClick={() => addImage()}
    >
        {translate('Upload Photo')}
    </div>;
}

/**
 * @param {IImage[]} images
 * @param {function} addImage
 * @return {Component}
 */
function getCardContent(images, addImage) {
    return <div className="card-content">
        <ul>
            {
                images.map(image => (
                    <li
                        key={image.thumbnailUrl}
                    >
                            {getImageThumbnail(image)}
                    </li>
                ))
            }
            <li key="add">
                {
                    getAddButton(addImage)
                }
            </li>
        </ul>
    </div>;
}

/**
 *
 * @param {IImage} image
 * @return {Component}
 */
function getImageThumbnail(image) {
    return <div
        className="image-thumbnail"
    >
        <img src={image.thumbnailUrl}/>
        <IconButton
            icon="times"
            onClick={() => console.log('clicked')}
        />
    </div>;
}

/**
 *
 * @param {function} addImage
 * @return {Component}
 */
function getAddButton(addImage) {
    return <button
        className="add-button"
        type="button"
        onClick={() => addImage()}
    >
        <Icon name="plus"/>
    </button>;
}