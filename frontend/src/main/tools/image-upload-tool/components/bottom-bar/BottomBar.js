import './BottomBar.less';
import React from 'react';
import {translate} from '../../../../i18n';
import Button from '../../../../components/button/Button';
import Spinner from '../../../../components/spinner/Spinner';

const STATUS_EMPTY = 0;
const STATUS_ALL_SUCCESS = 1;
const STATUS_ALL_ERROR = 2;
const STATUS_BOTH_SUCCESS_ERROR = 3;
const STATUS_PROGRESSING = 4;

export {
    STATUS_EMPTY,
    STATUS_ALL_SUCCESS,
    STATUS_ALL_ERROR,
    STATUS_BOTH_SUCCESS_ERROR,
    STATUS_PROGRESSING
};

export default class BottomBar extends React.Component {

    getApplyButton = () => {
        return <Button
            title={translate('Done')}
            onClick={() => this.props.apply()}
            appearance="primary"
            size="small"
        />;
    };

    getResetButton = () => {
        return <Button
            title={translate('Reset')}
            onClick={() => this.props.reset()}
            appearance="caution"
            size="small"
        />;
    };

    getCancelButton = () => {
        return <Button
            title={translate('Cancel')}
            onClick={() => this.props.cancel()}
            appearance="neutral"
            size="small"
        />;
    };

    getFilterButton = () => {
        return <Button
            title={translate('Filter')}
            onClick={() => this.props.filter()}
            appearance="neutral"
            size="small"
        />;
    };

    getSpinner = () => {
        return <div className="progress-indicator"><Spinner/></div>;
    };

    getDrawnButtonNames = () => {
        switch (this.props.status) {
            case STATUS_EMPTY: return ['cancel'];
            case STATUS_ALL_SUCCESS: return ['apply', 'reset'];
            case STATUS_ALL_ERROR: return ['reset', 'cancel'];
            case STATUS_BOTH_SUCCESS_ERROR: return ['filter', 'apply', 'reset'];
            case STATUS_PROGRESSING: return ['spinner'];
        }

        return [];
    };

    getButtonByName = (name) => {
        switch (name) {
            case 'apply': return this.getApplyButton();
            case 'reset': return this.getResetButton();
            case 'cancel': return this.getCancelButton();
            case 'filter': return this.getFilterButton();
            case 'spinner': return this.getSpinner();
        }

        return null;
    };

    render() {
        return <div className="bottom-bar">
            {
                this.getDrawnButtonNames().map(
                    name => this.getButtonByName(name)
                )
            }
        </div>;
    }
}

BottomBar.defaultProps = {
    apply: () => {},
    reset: () => {},
    filter: () => {},
    cancel: () => {},
};
