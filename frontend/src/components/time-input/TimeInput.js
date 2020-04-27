import './TimeInput.less';
import React from 'react';
import TimePicker from '../../components/time-picker/TimePicker';
import TemplateInput from '../../components/template-input/TemplateInput';
import Dropdown from '../../components/dropdown/Dropdown';

export default class TimeInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hours: props.defaultValue[0],
            minutes: props.defaultValue[1],
            seconds: props.defaultValue[2],
            syncFrom: null,
            pickerShown: false
        };

        /**
         *
         * @type {HTMLDivElement}
         */
        this.el = null;
    }

    pushChange = () => {
        this.props.onChange(this.state.hours, this.state.minutes, this.state.seconds);
    };

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
            () => this.setState(
                {syncFrom: null},
                () => this.pushChange()
            )
        );
    };

    syncNeeded = (name) => {
        const {syncFrom} = this.state;
        return syncFrom !== null && syncFrom !== name;
    };

    showPicker = () => {
        const {hours, minutes, seconds, pickerShown} = this.state;

        if (pickerShown) {
            return;
        }

        this.setState(
            {pickerShown: true},
            () => this.sync(hours, minutes, seconds, 'pickerOpener')
        );
    };

    hidePicker = () => {
        if (!this.state.pickerShown) {
            return;
        }

        this.setState({pickerShown: false});
    };

    render() {
        const {getIsValidTime, hasSeconds} = this.props;
        const {hours, minutes, seconds, pickerShown} = this.state;

        return <div className="time-input" ref={el => this.el = el}>
            <TemplateInput
                template={hasSeconds ? TemplateInput.timeHMSTemplate : TemplateInput.timeHMTemplate}
                defaultValues={{hours, minutes, seconds}}
                values={this.syncNeeded('templateInput') ? {hours, minutes, seconds} : undefined}
                onChange={({hours, minutes, seconds}) => this.sync(hours, minutes, seconds, 'templateInput')}
                onFocus={(key) => this.showPicker()}
            />
            {
                pickerShown &&
                <Dropdown
                    opener={this.el}
                    close={this.hidePicker}
                >
                    <TimePicker
                        defaultValue={[hours, minutes, seconds]}
                        value={this.syncNeeded('picker') ? [hours, minutes, seconds] : undefined}
                        onChange={([hours, minutes, seconds]) => this.sync(hours, minutes, seconds, 'picker')}
                        getIsValidTime={(hours, minutes, seconds) => getIsValidTime(hours, minutes, seconds)}
                        hasSeconds={hasSeconds}
                    />
                </Dropdown>
            }
        </div>;
    }
}


TimeInput.defaultProps = {
    defaultValue: [0, 0, 0],
    hasSeconds: true,
    getIsValidTime: (hours, minutes, seconds) => true,
    onChange: (hours, minutes, seconds) =>
        console.log('(TimeInput) onChange is omitted', hours, minutes, seconds)
};
