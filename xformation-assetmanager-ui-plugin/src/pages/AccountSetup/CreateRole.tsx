import * as React from 'react';

export class CreateRole extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            displayName: '',
            accessKey: '',
            secretKey: '',
            accountId: '',
            isSubmitted: false,
        };
    }

    validate = (submitted: any) => {
        const validObj = {
            isValid: true,
            message: ""
        };
        let isValid = true;
        const retData = {
            displayName: validObj,
            accessKey: validObj,
            secretKey: validObj,
            accountId: validObj,
            isValid
        };
        if (submitted) {
            const { displayName, accessKey, secretKey, accountId } = this.state;
            if (!displayName) {
                retData.displayName = {
                    isValid: false,
                    message: ("Display is required")
                };
                isValid = false;
            }
            if (!accessKey) {
                retData.accessKey = {
                    isValid: false,
                    message: ("Access key Id is required")
                };
                isValid = false;
            }
            if (!secretKey) {
                retData.secretKey = {
                    isValid: false,
                    message: ("Secrete key Id is required")
                };
                isValid = false;
            }
            if (!accountId) {
                retData.accountId = {
                    isValid: false,
                    message: ("Account Id is required")
                };
                isValid = false;
            }
        }
        retData.isValid = isValid;
        return retData;
    }

    handleStateChange = (e: any) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    }

    getRoleData = () => {
        this.setState({
            isSubmitted: true
        });
        const errorData = this.validate(true);
        const {displayName, accessKey, secretKey, accountId} = this.state;
        return {
            displayName,
            accessKey,
            secretKey,
            accountId,
            isValid: errorData.isValid
        };
    };

    render() {
        const { displayName, accessKey, secretKey, isSubmitted, accountId } = this.state;
        const errorData = this.validate(isSubmitted);
        return (
            <div className="d-inline-block width-100 account-setup-tab-contents">
                <div className="row">
                    <div className="col-md-9 col-sm-12">
                        <div className="account-setup-left-contents">
                            <div className="contents">
                                <strong style={{ paddingBottom: '20px' }}>Create IAM user for Synectiks Monitoring</strong>
                                <p>
                                    Login to AWS console (<a>aws.amazon.com</a>)<br />
                                Click ‘<strong>Services</strong>‘ on the top and ‘<strong>IAM</strong>‘ in the dropdown.<br />
                                Click ‘users‘ on the left pane<br />
                                Create New User: '<strong>Synectiks Monitoring</strong>', make sure to provide programmatic access only<br />
                                Click on '<strong>Next: Permission</strong>'<br />
                                Select Attach existing policies directly and select the following policies:
                                </p>
                                <ul>
                                    <li>‘SecurityAudit’ (AWS managed policy)</li>
                                    <li>‘Synectiks Monitoring-readonly-policy’ That we created before. You can search for</li>
                                    <li>‘Synectiks Monitoring’ in the filter</li>
                                    <li>‘Synectiks Monitoring-write-policy’ That we created before</li>
                                </ul>
                                <p>
                                    Click on the ‘<strong>Next: Review</strong>‘ button<br />
                                Verify you selected only programmatic access, then click on <strong>Create User</strong><br />
                                Enter the values of "Access key ID" and the "Secret access key" in the right text boxes<br />
                                (save the secret key, you may need it in the future)<br />
                                Click on <a>NEXT</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-12">
                        <div className="account-setup-right-contents">
                            <div className="form-group">
                                <label>Display Name</label>
                                <input className="form-control" type="text" name="displayName" value={displayName} placeholder="Account Name" onChange={this.handleStateChange}></input>
                            </div>
                            <span>{errorData.displayName.message}</span>
                            <div className="form-group">
                                <label>Access Key Id</label>
                                <input className="form-control" type="text" name="accessKey" value={accessKey} placeholder="AWS Access Key" onChange={this.handleStateChange}></input>
                            </div>
                            <span>{errorData.accessKey.message}</span>
                            <div className="form-group">
                                <label>Secrete Key</label>
                                <input className="form-control" type="text" name="secretKey" value={secretKey} placeholder="AWS Secret Key" onChange={this.handleStateChange}></input>
                            </div>
                            <div className="form-group">
                                <label>Account Id</label>
                                <input className="form-control" type="text" name="accountId" value={accountId} placeholder="AWS Account Id" onChange={this.handleStateChange}></input>
                            </div>
                            <span>{errorData.secretKey.message}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}