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

export default class PostPublishApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            postId: null, // null -> create, !null -> update
            scheduledTime: null,
            contentType: CONTENT_IMAGE,
            contentData: PostContentEditTool.getDefaultContentData(CONTENT_IMAGE),
            syncFrom: null,
            successShown: false,
            submitError: null,
            isDraft: true,
            updatedTime: null,
            isUploading: false
        };

        /**
         *
         * @type {IPost|null}
         */
        this.resPost = null;
    }

    updateValues = (values) => {
        this.setState(values);
    };

    getParcel = (published) => {
        const {scheduledTime, contentType, contentData} = this.state;

        return new PostUploadParcel({
            status: published ? STATUS_PUBLISED : STATUS_DRAFTED,
            scheduledTime,
            contentType,
            contentData
        });
    };

    submit = (published) => {
        this.setState({
            isDraft: !published,
            isUploading: true,
            successShown: false,
            submitError: null
        });
        
        Request.add(this.getParcel(published))
            .then(this.onSubmitDone)
            .catch(this.onSubmitError)
            .finally(this.onSubmitFinish);
    };

    /**
     * @param {IPost} post
     */
    onSubmitDone = post => {
        this.resPost = post;

        this.setState({
            successShown: true
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
        this.setState({isUploading: false});
    };

    getError = () => {
        const {contentData} = this.state;

        if (contentData === null || contentData.length === 0) {
            return translate('Post content cannot be empty');
        }

        return null;
    };

    editPost = () => {
        if (!this.resPost) {
            throw new Error('something_went_wrong');
        }
        this.setState({
            successShown: false,
            postId: this.resPost.id,
            contentType: this.resPost.contentType,
            contentData: this.resPost.contentData,
            scheduledTime: this.resPost.scheduledTime,
            updatedTime: this.resPost.updatedAt
        });
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
                label={error}
                appearance="neutral"
                size="small"
                onClick={() => this.submit(false)}
                disabled={error !== null}
            />
            <Button
                title={this.getSubmitButtonTitle(false)}
                label={error}
                appearance="primary"
                size="small"
                onClick={() => this.submit(true)}
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
                label={error}
                appearance="primary"
                size="medium"
                onClick={() => this.submit(true)}
                disabled={error !== null}
            />
        </div>;
    };

    getPopupSuccess = () => {
        return <Popup
            title={translate('Awesome!')}
            buttons={[
                <Button
                    title={translate('Edit')}
                    size="small"
                    onClick={() => this.editPost()}
                    appearance="primary"
                />,
                <Button
                    title={translate('Homepage')}
                    size="small"
                    onClick={() => window.location.reload()}
                    appearance="neutral"
                />
            ]}
        >
            <p>
                {translate('Your post was saved successfully. Now you can edit the post by clicking on Edit button.')}
            </p>
        </Popup>;
    };

    getPopupError = () => {
        const {submitError} = this.state;

        return <Popup
            title={translate('Failed to save your post')}
            close={() => this.setState({submitError: null})}
            buttons={[
                <Button
                    title={translate('Try again')}
                    size="small"
                    onClick={() => this.submit(!isDraft)}
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
                <span>{translate('Please wait for a moment')}</span>
            </div>
        </Popup>;
    };

    render() {
        const {isUploading, updatedTime, successShown, submitError} = this.state;

        return <div className="post-publish-app" key={updatedTime}>
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
                isUploading &&
                this.getPopupProgress()
            }
            {
                successShown &&
                this.getPopupSuccess()
            }
            {
                submitError !== null &&
                this.getPopupError()
            }
        </div>;
    }
}
