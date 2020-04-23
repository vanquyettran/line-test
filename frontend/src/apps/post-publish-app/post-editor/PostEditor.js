import './PostEditor.less';
import React from 'react';
import TopBar from './top-bar/TopBar';
import ContentArea from './content-area/ContentArea';
import {
    CONTENT_IMAGE,
    CONTENT_VIDEO,
    CONTENT_EMOJI,
    CONTENT_COUPON,
    CONTENT_LINK,
    CONTENT_SURVEY
} from '../constants/post';

export default class PostEditor extends React.Component {
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

        return <div className="post-editor">
            <TopBar
                contentType={contentType}
                updateContentType={this.updateContentType}
            />
            <ContentArea/>
        </div>;
    }
}