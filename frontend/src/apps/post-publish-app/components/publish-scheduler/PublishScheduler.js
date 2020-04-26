import './PublishScheduler.less';
import React from 'react';
import {translate} from '../../../../i18n';
import RadioGroupInput from '../../../../components/radio-group-input/RadioGroupInput';
import DateInput from '../../../../components/date-input/DateInput';
import TimeInput from '../../../../components/time-input/TimeInput';

export default class PublishScheduler extends React.Component {

    getDateTimeInput = () => {
        return <div className="date-time">
            <TimeInput/>
            <DateInput/>
        </div>;
    };

    render() {
        return <div className="publish-scheduler">
            <RadioGroupInput
                options={[
                    {value: false, label: translate('Publish now')},
                    {value: true, label: this.getDateTimeInput()},
                ]}
            />
        </div>;
    }
}