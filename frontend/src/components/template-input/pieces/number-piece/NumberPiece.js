import './NumberPiece.less';
import React from 'react';

export default class NumberPiece extends React.Component {
    constructor(props) {
        super(props);

        const {defaultValue, max, emptyDigit} = this.props;
        const digitsAndValue = NumberPiece.normalizeDigitsAndValue(defaultValue, max, emptyDigit);

        this.state = {
            digits: digitsAndValue[0],
            value: digitsAndValue[1]
        };

        /**
         * @type {HTMLInputElement}
         */
        this.input = null;
    }

    static normalizeDigitsAndValue = (value, max, emptyDigit) => {
        const digits = numberToDigits(value, String(max).length, emptyDigit);
        const _value = digitsToNumber(digits, emptyDigit);
        return [digits, _value];
    };

    static getDerivedStateFromProps(props, state) {
        if (props.value !== null && props.value !== state.value) {
            const {value, max, emptyDigit} = this.props;
            const digitsAndValue = NumberPiece.normalizeDigitsAndValue(value, max, emptyDigit);

            state.digits = digitsAndValue[0];
            state.value = digitsAndValue[1];

            return state;
        }

        return null;
    }

    syncDigitsToValue = () => {
        const {emptyDigit, max} = this.props;
        this.setState(({digits}) => {
            const number = digitsToNumber(digits, emptyDigit);
            return {
                value: number,
                digits: numberToDigits(number, String(max).length, emptyDigit)
            };
        });
    };

    syncValueToDigits = () => {
        const {emptyDigit, max} = this.props;
        this.setState(({value}) => {
            const digits = numberToDigits(value, String(max).length, emptyDigit);
            return {
                digits,
                value: digitsToNumber(digits, emptyDigit)
            };
        });
    };

    addDigit = (digit) => {
        const {digits} = this.state;

        digits.push(digit);
        this.syncDigitsToValue();
    };

    popDigit = () => {
        const {digits} = this.state;

        digits.pop();
        this.syncDigitsToValue();
    };

    increaseValue = () => {
        this.state.value++;
        this.syncValueToDigits();
    };

    decreaseValue = () => {
        this.state.value--;
        this.syncValueToDigits();
    };

    onKeyDown = ev => {
        ev.preventDefault();

        if (!isNaN(ev.key)) {
            this.addDigit(ev.key);
            return;
        }

        if (ev.key === 'Delete' || ev.key === 'Backspace') {
            this.popDigit();
            return;
        }

        if (ev.key === 'ArrowUp') {
            this.increaseValue();
            return;
        }

        if (ev.key === 'ArrowDown') {
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

    render() {
        const {
            min,
            max,
            emptyDigit
        } = this.props;

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
                value={digits.join('')}
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

function digitsToNumber(digits, emptyDigit) {
    return Number(digits.filter(digit => digit !== emptyDigit).join(''));
}


function numberToDigits(number, numOfDigits, emptyDigit) {
    if (number === null) {
        const digits = [];

        for (let i = 0; i < numOfDigits; i++) {
            digits.push(emptyDigit);
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
