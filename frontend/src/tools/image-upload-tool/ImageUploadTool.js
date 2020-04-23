import './ImageUploadTool.less';
import React from 'react';
import Button from '../../components/button/Button';
import {translate} from "../../i18n/i18n";

export default class ImageUploadTool extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {onDone, onCancel} = this.props;

        return <div className="image-upload-tool">
            <h2>Image Upload Tool</h2>
            <Button
                title={translate('Done')}
                appearance="primary"
                onClick={() => {
                    onDone({
                        thumbnailUrl: '/img/car-black.jpg'
                    });
                }}
            />
            <Button
                title={translate('Cancel')}
                appearance="neutral"
                onClick={() => onCancel()}
            />
        </div>;
    }
}