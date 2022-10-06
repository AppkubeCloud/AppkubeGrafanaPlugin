import * as React from 'react';

export class PreparePolicy extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <div className="d-inline-block width-100 account-setup-tab-contents">
                <div className="contents">
                    <strong style={{ paddingBottom: '20px' }}>Prepare IAM Policy for Synectiks Monitoring</strong>
                    <p>
                        Login to your AWS console (<a>aws.amazon.com</a>) <br />
                        Click ‘Services’ and select the IAM service <br />
                        Select ‘Policies’ and click on ‘Create Policy’ button <br />
                        Select the ‘JSON’ tab <br />
                        Copy and paste in this <a>policy document</a> <br />
                        Click ‘Review Policy’ <br />
                        Name the policy ‘Synectiks Monitoring-readonly-policy’ and click on ‘Create Policy’ <br />
                        Click again on ‘Create Policy’ button <br />
                        Select the ‘JSON’ tab <br />
                        Copy and paste in this <a>policy document</a><br />
                        Name the policy ‘Synectiks Monitoring-write-policy’ and click on ‘Create Policy’ <br />
                        Click on ‘<a>NEXT</a>‘
                    </p>
                </div>            
            </div>
        );
    }
}