import * as React from 'react';

export class OperationMode extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <div className="d-inline-block width-100 account-setup-tab-contents">
                <h4>Select Operation Mode</h4>
                <div className="contents">
                    <strong>Full-Protection (Read/Write) Mode</strong>
                    <p>In the Full-Protection(Read/Write) Mode, CloudGuard can be used to actively manage your security posture and enforce best practices.</p>
                </div>
                <div className="contents">
                    <strong>Available in Full-Protection (R/W) Mode:</strong>
                    <ul>
                        <li>Dynamic Access Leases - time-limited, on-demand resource access</li>
                        <li>Security group management console to edit policies in-place</li>
                        <li>Tamper Protection and Region Lock for active enforcement</li>
                        <li>Reusable policy objects such as IP Lists and DNS Objects</li>
                        <li>CloudGuard Clarity for visualization of network security</li>
                        <li>Change notifications</li>
                        <li>Audit trail</li>
                        <li>Compliance reports</li>
                        <li>Alerts</li>
                        <li>vPovlicy reports</li>
                    </ul>
                </div>
                <div className="contents">
                    <strong>When to Choose Full-Protection (R/W) Mode</strong>
                    <ul>
                        <li>You want to use Synectiks Monitoring as your system of authority for security management</li>
                        <li>You want to use Synectiks Monitoring active management and enforcement capabilities to maintain a closed-by-default security posture</li>
                    </ul>
                </div>
                <div className="contents">
                    <p>Note that even when you are using Synectiks Monitoring Full-Protection (Read/Write) Mode you'll still be able to set individual security groups to Monitor (Read-Only) Mode</p>  
                </div>              
            </div>
        );
    }
}