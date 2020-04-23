import './TopBar.less';
import React from 'react';
import Icon from '../../../../components/icon/Icon';
import {
    CONTENT_IMAGE,
    CONTENT_VIDEO,
    CONTENT_EMOJI,
    CONTENT_COUPON,
    CONTENT_LINK,
    CONTENT_SURVEY
} from '../../../../models/post/contentTypes';

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
                        [CONTENT_IMAGE, 'photo'],
                        [CONTENT_VIDEO, 'video'],
                        [CONTENT_EMOJI, 'smile'],
                        [CONTENT_COUPON, 'coupon'],
                        [CONTENT_LINK, 'link'],
                        [CONTENT_SURVEY, 'survey'],
                    ].map(([itemContentType, iconName]) => (
                        <li key={itemContentType}
                            className={contentType === itemContentType ? 'selected' : ''}
                        >
                            <button
                                type="button"
                                onClick={() => updateContentType(itemContentType)}
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