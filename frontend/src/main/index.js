import './css/common.less';
import Tooltip from './html/tooltip/Tooltip';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

Tooltip.init();

window.LineTest = {
    renderApp: (root, props) => {
        ReactDOM.render(<App {...props}/>, root);
    }
};
