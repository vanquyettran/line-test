import './Gallery.less';
import React from 'react';
import Spinner from '../../../../components/spinner/Spinner';

export default class Gallery extends React.Component {

    render() {
        const {fileInfoList} = this.props;

        return <div className="gallery">
            {
                fileInfoList.length > 0
                &&
                (
                    fileInfoList.length > 1
                        ?
                        <div className="grid-view">
                            <ul>
                                {
                                    fileInfoList.map((fileInfo, index) => <li key={index}>
                                        {renderImageView(fileInfo)}
                                    </li>)
                                }
                            </ul>
                        </div>
                        :
                        <div className="full-view">
                            {renderImageView(fileInfoList[0])}
                        </div>
                )
            }
        </div>;
    }
}

/**
 *
 * @param {{data, error}} fileInfo
 * @return {Component}
 */
function renderImageView(fileInfo) {
    return <div className="image-view">
        {
            fileInfo.data !== null &&
            <img src={fileInfo.data}/>
        }
        {
            fileInfo.error !== null &&
            <div className="error">
                <div className="text">{fileInfo.error}</div>
            </div>
        }
        {
            fileInfo.uploading &&
            <div className="uploading">
                <Spinner/>
            </div>
        }
    </div>;
}