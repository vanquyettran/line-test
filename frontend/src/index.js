import './less/common.less';
import React from 'react';
import ReactDOM from 'react-dom';
import PostPublishApp from './apps/post-publish-app/PostPublishApp';
import './layout';

window.LineTest = {
    renderPostPublishApp: (root, props) => {
        ReactDOM.render(<PostPublishApp {...props}/>, root);
    }
};