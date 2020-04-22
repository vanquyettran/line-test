import './PostPublishApp.less';
import React from 'react';
import {translate} from '../../i18n/i18n';
import Button from '../../components/button/Button';
import PublishTimeScheduler from './publish-time-scheduler/PublishTimeScheduler';
import PostEditor from './post-editor/PostEditor';

export default class PostPublishApp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="post-publish-app">
            <div className="top-area">
                <h1 className="title">{translate('Timeline post')}</h1>
            </div>
            <div className="head-panel">
                <Button
                    title={translate('Save draft')}
                    onClick={() => console.log('clicked')}
                />
                <Button
                    title={translate('Publish')}
                    onClick={() => console.log('clicked')}
                />
            </div>
            <div className="body-area">
                <PublishTimeScheduler
                />
                <PostEditor
                />
            </div>
            <div className="foot-panel">
                <Button
                    title={translate('Publish')}
                    onClick={() => console.log('clicked')}
                />
            </div>
        </div>;
    }
}
