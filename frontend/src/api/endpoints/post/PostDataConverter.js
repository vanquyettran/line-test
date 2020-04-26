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
        contentData: getContentData(data['type'], data),
        createdAt: data['createdAt'],
        updatedAt: data['updatedAt']
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
        [getContentDataFieldName(post.contentType)]: post.contentData.map(item => ImageDataConverter.toEndpoint(item)),
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
 * @param contentType
 * @return {string}
 * @throws {Error}
 */
function getContentDataFieldName(contentType) {
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

function getContentData(contentType, data) {
    switch (contentType) {
        case CONTENT_IMAGE: return data['images'].map(im => ImageDataConverter.fromEndpoint(im));
        case CONTENT_VIDEO: return data['video'];
        case CONTENT_STICKER: return data['sticker'];
        case CONTENT_COUPON: return data['coupon'];
        case CONTENT_LINK: return data['link'];
        case CONTENT_SURVEY: return data['survey'];
    }

    throw new Error(`Post content type is invalid: ${contentType}`);
}

export default {
    fromEndpoint,
    toEndpoint,
    toPayload
}
