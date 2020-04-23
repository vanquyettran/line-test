import './ContentArea.less';
import React from 'react';
import ImageCard from './cards/image-card/ImageCard';
import VideoCard from './cards/video-card/VideoCard';
import EmojiCard from './cards/emoji-card/EmojiCard';
import CouponCard from './cards/coupon-card/CouponCard';
import LinkCard from './cards/link-card/LinkCard';
import SurveyCard from './cards/survey-card/SurveyCard';
import {
    CONTENT_IMAGE,
    CONTENT_VIDEO,
    CONTENT_EMOJI,
    CONTENT_COUPON,
    CONTENT_LINK,
    CONTENT_SURVEY
} from '../../../../models/post/contentTypes';

export default class ContentArea extends React.Component {
    
    renderContentCard = () => {
        const {contentType} = this.props;
        
        if (contentType === CONTENT_IMAGE) {
            return <ImageCard/>;
        }

        if (contentType === CONTENT_VIDEO) {
            return <VideoCard/>;
        }

        if (contentType === CONTENT_EMOJI) {
            return <EmojiCard/>;
        }

        if (contentType === CONTENT_COUPON) {
            return <CouponCard/>;
        }

        if (contentType === CONTENT_LINK) {
            return <LinkCard/>;
        }

        return <SurveyCard/>;
    };
    
    render() {
        return <div className="content-area">
            {this.renderContentCard()}
        </div>;
    }
}