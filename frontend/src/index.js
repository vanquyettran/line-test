import './css/common.less';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

window.LineTest = {
    renderApp: (root, props) => {
        ReactDOM.render(<App {...props}/>, root);
    }
};
