import './DateInput.less';
import React from 'react';

export default class DateInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

        /**
         *
         * @type {HTMLInputElement}
         */
        this.input = null;
    }



    render() {
        return <div className="date-input">
            <input type="date"/>
            <br/>
            <input
                type="text"
                ref={el => this.input = el}
                onKeyDown={this.onKeyDown}
                onKeyUp={this.onKeyUp}
                onSelect={this.onSelect}
                onPaste={this.onPaste}
                onChange={this.onChange}
            />
        </div>;
    }
}

DateInput.defaultProps = {

};
