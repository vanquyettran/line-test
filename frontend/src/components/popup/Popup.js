import './Popup.less';
import React from 'react';
import IconButton from '../icon-button/IconButton';
import LayoutPortal from '../../layout/components/layout-portal/LayoutPortal';

export default class Popup extends React.Component {
    render() {
        const {title, children, close, buttons} = this.props;

        return <LayoutPortal name="popup">
            <div
                className="backdrop"
                onClick={close ? () => close() : undefined}
            />
            <div className="overlay">
                {
                    title !== undefined &&
                    <div className="popup-head">
                        <div className="title">{ title }</div>
                        {
                            close &&
                            getCloseButton(close)
                        }
                    </div>
                }
                {
                    title === undefined &&
                    close &&
                    getCloseButton(close)
                }
                <div className="popup-body">
                    { children }
                </div>
                {
                    buttons.length > 0 &&
                    <div className="popup-foot">
                        { buttons }
                    </div>
                }
            </div>
        </LayoutPortal>;
    }
}

Popup.defaultProps = {
    buttons: []
};

function getCloseButton(close) {
    return <IconButton
        name="close-button"
        icon="times"
        appearance="custom"
        onClick={() => close()}
    />;
}