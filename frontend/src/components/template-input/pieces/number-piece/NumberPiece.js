import './NumberPiece.less';
import React from 'react';

export default class NumberPiece extends React.Component {
    constructor(props) {
        super(props);

        const {defaultValue, max, onChange} = this.props;
        const [digits, value] = NumberPiece.normalizeDigitsAndValue(defaultValue, max);

        this.state = {
            digits,
            value,
            focused: false,

            // when typing, value can be invalid temporarily,
            // typing is char by char, if validate immediately, users cannot type what they want
            // do not validate until blurring happened completely
            isTemp: false,

        };

        onChange(value);

        /**
         * @type {HTMLInputElement}
         */
        this.input = null;
    }

    componentDidMount() {
        this.initInputStyle();
    }

    componentDidUpdate() {
        if (!this.state.isTemp) {
            this.ensureValueIsValid();
        }
    }

    /**
     *
     * when received new props
     * some rules might be changed
     */
    ensureValueIsValid = () => {
        const {digits, value} = this.state;
        const [validDigits, validValue] = this.getValidDigitsAndValue(digits, value);
        if (value === validValue) {
            return;
        }
        this.updateDigitsAndValue(validDigits, validValue);
    };

    /**
     * First time render, this.input === null
     * After mount, this.input !== null,
     * we need to init input style
     */
    initInputStyle = () => {
        const style = this.getInputStyle(this.getDisplayedValue());

        for (let attr in style) {
            if (style.hasOwnProperty(attr)) {
                this.input.style[attr] = style[attr];
            }
        }
    };

    static getDerivedStateFromProps(props, state) {
        const {value, max} = props;

        const isValueChanged = value !== undefined && value !== state.value && !state.isTemp;

        if (!isValueChanged) {
            return null;
        }

        const digitsAndValue = NumberPiece.normalizeDigitsAndValue(value, max);

        state.digits = digitsAndValue[0];
        state.value = digitsAndValue[1];

        return state;
    }

    static normalizeDigitsAndValue = (value, max) => {
        const digits = numberToDigits(value, String(max).length);
        return [digits, digitsToNumber(digits)];
    };

    getValidDigitsAndValue = (digits, value) => {
        const {min, max} = this.props;

        if (value === null) {
            return [digits, value];
        }

        if (value < min) {
            digits = numberToDigits(min, String(max).length);
            return [digits, min];
        }

        if (value > max) {
            digits = numberToDigits(max, String(max).length);
            return [digits, max];
        }

        return [digits, value];
    };

    setTempDigitsAndValue = (digits, value) => {
        this.setState({digits, value, isTemp: true});
    };

    updateDigitsAndValue = (digits, value) => {
        this.setState({digits, value}, () => {
            this.props.onChange(this.state.value);
        });
    };

    updateSyncedDigitsAndValue = (digits, value, validate) => {
        if (!validate) {
            this.setTempDigitsAndValue(digits, value);
            return;
        }

        this.updateDigitsAndValue(
            ...this.getValidDigitsAndValue(digits, value)
        );
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

        if (value > 0) {
            this.syncValueToDigits(value - 1);
        }
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

        if (ev.key === 'ArrowLeft') {
            ev.preventDefault();
            this.props.onBackward();
            return;
        }

        if (ev.key === 'ArrowRight') {
            ev.preventDefault();
            this.props.onForward();
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

    onFocus = ev => {
        const {onFocus} = this.props;
        this.setState(
            {focused: true},
            () => onFocus(ev)
        );
    };

    onBlur = ev => {
        const {onBlur} = this.props;
        const {digits, value} = this.state;

        this.setState(
            {focused: false},
            () => {
                onBlur(ev);

                this.setState(
                    {isTemp: false},
                    () => {
                        this.updateDigitsAndValue(
                            ...this.getValidDigitsAndValue(digits, value)
                        );
                    }
                );
            }
        );
    };

    getDisplayedValue = () => {
        const {emptyDigit} = this.props;
        const {digits} = this.state;

        return digits.map(digit => digit !== null ? digit : emptyDigit).join('');
    };

    getInputStyle = (displayedValue) => {
        return {
            boxSizing: 'content-box',
            padding: '0px',
            minWidth: measureTextWidth(displayedValue, this.input || document.body) + 'px'
        };
    };

    render() {
        const {focused} = this.state;
        const displayedValue = this.getDisplayedValue();
        const inputStyle = this.getInputStyle(displayedValue);

        return <div className={'number-piece' + (focused ? ' focused' : '')}>
            <input
                className="template-input"
                type="text"
                ref={el => {
                    this.input = el;
                    this.props.onInputRef(el);
                }}
                onKeyDown={this.onKeyDown}
                onKeyUp={this.onKeyUp}
                onPaste={this.onPaste}
                onChange={this.onChange}
                onInput={this.onInput}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                value={displayedValue}
                style={inputStyle}
            />
        </div>;
    }
}


NumberPiece.defaultProps = {
    min: 0,
    max: 99,
    emptyDigit: '-',
    defaultValue: null,
    value: undefined,
    onInputRef: (el) => {},
    onChange: (value) => console.log('(TemplateInput/NumberPiece) onChange is omitted', value),
    onBackward: () => {},
    onForward: () => {},
    onFocus: () => {},
    onBlur: () => {},
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


/** @type {CanvasRenderingContext2D} */
const context2d = document.createElement('canvas').getContext('2d');

function measureTextWidth(text, el) {
    context2d.font = window.getComputedStyle(el).font;
    return context2d.measureText(text).width;
}
