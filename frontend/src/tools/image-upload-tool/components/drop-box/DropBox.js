import './DropBox.less';
import React from 'react';
import {translate} from '../../../../i18n';

export default class DropBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDragging: false,
            errors: []
        };
    }

    onDragEnter = ev => {
        ev.preventDefault();

        this.setState({isDragging: true});
    };

    onDragOver = ev => {
        ev.preventDefault();

        if (!this.state.isDragging) {
            this.setState({isDragging: true});
        }
    };

    onDragLeave = ev => {
        ev.preventDefault();

        this.setState({isDragging: false});
    };

    onDrop = ev => {
        ev.preventDefault();

        this.setState({isDragging: false});

        const file = ev.dataTransfer.files[0];
        this.props.onChange(file);
    };

    render() {
        const {children} = this.props;
        const {isDragging} = this.state;

        return <div
            className="drop-box"
            onDragEnter={this.onDragEnter}
            onDragOver={this.onDragOver}
            onDragLeave={this.onDragLeave}
            onDrop={this.onDrop}
        >
            {
                !isDragging ? children :
                    <div>
                        {translate('Drop here')}
                    </div>
            }
        </div>;
    }
}

DropBox.defaultProps = {
    onChange: (file) => console.log('DropBox onChange', file),
};