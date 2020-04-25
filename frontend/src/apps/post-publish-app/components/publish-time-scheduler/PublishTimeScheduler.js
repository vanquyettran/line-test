import './PublishTimeScheduler.less';
import React from 'react';
import DateInput from '../../../../components/date-input/DateInput';
import TimeInput from '../../../../components/time-input/TimeInput';

export default class PublishTimeScheduler extends React.Component {
    render() {
        return <div className="publish-time-scheduler">
            <TimeInput/>
            <br/>
            <DateInput/>
        </div>;
    }
}