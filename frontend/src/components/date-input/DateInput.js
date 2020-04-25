import './DateInput.less';
import React from 'react';
import TemplateInput from '../../components/template-input/TemplateInput';

export default class DateInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }



    render() {
        return <div className="date-input">
            <input type="date"/>
            <br/>
            <br/>
            <TemplateInput/>
        </div>;
    }
}

DateInput.defaultProps = {

};
