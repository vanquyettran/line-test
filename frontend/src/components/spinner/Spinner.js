import './Spinner.less';
import React from 'react';
import {colorPrimary} from '../../values/color';
import svgContentTemplate from './_svgContentTemplate';

export default class Spinner extends React.Component {

    getSvgContent = () => {
        return svgContentTemplate.replace(/\@color/g, this.props.color);
    };

    render() {
        return <svg
            className="spinner"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            dangerouslySetInnerHTML={{__html: this.getSvgContent()}}
        />;
    }
}

Spinner.defaultProps = {
    color: colorPrimary
};
