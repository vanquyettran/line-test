import './common.less';
import React from 'react';
import ReactDOM from 'react-dom';
import PostPublishApp from './apps/post-publish-app/PostPublishApp';

window.LineTest = {
    renderPostPublishApp: (root, props) => {
        ReactDOM.render(<PostPublishApp {...props}/>, root);
    }
};