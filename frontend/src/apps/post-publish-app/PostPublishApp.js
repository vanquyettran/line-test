import './PostPublishApp.less';
import React from 'react';
import {translate} from '../../i18n';
import Button from '../../components/button/Button';
import PublishScheduler from './components/publish-scheduler/PublishScheduler';
import PostContentEditTool from '../../tools/post-content-edit-tool/PostContentEditTool';

export default class PostPublishApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scheduledTime: null,
            contentType: null,
            contentData: null,
            syncFrom: null
        };
    }

    sync = (values, syncFrom) => {
        this.setState(
            {...values, syncFrom},
            () => {
                this.setState({syncFrom: null});
                console.log('sync', this.state);
            }
        );
    };

    syncNeeded = (name) => {
        const {syncFrom} = this.state;
        return syncFrom !== null && syncFrom !== name;
    };

    render() {
        const {scheduledTime, contentType, contentData, syncFrom} = this.state;

        return <div className="post-publish-app">
            <div className="top-area">
                <h1 className="title">{translate('Timeline post')}</h1>
            </div>
            <div className="head-panel">
                <Button
                    title={translate('Save draft')}
                    appearance="neutral"
                    size="small"
                    onClick={() => console.log('clicked')}
                />
                <Button
                    title={translate('Publish')}
                    appearance="primary"
                    size="small"
                    onClick={() => console.log('clicked')}
                />
            </div>
            <div className="body-area">
                <PublishScheduler
                    value={this.syncNeeded('publishScheduler') ? scheduledTime : undefined}
                    onChange={scheduledTime => {
                        this.sync({scheduledTime}, 'publishScheduler');
                    }}
                />
                <PostContentEditTool
                    contentType={this.syncNeeded('editTool') ? contentType : undefined}
                    contentData={this.syncNeeded('editTool') ? contentData : undefined}
                    onChange={(contentType, contentData) => {
                        this.sync({contentType, contentData}, 'editTool');
                    }}
                />
            </div>
            <div className="foot-panel">
                <Button
                    title={translate('Publish')}
                    appearance="primary"
                    size="medium"
                    onClick={() => console.log('clicked')}
                />
            </div>
        </div>;
    }
}
