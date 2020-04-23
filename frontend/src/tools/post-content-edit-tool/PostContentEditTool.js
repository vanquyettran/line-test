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
            contentType: CONTENT_IMAGE
        };
    }

    updateContentType = (contentType) => {
        if (contentType === this.state.contentType) {
            return;
        }
        this.setState({contentType});
    };

    render() {
        const {
            contentType
        } = this.state;

        return <div className="post-content-edit-tool">
            <TopBar
                contentType={contentType}
                updateContentType={this.updateContentType}
            />
            <ContentArea
                contentType={contentType}
            />
        </div>;
    }
}