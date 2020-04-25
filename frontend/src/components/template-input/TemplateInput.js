import './TemplateInput.less';
import React from 'react';
import NumberPiece from './pieces/number-piece/NumberPiece';
import SelectablePiece from './pieces/selectable-piece/SelectablePiece';

export default class TemplateInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            values: {}
        };

    }

    getPiece = (pieceProps) => {
        const {values} = this.state;

        if ('string' === typeof pieceProps) {
            return <span className="string-alien">{pieceProps}</span>;
        }

        if (pieceProps.type === TemplateInput.PIECE_NUMBER) {
            return <NumberPiece
                {...pieceProps}
                min={'number' === typeof pieceProps.min ? pieceProps.min : pieceProps.min(values)}
                max={'number' === typeof pieceProps.max ? pieceProps.max : pieceProps.max(values)}
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
            const date = new Date(values['year'], values['month'] + 1, 1); // first day of next month
            if (isNaN(date.getDate())) {
                return 28;
            }
            date.setDate(date.getDate() - 1); // last day of current month
            return date.getDate();
        },
        emptyDigit: '-'
    },
    '/',
    // {
    //     key: 'month',
    //     type: TemplateInput.PIECE_SELECTABLE,
    //     option: [
    //         {value: 0, label: 'January'},
    //         {value: 1, label: 'February'},
    //         {value: 2, label: 'March'},
    //         {value: 3, label: 'April'},
    //         {value: 4, label: 'May'},
    //         {value: 5, label: 'June'},
    //         {value: 6, label: 'July'},
    //         {value: 7, label: 'August'},
    //         {value: 8, label: 'September'},
    //         {value: 9, label: 'October'},
    //         {value: 10, label: 'November'},
    //         {value: 11, label: 'December'},
    //     ],
    // },
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
        max: 2020,
        emptyDigit: '-'
    },
];

TemplateInput.defaultProps = {
    template: TemplateInput.dateDMYTemplate
};