import ImageDataConverter from '../image/ImageDataConverter';
import {
    CONTENT_IMAGE,
    CONTENT_VIDEO,
    CONTENT_STICKER,
    CONTENT_COUPON,
    CONTENT_LINK,
    CONTENT_SURVEY
} from '../../../models/post/contentTypes';


/**
 *
 * @param {{}} data
 * @return {IPost}
 */
function fromEndpoint(data) {
    return {
        id: data['id'],
        status: data['status'],
        contentType: data['type'],
        scheduledTime: data['scheduledTime'],
        contentData: fromEndpoint_contentData(data),
        createdTime: data['createdAt'],
        updatedTime: data['updatedAt']
    };
}

/**
 *
 *
 * @param {IPost} post
 * @return {{}}
 */
function toEndpoint(post) {
    return {
        'type': post.contentType,
        [toEndpoint_contentDataField(post.contentType)]: toEndpoint_contentData(post),
        'status': post.status,
        'scheduledTime': post.scheduledTime
    };
}

/**
 *
 *
 * @param {IPost} post
 * @return {{}}
 */
function toPayload(post) {
    return JSON.stringify(toEndpoint(post));
}

/**
 *
 * Get data field name (accepted by endpoint) from content type
 * @param {string} contentType
 * @return {string}
 * @throws {Error}
 */
function toEndpoint_contentDataField(contentType) {
    switch (contentType) {
        case CONTENT_IMAGE: return 'images';
        case CONTENT_VIDEO: return 'video';
        case CONTENT_STICKER: return 'sticker';
        case CONTENT_COUPON: return 'coupon';
        case CONTENT_LINK: return 'link';
        case CONTENT_SURVEY: return 'survey';
    }

    throw new Error(`Post content type is invalid: ${contentType}`);
}

/**
 *
 * Get post.contentData from response data
 * @param {{}} data
 * @return {string}
 * @throws {Error}
 */
function fromEndpoint_contentData(data) {
    const {contentType} = data;

    switch (contentType) {
        case CONTENT_IMAGE: return data['images'].map(item => ImageDataConverter.fromEndpoint(item));
        case CONTENT_VIDEO: return data['video'];
        case CONTENT_STICKER: return data['sticker'];
        case CONTENT_COUPON: return data['coupon'];
        case CONTENT_LINK: return data['link'];
        case CONTENT_SURVEY: return data['survey'];
    }

    throw new Error(`Post content type is invalid: ${contentType}`);
}

/**
 *
 * Convert from post.contentData to data that accepted by endpoint
 * @param {IPost} post
 * @return {*}
 * @throws {Error}
 */
function toEndpoint_contentData(post) {
    const {contentType, contentData} = post;

    switch (contentType) {
        case CONTENT_IMAGE: return contentData.map(item => ImageDataConverter.toEndpoint(item));
        case CONTENT_VIDEO: return contentData;
        case CONTENT_STICKER: return contentData;
        case CONTENT_COUPON: return contentData;
        case CONTENT_LINK: return contentData;
        case CONTENT_SURVEY: return contentData;
    }

    throw new Error(`Post content type is invalid: ${contentType}`);
}

export default {
    fromEndpoint,
    toEndpoint,
    toPayload
}
