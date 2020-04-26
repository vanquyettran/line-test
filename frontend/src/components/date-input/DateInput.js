import './DateInput.less';
import React from 'react';
import DatePicker from '../../components/date-picker/DatePicker';
import TemplateInput from '../../components/template-input/TemplateInput';
import Dropdown from '../../components/dropdown/Dropdown';

export default class DateInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            year: props.defaultYear,
            month: props.defaultMonth,
            date: props.defaultDate,
            syncFrom: null,
            pickerShown: false
        };

        /**
         *
         * @type {HTMLDivElement}
         */
        this.el = null;
    }

    sync = (year, month, date, syncFrom) => {
        const {getIsValidDate, onChange} = this.props;
        const {year: currentYear, month: currentMonth, date: currentDate} = this.state;

        const currentDateIsValid = getIsValidDate(currentYear, currentMonth, currentDate);
        const newDateIsValid = getIsValidDate(year, month, date);

        // if current date is valid
        // and new date is invalid
        // then new date will be rejected
        // however if both are invalid
        // then new date is approved
        if (currentDateIsValid && !newDateIsValid) {
            this.sync(currentYear, currentMonth, currentDate, 'syncCentral');
            return;
        }

        this.setState(
            {year, month, date, syncFrom},
            () => this.setState(
                {syncFrom: null},
                () => onChange(this.state.year, this.state.month, this.state.date)
            )
        )
    };

    showPicker = () => {
        if (!this.state.pickerShown) {
            this.setState({pickerShown: true});
        }
    };

    hidePicker = () => {
        if (this.state.pickerShown) {
            this.setState({pickerShown: false});
        }
    };

    render() {
        const {getIsValidDate} = this.props;
        const {year, month, date, syncFrom, pickerShown} = this.state;

        return <div className="date-input" ref={el => this.el = el}>
            <TemplateInput
                template={TemplateInput.dateDMYTemplate}
                defaultValues={{year, month, date}}
                values={syncFrom !== null && syncFrom !== 'templateInput' ? {year, month, date} : undefined}
                onChange={({year, month, date}) => this.sync(year, month, date, 'templateInput')}
                onFocus={(key) => this.showPicker()}
            />
            {
                pickerShown &&
                <Dropdown opener={this.el} close={this.hidePicker}>
                    <DatePicker
                        defaultDate={[year, month, date]}
                        date={syncFrom !== null && syncFrom !== 'picker' ? [year, month, date] : undefined}
                        onChange={([year, month, date]) => this.sync(year, month, date, 'picker')}
                        getIsValidDate={(year, month, date) => getIsValidDate(year, month, date)}
                    />
                </Dropdown>
            }
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
    onChange: (year, month, date) =>
        console.log('(DateInput) onChange is omitted', year, month, date)
};
