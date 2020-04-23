import './Popup.less';
import React from 'react';
import IconButton from '../icon-button/IconButton';
import LayoutPortal from '../../layout/components/layout-portal/LayoutPortal';

export default class Popup extends React.Component {
    render() {
        const { children, close } = this.props;

        return <LayoutPortal className="popup">
            <div className="backdrop" onClick={close ? close : undefined}/>
            <div className="overlay">
                { children }
                {
                    close &&
                    <div className="close-button-holder">
                        <IconButton icon="times" onClick={close}/>
                    </div>
                }
            </div>
        </LayoutPortal>;
    }
}
