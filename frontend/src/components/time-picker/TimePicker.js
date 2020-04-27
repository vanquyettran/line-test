import './TimePicker.less';
import React from 'react';
import SpinnerInput from '../../components/spinner-input/SpinnerInput';

export default class TimePicker extends React.Component {
    constructor(props) {
        super(props);

        const value = props.defaultValue;

        this.state = {
            hours: value[0],
            minutes: value[1],
            seconds: value[2]
        };
    }

    updateTime = (hours, minutes, seconds) => {
        const {onChange} = this.props;
        this.setState(
            {hours, minutes, seconds},
            () => onChange([this.state.hours, this.state.minutes, this.state.seconds])
        );
    };

    updateHours = (hours) => {
        const {minutes, seconds} = this.state;

        this.updateTime(hours, minutes, seconds);
    };

    updateMinutes = (minutes) => {
        const {hours, seconds} = this.state;

        this.updateTime(hours, minutes, seconds);
    };

    updateSeconds = (seconds) => {
        const {hours, minutes} = this.state;

        this.updateTime(hours, minutes, seconds);
    };

    render() {
        const {value, hasSeconds} = this.props;
        const [hours, minutes, seconds] = (value || []);

        return <div className="time-picker">
            <div className="spinners">
                <SpinnerInput
                    options={getHoursOptions()}
                    value={hours}
                    onChange={value => this.updateHours(value)}
                />
                <SpinnerInput
                    options={getMinutesOptions()}
                    value={minutes}
                    onChange={value => this.updateMinutes(value)}
                />
                {
                    hasSeconds &&
                    <SpinnerInput
                        options={getSecondsOptions()}
                        value={seconds}
                        onChange={value => this.updateSeconds(value)}
                    />
                }
            </div>
        </div>;
    }
}


TimePicker.defaultProps = {
    defaultValue: [0, 0, 0],
    value: undefined,
    hasSeconds: true
};


function getHoursOptions() {
    return getOptions(24);
}

function getMinutesOptions() {
    return getOptions(60);
}

function getSecondsOptions() {
    return getOptions(60);
}

function getOptions(total) {
    const options = [];

    for (let i = 0; i < total; i++) {
        options.push({
            value: i,
            label: i < 10 ? '0' + i : '' + i
        });
    }

    return options;
}
