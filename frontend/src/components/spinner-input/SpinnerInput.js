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

        this.updateValue(defaultValue);

        return false;
    };

    getShouldDrawnOptions = () => {
        const {options, expanding} = this.props;
        const {value} = this.state;

        const result = [];

        for (let i = 0; i < options.length; i++) {
            if (value !== null && options[i].value !== value) {
                continue;
            }

            for (let j = i - expanding
                ; j <= i + expanding
                ; j++
            ) {
                if (j < 0 || j > options.length - 1) {
                    result.push(j);
                    continue;
                }
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

        if ('number' === typeof option) {
            return <li key={option}>&nbsp;</li>
        }

        return <li
            key={option.value}
            className={(value === option.value ? 'selected' : '')}
        >
            {option.label}
        </li>;
    };

    renderOptionsView = () => {
        return <div className="options-view" ref={el => this.optionsView = el}>
            <ul>
                { this.getShouldDrawnOptions().map(option => this.renderOptionItem(option)) }
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
        const index = options.indexOf(this.getSelectedOption());
        if (index > 0) {
            this.updateValue(options[index - 1].value);
        }
    };

    selectBelow = () => {
        const {options} = this.props;
        const index = options.indexOf(this.getSelectedOption());
        if (index < options.length - 1) {
            this.updateValue(options[index + 1].value);
        }
    };

    getSelectedOption = () => {
        const {options} = this.props;
        const {value} = this.state;

        return options.find(option => option.value === value);
    };

    render() {
        return <div className="spinner-input">
            <div className="head" onClick={() => this.selectBelow()}>
                <Icon name="angle-up"/>
            </div>
            <div className="body">
                {this.renderOptionsView()}
            </div>
            <div className="foot" onClick={() => this.selectAbove()}>
                <Icon name="angle-down"/>
            </div>
        </div>;
    }
}


SpinnerInput.defaultProps = {
    defaultValue: null,
    value: undefined, // force update value if !== undefined
    expanding: 1, // number of options shown on below or upper of selected option
    options: new Array(60).fill(null).map(
        (_, index) => ({value: index, label: index < 10 ? '0' + index : '' + index})
    ),
    onChange: (value) => console.log('(SpinnerInput) onChange is omitted', value),
};
