import './TopBar.less';
import React from 'react';
import Icon from '../../../../components/icon/Icon';
import {
    CONTENT_IMAGE,
    CONTENT_VIDEO,
    CONTENT_STICKER,
    CONTENT_COUPON,
    CONTENT_LINK,
    CONTENT_SURVEY
} from '../../../../models/post/contentTypes';
import {translate} from '../../../../i18n';

export default class TopBar extends React.Component {
    render() {
        const {
            contentType,
            updateContentType
        } = this.props;

        return <div className="top-bar">
            <ul>
                {
                    [
                        [CONTENT_IMAGE, 'photo', translate('Photo')],
                        [CONTENT_VIDEO, 'video', translate('Video')],
                        [CONTENT_STICKER, 'smile', translate('Sticker')],
                        [CONTENT_COUPON, 'coupon', translate('Coupon')],
                        [CONTENT_LINK, 'link', translate('Link')],
                        [CONTENT_SURVEY, 'survey', translate('Survey')],
                    ].map(([itemContentType, iconName, label]) => (
                        <li key={itemContentType}
                            className={contentType === itemContentType ? 'selected' : ''}
                        >
                            <button
                                type="button"
                                onClick={() => updateContentType(itemContentType)}
                                {...{'aria-label': label}}
                            >
                                <Icon name={iconName}/>
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>;
    }
}
