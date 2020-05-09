import './layout';
import React from 'react';
import AppErrorBoundary from './errorb/app-error-boundary/AppErrorBoundary';
import PostPublishApp from './apps/post-publish-app/PostPublishApp';
// const PostPublishApp = React.lazy(() => import(/*webpackChunkName: 'PostPublishApp'*/ './apps/post-publish-app/PostPublishApp'));
// const PostPublishApp = React.lazy(() => import('./apps/post-publish-app/PostPublishApp'));

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
            {/*<React.Suspense fallback={<div>Loading...</div>}>*/}
                {this._render()}
            {/*</React.Suspense>*/}
        </AppErrorBoundary>;
    }
}
