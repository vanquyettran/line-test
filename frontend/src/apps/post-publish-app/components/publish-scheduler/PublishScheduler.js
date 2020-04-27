import './PublishScheduler.less';
import React from 'react';
import {translate} from '../../../../i18n';
import RadioGroupInput from '../../../../components/radio-group-input/RadioGroupInput';
import DateInput from '../../../../components/date-input/DateInput';
import TimeInput from '../../../../components/time-input/TimeInput';
import {getTimezoneStamp} from '../../../../utils/date-time';

export default class PublishScheduler extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scheduled: props.defaultValue !== null,
            ...dateFromValue(props.defaultValue),
        };
    }

    pushChange = () => {
        this.props.onChange(stateToValue(this.state));
    };

    updateScheduled = (scheduled) => {
        this.setState(
            {scheduled},
            () => this.pushChange()
        );
    };

    updateYMD = (year, month, date) => {
        this.setState(
            {year, month, date},
            () => this.pushChange()
        );
    };

    updateHMS = (hours, minutes) => {
        this.setState(
            {hours, minutes},
            () => this.pushChange()
        );
    };

    getDateTimeInput = () => {
        const {year, month, date, hours, minutes} = this.state;

        return <div className="date-time">
            <DateInput
                defaultValue={[year, month, date]}
                onChange={(year, month, date) => {
                    this.updateYMD(year, month, date);
                }}
                getIsValidDate={(year, month, date) => {
                    // disable dates in the past
                    return new Date(year, month - 1, date, 23, 59, 59).getTime() >= new Date().getTime();
                }}
            />
            <TimeInput
                value={[hours, minutes, 0]}
                onChange={(hours, minutes, seconds) => {
                    this.updateHMS(hours, minutes);
                }}
                hasSeconds={false}
            />
            <div className="timezone">{getTimezoneStamp()}</div>
        </div>;
    };

    render() {
        const {scheduled} = this.state;

        return <div className="publish-scheduler">
            <div className="field-label">
                {translate('Publish date')}
            </div>
            <RadioGroupInput
                defaultValue={scheduled}
                options={[
                    {value: false, label: translate('Publish now')},
                    {value: true, label: this.getDateTimeInput()},
                ]}
                onChange={scheduled => {
                    this.updateScheduled(scheduled);
                }}
            />
        </div>;
    }
}

PublishScheduler.defaultProps = {
    defaultValue: null,
    onChange: (value) =>
        console.log('(PublishScheduler) onChange is omitted', year, month, date)
};

function dateFromValue(value) {
    const date = value !== null ? new Date(value) : new Date();
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate(),
        hours: date.getHours(),
        minutes: date.getMinutes()
    };
}

function stateToValue({scheduled, year, month, date, hours, minutes}) {
    if (scheduled) {
        return new Date(year, month - 1, date, hours, minutes).getTime();
    }

    return null;
}
