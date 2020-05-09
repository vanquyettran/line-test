import './ContentArea.less';
import React from 'react';
import ImageCard from './cards/image-card/ImageCard';
import VideoCard from './cards/video-card/VideoCard';
import StickerCard from './cards/sticker-card/StickerCard';
import CouponCard from './cards/coupon-card/CouponCard';
import LinkCard from './cards/link-card/LinkCard';
import SurveyCard from './cards/survey-card/SurveyCard';
import {
    CONTENT_IMAGE,
    CONTENT_VIDEO,
    CONTENT_STICKER,
    CONTENT_COUPON,
    CONTENT_LINK,
    CONTENT_SURVEY
} from '../../../../models/post/contentTypes';

export default class ContentArea extends React.Component {
    
    renderContentCard = () => {
        const {
            contentType,
            contentData,
            updateContentData
        } = this.props;
        
        if (contentType === CONTENT_IMAGE) {
            return <ImageCard
                images={contentData}
                updateImages={updateContentData}
            />;
        }

        if (contentType === CONTENT_VIDEO) {
            return <VideoCard/>;
        }

        if (contentType === CONTENT_STICKER) {
            return <StickerCard/>;
        }

        if (contentType === CONTENT_COUPON) {
            return <CouponCard/>;
        }

        if (contentType === CONTENT_LINK) {
            return <LinkCard/>;
        }

        if (contentType === CONTENT_SURVEY) {
            return <SurveyCard/>;
        }

        return null;
    };
    
    render() {
        return <div className="content-area">
            {this.renderContentCard()}
        </div>;
    }
}