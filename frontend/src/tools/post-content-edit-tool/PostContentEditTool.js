import './PostContentEditTool.less';
import React from 'react';
import TopBar from './components/top-bar/TopBar';
import ContentArea from './components/content-area/ContentArea';
import {
    CONTENT_IMAGE,
    CONTENT_VIDEO,
    CONTENT_EMOJI,
    CONTENT_COUPON,
    CONTENT_LINK,
    CONTENT_SURVEY
} from '../../models/post/contentTypes';

export default class PostContentEditTool extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contentType: CONTENT_IMAGE,
            contentData: [
                {
                    id: '/img/car-white.jpg',
                    thumbnailUrl: '/img/car-white.jpg',
                },
                {
                    id: '/img/car-red.jpg',
                    thumbnailUrl: '/img/car-red.jpg',
                },
            ]
        };
    }

    setContent(values) {
        const {onChange} = this.props;
        this.setState(values, () => onChange({
            contentType: this.state.contentType,
            contentData: this.state.contentData
        }));
    };

    updateContentType = (contentType) => {
        if (contentType === this.state.contentType) {
            return;
        }
        this.setContent({contentType});
    };

    updateContentData = (contentData) => {
        this.setContent({contentData});
    };

    render() {
        const {
            contentType,
            contentData
        } = this.state;

        return <div className="post-content-edit-tool">
            <TopBar
                contentType={contentType}
                updateContentType={this.updateContentType}
            />
            <ContentArea
                contentType={contentType}
                contentData={contentData}
                updateContentData={this.updateContentData}
            />
        </div>;
    }
}

PostContentEditTool.defaultProps = {
    onChange: ({contentType, contentData}) =>
        console.log('(PostContentEditTool) onChange is not defined.', {contentType, contentData}),

};