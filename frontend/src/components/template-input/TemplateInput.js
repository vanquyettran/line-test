import './TemplateInput.less';
import React from 'react';
import NumberPiece from './pieces/number-piece/NumberPiece';
import SelectablePiece from './pieces/selectable-piece/SelectablePiece';

export default class TemplateInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            values: {},
            focusedPieceKey: null,
            forceFocusedPieceKey: null
        };
    }

    updateValue = (key, value) => {
        this.state.values[key] = value;
        this.forceUpdate(() => this.props.onChange(this.state.values));
    };

    updateFocusedPiece = (key) => {
        this.setState({focusedPieceKey: key});
    };

    focusPiece = (key) => {
        this.setState({forceFocusedPieceKey: key});
    };

    focusNextPiece = (key) => {
        this.focusSiblingPiece(key, true);
    };

    focusPrevPiece = (key) => {
        this.focusSiblingPiece(key, false);
    };

    focusSiblingPiece = (key, isForward) => {
        const {template} = this.props;
        const {focusedPieceKey} = this.state;

        const arrayOfPieceProps = [].concat(template);
        if (!isForward) {
            arrayOfPieceProps.reverse();
        }

        let reached = false;
        const sibling = arrayOfPieceProps.find(pieceProps => {
            if ('string' === typeof pieceProps || React.isValidElement(pieceProps)) {
                return false;
            }

            if (focusedPieceKey === pieceProps.key) {
                reached = true;
                return false;
            }

            return reached;
        });

        if (sibling) {
            this.focusPiece(sibling.key);
        }
    };

    getPiece = (pieceProps) => {
        if ('string' === typeof pieceProps) {
            return <span className="string-alien">{pieceProps}</span>;
        }

        if (React.isValidElement(pieceProps)) {
            return pieceProps;
        }

        const {values, forceFocusedPieceKey} = this.state;

        if (pieceProps.type === TemplateInput.PIECE_NUMBER) {
            const onInputRef = el => {
                if (el && forceFocusedPieceKey === pieceProps.key) {
                    el.focus();
                    this.focusPiece(null);
                }
            };

            return <NumberPiece
                {...pieceProps}
                min={'number' === typeof pieceProps.min ? pieceProps.min : pieceProps.min(values)}
                max={'number' === typeof pieceProps.max ? pieceProps.max : pieceProps.max(values)}
                onChange={value => this.updateValue(pieceProps.key, value)}
                onBackward={() => this.focusPrevPiece(pieceProps.key)}
                onForward={() => this.focusNextPiece(pieceProps.key)}
                onFocus={() => this.updateFocusedPiece(pieceProps.key)}
                onInputRef={onInputRef}
            />;
        }

        if (pieceProps.type === TemplateInput.PIECE_SELECTABLE) {
            return <SelectablePiece values={values} {...pieceProps}/>;
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
    onChange: (values) => console.log('(TemplateInput) onChange is omitted', values)
};