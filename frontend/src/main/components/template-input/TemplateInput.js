import './TemplateInput.less';
import React from 'react';
import NumberPiece from './pieces/number-piece/NumberPiece';
import SelectablePiece from './pieces/selectable-piece/SelectablePiece';

export default class TemplateInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            values: props.defaultValues !== null ? props.defaultValues : {},
            focusedPieceKey: null,
            forceFocusedPieceKey: null
        };
    }

    static getDerivedStateFromProps(props, state) {
        const isValuesChanged = props.values !== undefined
            && JSON.stringify(props.values) !== JSON.stringify(state.values);

        if (isValuesChanged) {
            state.values = props.values;

            return state;
        }

        return null;
    }

    updateValue = (key, value) => {
        const {onChange} = this.props;
        const {values} = this.state;

        values[key] = value;

        this.setState(
            {values},
            () => onChange(values)
        );
    };

    updateFocusedPiece = (key, callback) => {
        this.setState({focusedPieceKey: key}, callback);
    };

    focusPiece = (key) => {
        this.setState({forceFocusedPieceKey: key});
    };

    focusNextPiece = (key) => {
        const sibling = this.getSiblingPiece(key, true);

        if (sibling) {
            this.focusPiece(sibling.key);
        }
    };

    focusPrevPiece = (key) => {
        const sibling = this.getSiblingPiece(key, false);

        if (sibling) {
            this.focusPiece(sibling.key);
        }
    };

    getSiblingPiece = (key, isForward) => {
        const {template} = this.props;

        const arrayOfPieceProps = [].concat(template);

        if (!isForward) {
            arrayOfPieceProps.reverse();
        }

        let reached = false;

        return arrayOfPieceProps.find(pieceCnf => {
            if (this.getIsAlienPiece(pieceCnf)) {
                return false;
            }

            if (key === null) {
                return pieceCnf;
            }

            if (key === pieceCnf.key) {
                reached = true;
                return false;
            }

            return reached;
        });
    };

    getIsAlienPiece = (pieceCnf) => {
        if ('string' === typeof pieceCnf) {
            return true;
        }

        if (React.isValidElement(pieceCnf)) {
            return true;
        }

        return false;
    };

    getAlienPiece = (pieceCnf) => {
        return pieceCnf;
    };

    getNumberPiece = (pieceCnf) => {
        const {defaultValues} = this.props;
        const {values, forceFocusedPieceKey} = this.state;

        const propValue = this.props.values !== undefined ? this.props.values[pieceCnf.key] : undefined;
        const defaultValue = defaultValues !== null ? defaultValues[pieceCnf.key] : null;
        const min = 'number' === typeof pieceCnf.min ? pieceCnf.min : pieceCnf.min(values);
        const max = 'number' === typeof pieceCnf.max ? pieceCnf.max : pieceCnf.max(values);

        const onInputRef = el => {
            if (el && forceFocusedPieceKey === pieceCnf.key) {
                el.focus();
                this.focusPiece(null);
            }
        };

        const onBlur = ev => {

            // add to callback queue
            // to wait for next focus happens immediately on other pieces of this input instance
            // if true, just ignore
            // if no focus happened, set focused key null, and fire onBlurAll
            setTimeout(() => {
                if (this.state.focusedPieceKey !== pieceCnf.key) {
                    return;
                }
                this.updateFocusedPiece(null);
                this.props.onBlurAll();
            }, 0);
        };

        const onFocus = ev => {
            this.updateFocusedPiece(pieceCnf.key, () => {
                this.props.onFocus(pieceCnf.key);
            });
        };

        return <NumberPiece
            value={propValue}
            defaultValue={defaultValue}
            emptyDigit={pieceCnf.emptyDigit}
            min={min}
            max={max}
            onInputRef={onInputRef}
            onChange={value => this.updateValue(pieceCnf.key, value)}
            onBackward={() => this.focusPrevPiece(pieceCnf.key)}
            onForward={() => this.focusNextPiece(pieceCnf.key)}
            onBlur={onBlur}
            onFocus={onFocus}
        />;
    };

    getSelectablePiece = (pieceCnf) => {
        /**
         * Not implemented yet
         */
        return <SelectablePiece/>;
    };

    getPiece = (pieceCnf) => {
        if (this.getIsAlienPiece(pieceCnf)) {
            return this.getAlienPiece(pieceCnf);
        }

        if (pieceCnf.type === TemplateInput.PIECE_NUMBER) {
            return this.getNumberPiece(pieceCnf);
        }

        if (pieceCnf.type === TemplateInput.PIECE_SELECTABLE) {
            return this.getSelectablePiece(pieceCnf);
        }
    };

    onClick = (ev) => {
        const {focusedPieceKey} = this.state;
        if (focusedPieceKey === null) {
            const piece = this.getSiblingPiece(null, true);
            this.focusPiece(piece.key);
        }
    };

    render() {
        const {template} = this.props;

        return <div
            className="template-input"
            onClick={(ev) => this.onClick(ev)}
        >
            <ul>
                {
                    template.map(
                        (pieceCnf, index) =>
                            <li key={pieceCnf.key || index}>
                                {this.getPiece(pieceCnf)}
                            </li>
                    )
                }
            </ul>
        </div>
    }
}

