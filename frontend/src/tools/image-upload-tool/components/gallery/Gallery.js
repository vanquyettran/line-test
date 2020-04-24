import './Gallery.less';
import React from 'react';

export default class Gallery extends React.Component {

    render() {
        const {fileInfoList} = this;

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
                            {renderImageView(fileInfo)}
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
            fileInfo.error !== null
                ?
                <div className="error">{fileInfo.error}</div>
                :
                <img src={fileInfo.data}/>
        }
    </div>;
}