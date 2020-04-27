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
        if (props.value === undefined || props.value === state.value) {
            return null;
        }

        state.value = RadioGroupInput.normalizeValue(props.value);
        return state;
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
            this.updateValue(RadioGroupInput.normalizeValue(defaultValue));
        }
    }

    updateValue = (value) => {
        const {onChange} = this.props;
        this.setState({value}, () => onChange(value));
    };

    render() {
        const {options, disabled, appearance} = this.props;
        const {value: inputValue} = this.state;

        return <div className={`radio-group-input appearance-${appearance}`}>
            <ul>
                {
                    options.map(({value, label}) => <li
                        key={value}
                        onClick={() => disabled || this.updateValue(value)}
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


RadioGroupInput.defaultProps = {
    options: [],
    value: undefined,
    defaultValue: null,
    onChange: value => console.log('(RadioGroupInput) onChange is omitted', value),
    appearance: 'column'
};
