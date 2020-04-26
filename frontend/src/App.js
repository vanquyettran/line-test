import './layout';
import React from 'react';
import PostPublishApp from './apps/post-publish-app/PostPublishApp';

export default class App extends React.Component {

    render() {
        const {appName} = this.props;

        if (appName === 'PostPublish') {
            return <PostPublishApp {...this.props}/>;
        }

        return null;
    };
}
