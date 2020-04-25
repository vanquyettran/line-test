import './SpinnerInput.less';
import React from 'react';
import Icon from '../../components/icon/Icon';

export default class SpinnerInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.defaultValue
        };

        /**
         *
         * @type {HTMLDivElement}
         */
        this.optionsView = null;
    }

    static getDerivedStateFromProps(props, state) {
        const hasChange = props.value !== undefined && props.value !== state.value;
        if (!hasChange) {
            return null;
        }

        state.value = props.value;
        return state;
    }

    componentDidUpdate() {
        if (!this.ensureValueIsValid()) {
            return;
        }

    }

    /**
     *
     * check if value is in options or not
     * if not, set value to default value
     */
    ensureValueIsValid = () => {
        const {options, defaultValue} = this.props;
        const {value} = this.state;

        if (value === null) {
            return true;
        }

        if (options.find(option => option.value === value)) {
            return true;
        }

        this.setValue(defaultValue);

        return false;
    };

    getShouldDrawnOptions = () => {
        const {options, expanding} = this.props;
        const {value} = this.state;

        const result = [];

        for (let i = 0; i < options.length; i++) {
            if (options[i].value !== value) {
                continue;
            }

            for (let j = Math.max(i - expanding, 0)
                ; j <= Math.min(i + expanding, options.length - 1)
                ; j++
            ) {
                result.push(options[j]);
            }

            break;
        }

        if (result.length > 0) {
            return result;
        }

        return options.slice(0, expanding);
    };

    renderOptionItem = (option) => {
        const {value} = this.state;

        return <li
            key={option.value}
            className={(value === option.value ? 'selected' : '')}
        >
            {option.label}
        </li>;
    };

    renderOptionsView = () => {
        return <div
            className="options-view"
            ref={el => this.optionsView = el}
        >
            <ul>
                {
                    this.getShouldDrawnOptions()
                        .map(option => this.renderOptionItem(option))
                }
            </ul>
        </div>;
    };

    updateValue = (value) => {
        const {onChange} = this.props;
        this.setState(
            {value},
            () => onChange(value)
        );
    };

    selectAbove = () => {
        const {options} = this.props;
        const selectedOption = options.find(option => option.value === value);
        const index = options.indexOf(selectedOption);
        if (index > 0) {
            this.updateValue(options[index - 1].value);
        }
    };

    selectBelow = () => {
        const {options} = this.props;
        const selectedOption = options.find(option => option.value === value);
        const index = options.indexOf(selectedOption);
        if (index < options.length - 1) {
            this.updateValue(options[index + 1].value);
        }
    };

    render() {
        return <div className="spinner-input">
            <div className="head" onClick={() => this.selectAbove()}>
                <Icon name="angle-up"/>
            </div>
            <div className="body">
                {this.renderOptionsView()}
            </div>
            <div className="foot" onClick={() => this.selectBelow()}>
                <Icon name="angle-down"/>
            </div>
        </div>;
    }
}


SpinnerInput.defaultProps = {
    defaultValue: null,
    value: undefined,
    options: new Array(60).fill(null).map(
        (_, index) => ({value: index, label: index < 10 ? '0' + index : '' + index})
    ),
    expanding: 2
};