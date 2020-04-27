import './DateInput.less';
import React from 'react';
import DatePicker from '../../components/date-picker/DatePicker';
import TemplateInput from '../../components/template-input/TemplateInput';
import Dropdown from '../../components/dropdown/Dropdown';

export default class DateInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            year: props.defaultValue[0],
            month: props.defaultValue[1],
            date: props.defaultValue[2],
            syncFrom: null,
            pickerShown: false
        };

        /**
         *
         * @type {HTMLDivElement}
         */
        this.el = null;
    }

    static getDerivedStateFromProps(props, state) {
        if (props.value === undefined) {
            return null;
        }

        if (state.year === props.value[0] &&
            state.month === props.value[1] &&
            state.date === props.value[2]
        ) {
            return null;
        }

        state.year = props.value[0];
        state.month = props.value[1];
        state.date = props.value[2];

        return state;
    }

    pushChange = () => {
        this.props.onChange(this.state.year, this.state.month, this.state.date);
    };

    sync = (year, month, date, syncFrom) => {
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
            this.sync(currentYear, currentMonth, currentDate, 'syncCentral');
            return;
        }

        this.setState(
            {year, month, date, syncFrom},
            () => this.setState(
                {syncFrom: null},
                () => this.pushChange()
            )
        )
    };

    syncNeeded = (name) => {
        const {syncFrom} = this.state;
        return syncFrom !== null && syncFrom !== name;
    };

    showPicker = () => {
        if (this.state.pickerShown) {
            return;
        }

        this.setState({pickerShown: true});
    };

    hidePicker = () => {
        if (!this.state.pickerShown) {
            return;
        }

        this.setState({pickerShown: false});
    };

    render() {
        const {getIsValidDate} = this.props;
        const {year, month, date, pickerShown} = this.state;

        return <div className="date-input" ref={el => this.el = el}>
            <TemplateInput
                template={TemplateInput.dateDMYTemplate}
                defaultValues={{year, month, date}}
                values={this.syncNeeded('templateInput') ? {year, month, date} : undefined}
                onChange={({year, month, date}) => this.sync(year, month, date, 'templateInput')}
                onFocus={(key) => this.showPicker()}
            />
            {
                pickerShown &&
                <Dropdown
                    name="date-picker"
                    opener={this.el}
                    close={this.hidePicker}
                >
                    <DatePicker
                        defaultDate={[year, month, date]}
                        date={this.syncNeeded('picker') ? [year, month, date] : undefined}
                        onChange={([year, month, date]) => this.sync(year, month, date, 'picker')}
                        getIsValidDate={(year, month, date) => getIsValidDate(year, month, date)}
                    />
                </Dropdown>
            }
        </div>;
    }
}

DateInput.defaultProps = {
    defaultValue: (d => ([d.getFullYear(), d.getMonth() + 1, d.getDate()]))(new Date()),
    value: undefined,
    getIsValidDate: (year, month, date) => true,
    onChange: (year, month, date) => console.log('(DateInput) onChange is omitted', year, month, date)
};