TemplateInput.PIECE_NUMBER = 'number';
TemplateInput.PIECE_SELECTABLE = 'selectable';

TemplateInput.dateDMYTemplate = [
    {
        key: 'date',
        type: TemplateInput.PIECE_NUMBER,
        min: 1,
        max: (values) => {
            const lastFirstDay = new Date(values['year'], values['month'], 1); // first day of next month
            if (isNaN(lastFirstDay.getDate())) {
                return 28;
            }
            lastFirstDay.setDate(lastFirstDay.getDate() - 1); // last day of current month
            return lastFirstDay.getDate();
        },
        emptyDigit: '-'
    },
    '/',
    {
        key: 'month',
        type: TemplateInput.PIECE_NUMBER,
        min: 1,
        max: 12,
        emptyDigit: '-'
    },
    '/',
    {
        key: 'year',
        type: TemplateInput.PIECE_NUMBER,
        min: 1900,
        max: 2100,
        emptyDigit: '-'
    },
];

TemplateInput.monthTemplate = [
    {
        key: 'month',
        type: TemplateInput.PIECE_SELECTABLE,
        options: [
            {value: 0, label: 'January'},
            {value: 1, label: 'February'},
            {value: 2, label: 'March'},
            {value: 3, label: 'April'},
            {value: 4, label: 'May'},
            {value: 5, label: 'June'},
            {value: 6, label: 'July'},
            {value: 7, label: 'August'},
            {value: 8, label: 'September'},
            {value: 9, label: 'October'},
            {value: 10, label: 'November'},
            {value: 11, label: 'December'},
        ],
    },
    {
        key: 'year',
        type: TemplateInput.PIECE_NUMBER,
        min: 1900,
        max: 2100,
        emptyDigit: '-'
    },
];

TemplateInput.timeHMSTemplate = [
    {
        key: 'hours',
        type: TemplateInput.PIECE_NUMBER,
        min: 0,
        max: 23,
        emptyDigit: '-'
    },
    ':',
    {
        key: 'minutes',
        type: TemplateInput.PIECE_NUMBER,
        min: 0,
        max: 59,
        emptyDigit: '-'
    },
    ':',
    {
        key: 'seconds',
        type: TemplateInput.PIECE_NUMBER,
        min: 0,
        max: 59,
        emptyDigit: '-'
    },
];


TemplateInput.timeHMTemplate = [
    {
        key: 'hours',
        type: TemplateInput.PIECE_NUMBER,
        min: 0,
        max: 23,
        emptyDigit: '-'
    },
    ':',
    {
        key: 'minutes',
        type: TemplateInput.PIECE_NUMBER,
        min: 0,
        max: 59,
        emptyDigit: '-'
    }
];

TemplateInput.defaultProps = {
    template: TemplateInput.dateDMYTemplate,
    values: undefined,
    defaultValues: null,
    onChange: (values) => console.log('(TemplateInput) onChange is omitted', values),
    onFocus: (key) => {},
    onBlurAll: () => {}
};
