import * as React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../../Breadcrumbs';
import { configFun } from '../../../config';
import { Wizard } from './Wizard';
import { OperationMode } from './OperationMode';
import { PreparePolicy } from './PreparePolicy';
import { CreateRole } from './CreateRole';
import { Ou } from './Ou';
import { Review } from './Review';
import { RestService } from '../../_service/RestService';
import { PLUGIN_BASE_URL } from '../../../constants';

export class AccountSetup extends React.Component<any, any> {
    breadCrumbs: any;
    steps: any;
    roleRef: any;
    ouRef: any;
    reviewRef: any;
    wizardRef: any;
    config: any;
    constructor(props: any) {
        super(props);
        this.state = {
            organizationList: null ,
            selection: [],
            name: "",
            accessKey: "",
            secretKey: ""
        };
        this.roleRef = React.createRef();
        this.ouRef = React.createRef();
        this.wizardRef = React.createRef();
        this.reviewRef = React.createRef();
        this.steps = [
            {
                name: "Operation Mode",
                component: () => <OperationMode />
            },
            {
                name: "Prepare Policy",
                component: () => <PreparePolicy />
            },
            {
                name: "Create Role",
                component: () => <CreateRole ref={this.roleRef} onChangeInput={this.onChangeInput} />
            },
            {
                name: "OU",
                component: () => <Ou ref={this.ouRef} onChangeSelection={this.onChangeSelection} organizationList={this.state.organizationList} getOrganizationList={this.getOrganizationList} />
            },
            {
                name: "Review",
                component: () => <Review ref={this.reviewRef} selectedOrg={this.ouRef.current !== null ? this.ouRef.current.getSelection() : null} selectedData={this.roleRef.current !== null ? this.roleRef.current.getRoleData() : null}/>
            }
        ];
        this.breadCrumbs = [
            {
                label: "Home",
                route: `/`
            },
            {
                label: "Assets | Environments",
                isCurrentPage: true
            }
        ];
        this.config = configFun(props.meta.jsonData.apiUrl, props.meta.jsonData.mainProductUrl, props.meta.jsonData.grafanaUrl);
    }
    onChangeSelection = (selection: any) => {
        this.setState({
            selection
        });
    };
    onChangeInput = (name: any, accessKey: any, secretKey: any) => {
        this.setState({
            name,
            accessKey,
            secretKey
        });
    };

    getSelectedData = () =>{
        return {
            name: this.state.name,
            accessKey: this.state.accessKey,
            secretKey: this.state.secretKey,
        }
    }

    onSubmit = () => {
        const selectionData = this.ouRef.current.getSelection();
        const roleData = this.roleRef.current.getRoleData();
        if (!roleData.isValid) {
            this.wizardRef.current.setActiveStep(2);
        } else if (!selectionData[0] || !selectionData[1]) {
            this.wizardRef.current.setActiveStep(3);
        } else {
            const sendData = {
                "name": roleData.displayName,
                "accessKey": roleData.accessKey,
                "secretKey": roleData.secretKey,
                "accountId": roleData.accountId,
                "orgId": selectionData[0],
                "ouId": selectionData[1]
            };
            RestService.add(this.config.ADD_ACCOUNT, sendData).then(
                (response: any) => {
                    alert("Account created")
                });
        }
    }
    async componentDidMount() {
        try {
            var usr = localStorage.getItem(`userInfo`); 
            if(usr !== null){
                const user = JSON.parse(usr);
                await RestService.getData(this.config.GET_USER_ORGANIZATION+'/'+user.info.credentials.name, null, null).then(
                (response: any) => {
                    this.setState({
                        organizationList: response,
                    });
                });    
            }
            
        } catch (err) {
            console.log("Error: ", err);
        }
    }
    getOrganizationList = () => {
        var usr = localStorage.getItem(`userInfo`); 
        
        if(usr !== null){
            const user = JSON.parse(usr);
            RestService.getData(this.config.GET_USER_ORGANIZATION+'/'+user.info.credentials.name, null, null).then(
            (response: any) => {
                this.setState({
                    organizationList: response,
                });
            });    
        }
    }
    render() {
        return (
            <div className="asset-container">
                <Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="PERFORMANCE MANAGEMENT" />
                <div className="accountsetup-page-container">
                    <div className="common-container">
                        <div className="row">
                            <div className="col-lg-9 col-md-9 col-sm-12">
                                <div className="asset-heading">
                                    Environments
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12">
                                <div className="float-right common-right-btn ">
                                    <Link to={`${PLUGIN_BASE_URL}/home`} className="asset-white-button min-width-inherit">
                                        <i className="fa fa-arrow-circle-left"></i>&nbsp;&nbsp;
                                        Back
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="common-container">
                        <Wizard ref={this.wizardRef} steps={this.steps} submitPage={this.onSubmit} />
                    </div>
                </div>
            </div>
        );
    }
};