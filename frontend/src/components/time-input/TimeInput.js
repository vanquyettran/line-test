import './TimeInput.less';
import React from 'react';
import TimePicker from '../../components/time-picker/TimePicker';
import TemplateInput from '../../components/template-input/TemplateInput';
import Dropdown from '../../components/dropdown/Dropdown';

export default class TimeInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hours: props.defaultHours,
            minutes: props.defaultMinutes,
            seconds: props.defaultSeconds,
            syncFrom: null,
            datePickerShown: false
        };

        /**
         *
         * @type {HTMLDivElement}
         */
        this.el = null;
    }

    syncYMD = (hours, minutes, seconds, syncFrom) => {
        const {getIsValidTime} = this.props;
        const {hours: currentHours, minutes: currentMinutes, seconds: currentSeconds} = this.state;

        const currentSecondsIsValid = getIsValidTime(currentHours, currentMinutes, currentSeconds);
        const newSecondsIsValid = getIsValidTime(hours, minutes, seconds);

        // if current seconds is valid
        // and new seconds is invalid
        // then new seconds will be rejected
        // however if both are invalid
        // then new seconds is approved
        if (currentSecondsIsValid && !newSecondsIsValid) {
            this.syncYMD(currentHours, currentMinutes, currentSeconds, 'syncCenter');
            return;
        }

        this.setState(
            {hours, minutes, seconds, syncFrom},
            () => this.setState({syncFrom: null})
        )
    };

    showDatePicker = () => {
        if (!this.state.datePickerShown) {
            this.setState({datePickerShown: true});
        }
    };

    hideDatePicker = () => {
        if (this.state.datePickerShown) {
            this.setState({datePickerShown: false});
        }
    };

    render() {
        const {getIsValidTime} = this.props;
        const {hours, minutes, seconds, syncFrom, datePickerShown} = this.state;

        return <div className="time-input" ref={el => this.el = el}>
            <TemplateInput
                template={TemplateInput.timeHMSTemplate}
                defaultValues={{hours, minutes, seconds}}
                values={syncFrom !== null && syncFrom !== 'templateInput' ? {hours, minutes, seconds} : undefined}
                onChange={({hours, minutes, seconds}) => this.syncYMD(hours, minutes, seconds, 'templateInput')}
                onFocus={() => this.showDatePicker()}
            />
            {
                datePickerShown &&
                <Dropdown
                    opener={this.el}
                    close={this.hideDatePicker}
                >
                    <TimePicker
                        defaultValue={[hours, minutes, seconds]}
                        value={syncFrom !== null && syncFrom !== 'timePicker' ? [hours, minutes, seconds] : undefined}
                        onChange={([hours, minutes, seconds]) => this.syncYMD(hours, minutes, seconds, 'timePicker')}
                        getIsValidTime={(hours, minutes, seconds) => getIsValidTime(hours, minutes, seconds)}
                    />
                </Dropdown>
            }
        </div>;
    }
}


TimeInput.defaultProps = {
    defaultHours: 0,
    defaultMinutes: 0,
    defaultSeconds: 0,
    getIsValidTime: (hours, minutes, seconds) => {
        return true;
    },
};
