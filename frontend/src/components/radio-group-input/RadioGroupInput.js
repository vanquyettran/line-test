import './RadioGroupInput.less';
import React from 'react';

export default class RadioGroupInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: RadioGroupInput.normalizeValue(this.props.defaultValue)
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.value !== undefined && props.value !== state.value) {
            state.value = RadioGroupInput.normalizeValue(props.value);
            return state;
        }
        return null;
    }

    static normalizeValue = (value) => {
        return value !== undefined ? value : null;
    };

    componentDidUpdate() {
        const {value} = this.state;
        const {options, defaultValue} = this.props;

        // check if value is in options or not
        // if not, set value to default value
        if (value !== null && !options.find(option => option.value === value)) {
            this.setValue(RadioGroupInput.normalizeValue(defaultValue));
        }
    }

    setValue = (value) => {
        const {onChange} = this.props;
        const callback = onChange ? () => onChange(value) : undefined;
        this.setState({value}, callback);
    };

    render() {
        const {options, disabled, appearance = 'default', optionAppearance = 'default'} = this.props;
        const {value: inputValue} = this.state;

        return <div className={`radio-group-input appearance-${appearance} option-appearance-${optionAppearance}`}>
            <ul>
                {
                    options.map(({value, label}) => <li
                        key={value}
                        onClick={() => disabled || this.setValue(value)}
                        className={inputValue === value ? 'selected' : ''}
                    >
                        <div className="option-content">
                            <div className="icon-holder">
                                {
                                    value === inputValue
                                        ? <i className="icon icon-radio-checked"/>
                                        : <i className="icon icon-radio-blank"/>
                                }
                            </div>
                            <div className="label">
                                {label}
                            </div>
                        </div>
                    </li>)
                }
            </ul>
        </div>
    }
}
