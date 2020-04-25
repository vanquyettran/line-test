import './TimePicker.less';
import React from 'react';
import SpinnerInput from '../../components/spinner-input/SpinnerInput';

export default class TimePicker extends React.Component {
    render() {
        return <div className="time-picker">
            <SpinnerInput/>
        </div>;
    }
}
