import * as React from 'react';
import { RestService } from '../_service/RestService';
import { configFun } from '../../config';

export class Inputs extends React.Component<any, any>{
    CreateNewOURef: any;
    config: any;
    constructor(props: any) {
        super(props);
        this.state = {
            inputList: [],
        };
        this.config = configFun(props.meta.jsonData.apiUrl, props.meta.jsonData.mainProductUrl, props.meta.jsonData.grafanaUrl);
    }

    componentDidMount() {
        const queryPrm = new URLSearchParams(this.props.location.search);
        const accountId = queryPrm.get("accountId");
        this.getDataSourceInstances(accountId);
        this.setState({
            accountId
        });
    }

    getDataSourceInstances = (accountId: any) => {
        try {
            RestService.getDataWithAuth(`${this.config.GET_ALL_DATASOURCE}?accountId=${accountId}`, null, null).then((response: any) => {
                // this.setState({
                //     inputList: [{ "id": 37, "uid": "q0bJZTnnz", "orgId": 1, "name": "www", "type": "cloudwatch", "typeName": "CloudWatch", "typeLogoUrl": "public/app/plugins/datasource/cloudwatch/img/amazon-web-services.png", "access": "proxy", "url": "", "password": "", "user": "", "database": "", "basicAuth": false, "isDefault": false, "jsonData": { "authType": "keys", "defaultRegion": "us-gov-east-1" }, "readOnly": false, "accountID": "9876", "tenantID": "78", "cloudType": "" }]
                // });
                if(response && response.length > 0){
                    this.setState({
                        inputList: response,
                    });
                }
            });
        } catch (err) {
            console.log('Loading Asstes failed. Error: ', err);
        }
    };

    renderInputs = () => {
        const { inputList } = this.state;
        let retData = inputList.map((input: any) => {
            return (
                <tr key={`input-${input.id}`}>
                    <td>{input.name}</td>
                    <td>{input.cloudType}</td>
                    <td>{input.inputType}</td>
                    <td>0</td>
                    <td>Active</td>
                </tr>
            );
        });
        if (retData.length === 0) {
            retData = <tr>
                <td colSpan={5}>There are no inputs available</td>
            </tr>;
        }
        return retData;
    };

    render() {
        return (
            <>
                <div className="Filters-box">
                    <p>Select and add Filters</p>
                    <span><i className="fa fa-angle-down" aria-hidden="true"></i></span>
                </div>
                <div className="showing-export">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            <div className="showing-heading">
                                Showing results 0 of 0
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                            <div className="export-files">
                                <span><i className="fa fa-clock-o"></i></span>
                                <p>Recent</p>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                            <div className="search-box form-group">
                                <input type="text" className="control-form" placeholder="Search" value="" /><button><i className="fa fa-search"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-container">
                    <table width="100%" className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Source of input</th>
                                <th>Type of input</th>
                                <th>Dashboards</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderInputs()}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}