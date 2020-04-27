import './AppErrorBoundary.less';
import React from 'react';
import {translate} from '../../i18n';
import Popup from '../../components/popup/Popup';
import Button from '../../components/button/Button';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false
        };
    }

    componentDidCatch(error, info) {
        this.setState({hasError: true});

        console.log(error);
        console.log('error info', info);
    }

    render() {
        const {children} = this.props;
        const {hasError} = this.state;

        if (hasError) {
            return <div className="app-error-boundary">
                <Popup
                    name="app-error-boundary"
                    title={translate('something_went_wrong')}
                    buttons={[
                        <Button
                            size="small"
                            title={translate('Reload')}
                            onClick={() => {
                                window.location.reload();
                            }}
                        />
                    ]}
                >
                    <div className="apology">
                        <p>{translate('apology_for_unexpected_error')}</p>
                        <p>{translate('Please try to reload the page to continue.')}</p>
                    </div>
                </Popup>
            </div>;
        }

        return children;
    }
}