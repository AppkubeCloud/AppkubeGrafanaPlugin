import * as React from 'react';
import { configFun } from '../../config';
export class Kubernetes extends React.Component<any, any> {
    breadCrumbs: any;
    config: any;
    constructor(props: any) {
        super(props);
        this.state = {
        };
        this.config = configFun(props.meta.jsonData.apiUrl, props.meta.jsonData.mainProductUrl, props.meta.jsonData.grafanaUrl);
    }

    render() {
        return (
            <div className="asset-container">
                <div className="service-container">
                    <iframe src={this.config.octantURL} frameBorder="0" width="100%" height="100%"></iframe>
                </div>
            </div>
        );
    }
};