import './TemplateInput.less';
import React from 'react';

export default class TemplateInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            values: {}
        };

        /**
         *
         * @type {HTMLInputElement}
         */
        this.input = null;
    }

    render() {
        return <input
            className="template-input"
            type="text"
            ref={el => this.input = el}
            onKeyDown={this.onKeyDown}
            onKeyUp={this.onKeyUp}
            onSelect={this.onSelect}
            onPaste={this.onPaste}
            onChange={this.onChange}
        />
    }
}

TemplateInput.PIECE_NUMBER = 'number';
TemplateInput.PIECE_SELECTABLE = 'selectable';

TemplateInput.defaultProps = {
    template: [
        {
            key: 'year',
            type: TemplateInput.PIECE_NUMBER,
            digits: 4,
            min: 6,
            max: 2020
        },
        ' - ',
        {
            key: 'month',
            type: TemplateInput.PIECE_SELECTABLE,
            option: [
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
        ' - ',
        {
            key: 'date',
            type: TemplateInput.PIECE_NUMBER,
            digits: 2,
            min: 1,
            max: (values) => {
                const date = new Date(values['year'], values['month'] + 1, 1); // first day of next month
                date.setDate(date.getDate() - 1); // last day of current month
                return date.getDate();
            }
        }
    ]
};
