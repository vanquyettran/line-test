import './PublishTimeScheduler.less';
import React from 'react';
import DatePicker from '../../../../components/date-picker/DatePicker';
import DateInput from '../../../../components/date-input/DateInput';
import TimeInput from '../../../../components/time-input/TimeInput';
import TimePicker from '../../../../components/time-picker/TimePicker';

export default class PublishTimeScheduler extends React.Component {
    render() {
        return <div className="publish-time-scheduler">
            <DateInput/>
            <br/>
            <DatePicker/>
            <br/>
            <TimeInput/>
            <br/>
            <TimePicker/>
        </div>;
    }
}