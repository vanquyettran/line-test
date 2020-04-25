import './DateInput.less';
import React from 'react';
import DatePicker from '../../components/date-picker/DatePicker';
import TemplateInput from '../../components/template-input/TemplateInput';

export default class DateInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            year: props.defaultYear,
            month: props.defaultMonth,
            date: props.defaultDate,
            syncFrom: null
        };
    }

    syncYMD = (year, month, date, syncFrom) => {
        const {getIsValidDate} = this.props;
        const {year: currentYear, month: currentMonth, date: currentDate} = this.state;

        const currentDateIsValid = getIsValidDate(currentYear, currentMonth, currentDate);
        const newDateIsValid = getIsValidDate(year, month, date);

        // if current date is valid
        // and new date is invalid
        // then new date will be rejected
        // however if both are invalid
        // then new date is approved
        if (currentDateIsValid && !newDateIsValid) {
            this.syncYMD(currentYear, currentMonth, currentDate, 'syncCenter');
            return;
        }

        this.setState(
            {year, month, date, syncFrom},
            () => this.setState({syncFrom: null})
        )
    };

    render() {
        const {getIsValidDate} = this.props;
        const {year, month, date, syncFrom} = this.state;

        return <div className="date-input">
            <TemplateInput
                template={TemplateInput.dateDMYTemplate}
                defaultValues={{year, month, date}}
                values={syncFrom !== null && syncFrom !== 'templateInput' ? {year, month, date} : null}
                onChange={({year, month, date}) => this.syncYMD(year, month, date, 'templateInput')}
            />
            <DatePicker
                defaultDate={[year, month, date]}
                date={syncFrom !== null && syncFrom !== 'datePicker' ? [year, month, date] : null}
                onChange={([year, month, date]) => this.syncYMD(year, month, date, 'datePicker')}
                getIsValidDate={(year, month, date) => getIsValidDate(year, month, date)}
            />
        </div>;
    }
}


DateInput.defaultProps = {
    defaultYear: new Date().getFullYear(),
    defaultMonth: new Date().getMonth() + 1,
    defaultDate: new Date().getDate(),
    getIsValidDate: (year, month, date) => {
        // example for preventing users select a date in the past
        return new Date(year, month - 1, date, 23, 59, 59).getTime() >= new Date().getTime();
    },
};
