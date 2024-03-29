import './PostContentEditTool.less';
import React from 'react';
import TopBar from './components/top-bar/TopBar';
import ContentArea from './components/content-area/ContentArea';
import Popup from '../../components/popup/Popup';
import {
    CONTENT_IMAGE,
    CONTENT_VIDEO,
    CONTENT_STICKER,
    CONTENT_COUPON,
    CONTENT_LINK,
    CONTENT_SURVEY
} from '../../models/post/contentTypes';

export default class PostContentEditTool extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contentType: props.defaultContentType,
            contentData: props.defaultContentData
        };
    }

    componentDidMount() {
        this.pushChange();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.contentType === undefined && props.contentData === undefined) {
            return null;
        }

        if (props.contentType !== undefined) {
            state.contentType = props.contentType;
        }

        if (props.contentData !== undefined) {
            state.contentData = props.contentData;
        }

        return state;
    }

    static getDefaultContentData(contentType) {
        switch (contentType) {
            case CONTENT_IMAGE: return [];
            case CONTENT_VIDEO: return null;
            case CONTENT_STICKER: return null;
            case CONTENT_COUPON: return null;
            case CONTENT_LINK: return null;
            case CONTENT_SURVEY: return null;
        }

        return null;
    }

    pushChange = () => {
        this.props.onChange(this.state.contentType, this.state.contentData);
    };

    updateContent(values) {
        this.setState(
            values,
            () => this.pushChange()
        );
    };

    updateContentType = (contentType) => {
        if (contentType === this.state.contentType) {
            return;
        }

        this.updateContent({
            contentType,
            contentData: PostContentEditTool.getDefaultContentData(contentType)
        });
    };

    updateContentData = (contentData) => {
        this.updateContent({contentData});
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
    contentType: undefined,
    contentData: undefined,
    defaultContentType: CONTENT_IMAGE,
    defaultContentData: PostContentEditTool.getDefaultContentData(CONTENT_IMAGE),
    onChange: (contentType, contentData) =>
        console.log('(PostContentEditTool) onChange is omitted.', contentType, contentData),

};
