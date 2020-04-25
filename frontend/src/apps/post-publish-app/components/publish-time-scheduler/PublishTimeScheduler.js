import './PublishTimeScheduler.less';
import React from 'react';
import DatePicker from '../../../../components/date-picker/DatePicker';
import MonthPicker from '../../../../components/month-picker/MonthPicker';
import YearPicker from '../../../../components/year-picker/YearPicker';

export default class PublishTimeScheduler extends React.Component {
    render() {
        return <div className="publish-time-scheduler">
            <DatePicker/>

            <br/>

            <MonthPicker/>

            <br/>

            <YearPicker/>
        </div>;
    }
}