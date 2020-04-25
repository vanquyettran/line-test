import './NumberPiece.less';
import React from 'react';

export default class NumberPiece extends React.Component {
    constructor(props) {
        super(props);

        const {defaultValue, max} = this.props;
        const digitsAndValue = NumberPiece.normalizeDigitsAndValue(defaultValue, max);

        this.state = {
            digits: digitsAndValue[0],
            value: digitsAndValue[1]
        };

        /**
         * @type {HTMLInputElement}
         */
        this.input = null;
    }

    static getDerivedStateFromProps(props, state) {
        if (props.value !== null && props.value !== state.value) {
            const {value, max} = this.props;
            const digitsAndValue = NumberPiece.normalizeDigitsAndValue(value, max);

            state.digits = digitsAndValue[0];
            state.value = digitsAndValue[1];

            return state;
        }

        return null;
    }

    static normalizeDigitsAndValue = (value, max) => {
        const digits = numberToDigits(value, String(max).length);
        return [digits, digitsToNumber(digits)];
    };

    getValidDigitsAndValue = (digits, value) => {
        const {min, max} = this.props;

        if (value === null) {
            return {digits, value};
        }

        if (value < min) {
            digits = numberToDigits(min, String(max).length);
            return {digits, value: min};
        }

        if (value > max) {
            digits = numberToDigits(max, String(max).length);
            return {digits, value: max};
        }

        return {digits, value};
    };

    updateSyncedDigitsAndValue = (digits, value, validate) => {
        if (!validate) {
            this.setState({digits, value});
            return;
        }

        this.setState(this.getValidDigitsAndValue(digits, value));
    };

    syncDigitsToValue = (digits) => {
        const {max} = this.props;

        let number = digitsToNumber(digits);
        let _digits = numberToDigits(number, String(max).length);
        number = digitsToNumber(_digits);

        this.updateSyncedDigitsAndValue(
            _digits,
            number,
            false
        );
    };

    syncValueToDigits = (value) => {
        const {max} = this.props;
        const digits = numberToDigits(value, String(max).length);
        const number = digitsToNumber(digits);
        this.updateSyncedDigitsAndValue(
            digits,
            number,
            true
        );
    };

    addDigit = (digit) => {
        const {digits} = this.state;

        this.syncDigitsToValue(digits.concat(digit));
    };

    popDigit = () => {
        const {digits} = this.state;

        if (digits.length === 0 || digits.every(d => d === '0')) {
            this.syncValueToDigits(null);
            return;
        }

        const _digits = [].concat(digits);
        _digits.pop();
        this.syncDigitsToValue(_digits);
    };

    increaseValue = () => {
        const {min} = this.props;
        const {value} = this.state;

        if (value === null) {
            this.syncValueToDigits(min);
            return;
        }

        this.syncValueToDigits(value + 1);
    };

    decreaseValue = () => {
        const {max} = this.props;
        const {value} = this.state;

        if (value === null) {
            this.syncValueToDigits(max);
            return;
        }

        this.syncValueToDigits(value - 1);
    };

    onKeyDown = ev => {

        if (!isNaN(ev.key)) {
            ev.preventDefault();
            this.addDigit(ev.key);
            return;
        }

        if (ev.key === 'Delete' || ev.key === 'Backspace') {
            ev.preventDefault();
            this.popDigit();
            return;
        }

        if (ev.key === 'ArrowUp') {
            ev.preventDefault();
            this.increaseValue();
            return;
        }

        if (ev.key === 'ArrowDown') {
            ev.preventDefault();
            this.decreaseValue();
            return;
        }

    };

    onKeyUp = ev => {
        ev.preventDefault();

    };

    onPaste = ev => {
        ev.preventDefault();

    };

    onChange = ev => {
        ev.preventDefault();

    };

    onInput = ev => {
        ev.preventDefault();

    };

    onBlur = ev => {
        const {digits, value} = this.state;
        this.setState(this.getValidDigitsAndValue(digits, value));
    };

    render() {
        const {emptyDigit} = this.props;

        const {digits} = this.state;

        return <div className="number-piece">
            <input
                className="template-input"
                type="text"
                ref={el => this.input = el}
                onKeyDown={this.onKeyDown}
                onKeyUp={this.onKeyUp}
                onPaste={this.onPaste}
                onChange={this.onChange}
                onInput={this.onInput}
                onBlur={this.onBlur}
                value={digits.map(digit => digit !== null ? digit : emptyDigit).join('')}
            />
        </div>;
    }
}


NumberPiece.defaultProps = {
    min: 0,
    max: 99,
    emptyDigit: '-',
    value: null,
    defaultValue: null
};

function digitsToNumber(digits) {
    const valuableDigits = digits.filter(digit => digit !== null);

    if (valuableDigits.length === 0) {
        return null;
    }

    return Number(valuableDigits.join(''));
}


function numberToDigits(number, numOfDigits) {
    if (number === null || number < 0) {
        const digits = [];

        for (let i = 0; i < numOfDigits; i++) {
            digits.push(null);
        }

        return digits;
    }

    const digits = String(number).split('');

    if (digits.length > 0) {
        while (digits.length > numOfDigits) {
            digits.shift();
        }
    }

    while (digits.length < numOfDigits) {
        digits.unshift('0');
    }

    return digits;
}
