import * as React from 'react';

export class Entity extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="storage-section">
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-12">
                        <div className="network-boxs">
                            <ul>
                                <li>
                                    <a>
                                        <i className="fa fa-caret-right" aria-hidden="true"></i>
                                        Storage
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <i className="fa fa-caret-right" aria-hidden="true"></i>
                                        Network
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <i className="fa fa-caret-right" aria-hidden="true"></i>
                                        Configuration
                                    </a>
                                </li>
                                <li className="last">
                                    <a>
                                        <i className="fa fa-caret-right" aria-hidden="true"></i>
                                        External Storage
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-12">
                        <div className="storage-details text-center">
                            <h4>Storage details will be displayed here</h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}