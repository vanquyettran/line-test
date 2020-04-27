import './layout';
import React from 'react';
import AppErrorBoundary from './errorb/app-error-boundary/AppErrorBoundary';
import PostPublishApp from './apps/post-publish-app/PostPublishApp';

export default class App extends React.Component {

    _render = () => {
        const {appName} = this.props;

        if (appName === 'PostPublish') {
            return <PostPublishApp {...this.props}/>;
        }

        return null;
    };

    render() {
        return <AppErrorBoundary>
            {this._render()}
        </AppErrorBoundary>;
    }
}
