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
        type: data['type'],
        status: data['status'],
        scheduledTime: data['scheduledTime'],
        images: data['images'].map(im => ImageDataConverter.fromEndpoint(im)),
        video: data['video'],
        sticker: data['sticker'],
        coupon: data['coupon'],
        link: data['link'],
        survey: data['survey'],
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
    return JSON.stringify({
        'type': post.contentType,
        [getContentDataFieldName(post.contentType)]: post.contentData,
        'status': post.status,
        'scheduledTime': post.scheduledTime
    });
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

    throw new Error(`Invalid content type of post: ${contentType}`);
}

export default {
    fromEndpoint,
    toEndpoint
}
