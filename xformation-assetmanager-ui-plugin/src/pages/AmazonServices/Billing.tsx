import * as React from 'react';

export class Billing extends React.Component<any, any>{
    CreateNewOURef: any;
    constructor(props: any) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="displayed-here">
                <p>Billing details will be displayed here</p>
            </div>
        );
    }
}