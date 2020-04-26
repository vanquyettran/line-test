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
            pickerShown: false
        };

        /**
         *
         * @type {HTMLDivElement}
         */
        this.el = null;
    }

    sync = (hours, minutes, seconds, syncFrom) => {
        const {getIsValidTime} = this.props;
        const {hours: currentHours, minutes: currentMinutes, seconds: currentSeconds} = this.state;

        const currentTimeIsValid = getIsValidTime(currentHours, currentMinutes, currentSeconds);
        const newTimeIsValid = getIsValidTime(hours, minutes, seconds);

        // if current time is valid
        // and new time is invalid
        // then new time will be rejected
        // however if both are invalid
        // then new time is approved
        if (currentTimeIsValid && !newTimeIsValid) {
            this.sync(currentHours, currentMinutes, currentSeconds, 'syncCentral');
            return;
        }

        this.setState(
            {hours, minutes, seconds, syncFrom},
            () => this.setState({syncFrom: null})
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
        const {getIsValidTime} = this.props;
        const {hours, minutes, seconds, syncFrom, pickerShown} = this.state;

        return <div className="time-input" ref={el => this.el = el}>
            <TemplateInput
                template={TemplateInput.timeHMSTemplate}
                defaultValues={{hours, minutes, seconds}}
                values={syncFrom !== null && syncFrom !== 'templateInput' ? {hours, minutes, seconds} : undefined}
                onChange={({hours, minutes, seconds}) => {
                    console.log({hours, minutes, seconds});
                    this.sync(hours, minutes, seconds, 'templateInput');
                }}
                onFocus={(key) => this.showPicker()}
                onBlurAll={() => this.hidePicker()}
            />
            {
                pickerShown &&
                <Dropdown
                    opener={this.el}
                    close={this.hidePicker}
                >
                    <TimePicker
                        defaultValue={[hours, minutes, seconds]}
                        value={syncFrom !== null && syncFrom !== 'timePicker' ? [hours, minutes, seconds] : undefined}
                        onChange={([hours, minutes, seconds]) => this.sync(hours, minutes, seconds, 'timePicker')}
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
    getIsValidTime: (hours, minutes, seconds) => true,
};
