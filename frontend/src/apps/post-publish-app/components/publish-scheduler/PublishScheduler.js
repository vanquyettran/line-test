import './PublishScheduler.less';
import React from 'react';
import DateInput from '../../../../components/date-input/DateInput';
import TimeInput from '../../../../components/time-input/TimeInput';

export default class PublishScheduler extends React.Component {
    render() {
        return <div className="publish-time-scheduler">
            <TimeInput/>
            <br/>
            <DateInput/>
        </div>;
    }
}