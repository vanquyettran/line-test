import './PostPublishApp.less';
import React from 'react';
import {translate} from '../../i18n';
import Button from '../../components/button/Button';
import PublishScheduler from './components/publish-scheduler/PublishScheduler';
import PostContentEditTool from '../../tools/post-content-edit-tool/PostContentEditTool';
import PostUploadParcel from '../../api/endpoints/post/PostUploadParcel';
import Request from '../../api/Request';
import {STATUS_DRAFTED, STATUS_PUBLISED} from '../../models/post/statuses';
import Popup from '../../components/popup/Popup';
import Spinner from '../../components/spinner/Spinner';
import {CONTENT_IMAGE} from '../../models/post/contentTypes';
import {url__homepage} from '../../app.config';
import {jsonCopy, jsonCompare} from '../../utils/json';

export default class PostPublishApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            postId: null, // null -> create, !null -> update
            updatedTime: null,

            isDraft: true,
            scheduledTime: null,
            contentType: CONTENT_IMAGE,
            contentData: PostContentEditTool.getDefaultContentData(CONTENT_IMAGE),

            isSubmitting: false,
            isSubmitSuccess: false,
            submitError: null,
        };

        /**
         *
         * @type {IPost|null}
         */
        this.refPost = null;

    }

    updateValues = (values) => {
        this.setState(values);
    };

    getParcel = (useDraft) => {
        const {scheduledTime, contentType, contentData} = this.state;

        return new PostUploadParcel({
            status: useDraft ? STATUS_DRAFTED : STATUS_PUBLISED,
            scheduledTime,
            contentType,
            contentData
        });
    };

    submit = (useDraft) => {
        this.setState({
            isDraft: useDraft,
            isSubmitting: true,
            isSubmitSuccess: false,
            submitError: null
        });
        
        Request.add(this.getParcel(useDraft))
            .then(this.onSubmitDone)
            .catch(this.onSubmitError)
            .finally(this.onSubmitFinish);
    };

    /**
     * @param {IPost} post
     */
    onSubmitDone = post => {
        this.refPost = post;

        this.setState({
            isSubmitSuccess: true
        });
    };

    /**
     * @param {ResponseError} responseError
     */
    onSubmitError = responseError => {
        this.setState({
            submitError: responseError.getMessage()
        });
    };

    onSubmitFinish = () => {
        this.setState({isSubmitting: false});
    };

    getError = () => {
        const {contentData} = this.state;

        if (contentData === null || contentData.length === 0) {
            return translate('Post content cannot be empty');
        }

        if (!this.hasChangesToSubmit()) {
            return translate('No changes to save');
        }

        return null;
    };

    /**
     * 
     * @param {IPost} post
     */
    editPost = (post) => {
        this.setState({
            isSubmitSuccess: false,
            postId: post.id,
            contentType: post.contentType,
            contentData: post.contentData,
            scheduledTime: post.scheduledTime,
            updatedTime: post.updatedTime
        });
    };

    hasChangesToSubmit = () => {
        const {contentType, contentData, scheduledTime} = this.state;

        if (this.refPost === null) {
            return true;
        }

        if (scheduledTime !== this.refPost.scheduledTime) {
            return true;
        }

        if (contentType !== this.refPost.contentType) {
            return true;
        }

        return !jsonCompare(contentData, this.refPost.contentData);
    };

    getSubmitButtonTitle = (useDraft) => {
        const {postId, scheduledTime} = this.state;
        if (useDraft) {
            return translate('Save draft');
        }
        if (postId !== null) {
            return translate('Save changes');
        }
        if (scheduledTime !== null) {
            return translate('Schedule');
        }
        return translate('Publish');
    };

    getHeadPanel = () => {
        const error = this.getError();

        return <div className="head-panel">
            <Button
                title={this.getSubmitButtonTitle(true)}
                onClick={() => this.submit(true)}
                tooltip={error}
                appearance="neutral"
                size="small"
                disabled={error !== null}
            />
            <Button
                title={this.getSubmitButtonTitle(false)}
                onClick={() => this.submit(false)}
                tooltip={error}
                appearance="primary"
                size="small"
                disabled={error !== null}
            />
        </div>;
    };

    getPublishScheduler = () => {
        const {scheduledTime} = this.state;
        return <PublishScheduler
            defaultValue={scheduledTime}
            onChange={scheduledTime => this.updateValues({scheduledTime})}
        />;
    };

    getContentEditTool = () => {
        const {contentType, contentData} = this.state;

        return <div className="content-editor"><PostContentEditTool
            defaultContentType={contentType}
            defaultContentData={contentData}
            onChange={(contentType, contentData) => this.updateValues({contentType, contentData})}
        /></div>;
    };

    getFootPanel = () => {
        const error = this.getError();

        return <div className="foot-panel">
            <Button
                title={this.getSubmitButtonTitle(false)}
                onClick={() => this.submit(false)}
                tooltip={error}
                appearance="primary"
                size="medium"
                disabled={error !== null}
            />
        </div>;
    };

    getPopupSuccess = () => {
        return <Popup
            name="post-publish"
            title={translate('Awesome!')}
            buttons={[
                <Button
                    title={translate('Edit')}
                    size="small"
                    onClick={() => this.editPost(jsonCopy(this.refPost))}
                    appearance="primary"
                />,
                <Button
                    title={translate('Homepage')}
                    size="small"
                    onClick={() => window.location.href = url__homepage}
                    appearance="neutral"
                />
            ]}
        >
            <p>
                {translate('post_saved_successfully')}
            </p>
        </Popup>;
    };

    getPopupError = () => {
        const {submitError, isDraft} = this.state;

        return <Popup
            name="post-publish"
            title={translate('Failed to save your post')}
            close={() => this.setState({submitError: null})}
            buttons={[
                <Button
                    title={translate('Try again')}
                    size="small"
                    onClick={() => this.submit(isDraft)}
                    appearance="primary"
                />,
                <Button
                    title={translate('Edit')}
                    size="small"
                    onClick={() => this.setState({submitError: null})}
                    appearance="neutral"
                />
            ]}
        >
            <p>{submitError}</p>
        </Popup>;
    };

    getPopupProgress = () => {
        return <Popup
            name="post-publish"
            title={<div className="progress-title">
                <span>{translate('Progressing...')}</span>
                <Spinner/>
            </div>}
        >
            <div className="progress-message">
                <span>{translate('Please wait for a moment.')}</span>
            </div>
        </Popup>;
    };

    render() {
        const {isSubmitting, updatedTime, isSubmitSuccess, submitError} = this.state;

        return <div
            className="post-publish-app"
            key={updatedTime} // re-render UI to keep up-to-date with data
        >
            <div className="top-area">
                <h1 className="title">{translate('Timeline post')}</h1>
            </div>
            <div className="divider"/>
            {
                this.getHeadPanel()
            }
            <div className="divider"/>
            {
                this.getPublishScheduler()
            }
            <div className="divider"/>
            {
                this.getContentEditTool()
            }
            {
                this.getFootPanel()
            }
            {
                isSubmitting &&
                this.getPopupProgress()
            }
            {
                isSubmitSuccess &&
                this.getPopupSuccess()
            }
            {
                submitError !== null &&
                this.getPopupError()
            }
        </div>;
    }
}
