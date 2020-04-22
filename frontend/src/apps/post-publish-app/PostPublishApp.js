import './PostPublishApp.less';
import React from 'react';
import {translate} from '../../i18n/i18n';

export default class PostPublishApp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="post-publish-app">
            <h1 className="title">{translate('Timeline Post')}</h1>
        </div>;
    }
}
