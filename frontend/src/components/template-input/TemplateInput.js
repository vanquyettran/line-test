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
        const isValuesChanged = props.values !== null
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

    updateFocusedPiece = (key) => {
        this.setState({focusedPieceKey: key});
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
        const {focusedPieceKey} = this.state;

        const arrayOfPieceProps = [].concat(template);

        if (!isForward) {
            arrayOfPieceProps.reverse();
        }

        let reached = false;

        return arrayOfPieceProps.find(pieceProps => {
            if (this.getIsAlienPiece(pieceProps)) {
                return false;
            }

            if (focusedPieceKey === pieceProps.key) {
                reached = true;
                return false;
            }

            return reached;
        });
    };

    getIsAlienPiece = (pieceProps) => {
        if ('string' === typeof pieceProps) {
            return true;
        }

        if (React.isValidElement(pieceProps)) {
            return true;
        }

        return false;
    };

    getAlienPiece = (pieceProps) => {
        return pieceProps;
    };

    getNumberPiece = (pieceProps) => {
        const {defaultValues, values: propsValues} = this.props;
        const {values, forceFocusedPieceKey} = this.state;

        const onInputRef = el => {
            if (el && forceFocusedPieceKey === pieceProps.key) {
                el.focus();
                this.focusPiece(null);
            }
        };


        return <NumberPiece
            value={propsValues !== null && propsValues[pieceProps.key] !== null ? propsValues[pieceProps.key] : null}
            defaultValue={defaultValues !== null ? defaultValues[pieceProps.key] : null}
            emptyDigit={pieceProps.emptyDigit}
            min={'number' === typeof pieceProps.min ? pieceProps.min : pieceProps.min(values)}
            max={'number' === typeof pieceProps.max ? pieceProps.max : pieceProps.max(values)}
            onChange={value => this.updateValue(pieceProps.key, value)}
            onBackward={() => this.focusPrevPiece(pieceProps.key)}
            onForward={() => this.focusNextPiece(pieceProps.key)}
            onFocus={() => this.updateFocusedPiece(pieceProps.key)}
            onInputRef={onInputRef}
        />;
    };

    getSelectablePiece = (pieceProps) => {
        /**
         * Not implemented yet
         */
        return <SelectablePiece/>;
    };

    getPiece = (pieceProps) => {
        if (this.getIsAlienPiece(pieceProps)) {
            return this.getAlienPiece(pieceProps);
        }

        if (pieceProps.type === TemplateInput.PIECE_NUMBER) {
            return this.getNumberPiece(pieceProps);
        }

        if (pieceProps.type === TemplateInput.PIECE_SELECTABLE) {
            return this.getSelectablePiece(pieceProps);
        }
    };

    render() {
        const {template} = this.props;

        return <div className="template-input">
            <ul>
                {
                    template.map(
                        (pieceProps, index) =>
                            <li key={pieceProps.key || index}>
                                {this.getPiece(pieceProps)}
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
        max: 2050,
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
        max: 2050,
        emptyDigit: '-'
    },
];

TemplateInput.defaultProps = {
    template: TemplateInput.dateDMYTemplate,
    values: null,
    defaultValues: null,
    onChange: (values) => console.log('(TemplateInput) onChange is omitted', values)
};