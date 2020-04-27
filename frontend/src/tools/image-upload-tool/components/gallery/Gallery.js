import './Gallery.less';
import React from 'react';
import Spinner from '../../../../components/spinner/Spinner';
import Icon from '../../../../components/icon/Icon';
import {colorvWhite} from '../../../../values/color';

const GALLERY_FULL = 'full-view';
const GALLERY_GRID = 'grid-view';

export {
    GALLERY_FULL,
    GALLERY_GRID
};

export default class Gallery extends React.Component {

    getFullView = () => {
        const {fileInfoList} = this.props;
        return <div className="full-view">
            {getImageView(fileInfoList[0])}
        </div>;
    };

    getGridView = () => {
        const {fileInfoList} = this.props;
        return <div className="grid-view">
            <ul>
                {
                    fileInfoList.map((fileInfo, index) => <li key={index}>
                        {getImageView(fileInfo)}
                    </li>)
                }
            </ul>
        </div>;
    };

    getViewByLayout = (layout) => {
        switch (layout) {
            case GALLERY_FULL: return this.getFullView();
            case GALLERY_GRID: return this.getGridView();
        }

        return null;
    };

    render() {
        const {layout} = this.props;

        return <div className="gallery">
            {this.getViewByLayout(layout)}
        </div>;
    }
}

/**
 *
 * @param {{data, error}} fileInfo
 * @return {Component}
 */
function getImageView(fileInfo) {
    return <div className="image-view">
        {
            fileInfo.data !== null &&
            <img src={fileInfo.data}/>
        }
        {
            fileInfo.error !== null
                ?
                <div className="overlay-error">
                    <div className="error">
                        {fileInfo.error}
                    </div>
                </div>
                :
                (
                    fileInfo.uploading
                        ?
                        <div className="overlay-uploading">
                            <div className="indicator">
                                <Spinner color={colorvWhite}/>
                            </div>
                        </div>
                        :
                        <div className="overlay-success">
                            <div className="indicator">
                                <Icon name="check"/>
                            </div>
                        </div>

                )
        }

    </div>;
}

