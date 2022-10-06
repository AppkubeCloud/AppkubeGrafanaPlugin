import * as React from 'react';
import { Wizard } from './Wizard';
import { VerifyInputs, EnableDashboard, Preview, VerifyAndSave } from './MonitorComponents';
import { RestService } from '../../_service/RestService';
import { configFun } from '../../../config';
import AlertMessage from '../../Components/AlertMessage';
import { CommonService } from '../../_common/common';

const VIEW_TYPE = {
    VIEW_DASHBOARDS: 'view_dashboard',
    NO_DASHBOARDS: 'no_dashboards',
    SHOW_WIZARD: 'show_wizard'
};

export class Monitor extends React.Component<any, any>{
    steps: any;
    verifyInputsRef: any;
    enableDashboardRef: any;
    verifyAndSaveRef: any;
    previewRef: any;
    wizardRef: any;
    config: any;
    constructor(props: any) {
        super(props);
        this.state = {
            isAlertOpen: false,
            severity: null,
            message: null,
            isSuccess: true,
            activeDashboard: 0,
            iFrameLoaded: false,
            viewJson: [],
            dashboardData: [],
            isLoading: false,
            presentView: VIEW_TYPE.NO_DASHBOARDS,
            showAside: true,
        };
        this.verifyInputsRef = React.createRef();
        this.enableDashboardRef = React.createRef();
        this.wizardRef = React.createRef();
        this.verifyAndSaveRef = React.createRef();
        this.previewRef = React.createRef();
        this.steps = [
            {
                name: "Verify Inputs",
                component: () => <VerifyInputs ref={this.verifyInputsRef} apiKey={props.apiKey} {...props}/>
            },
            {
                name: "Enable Dashboard",
                component: () => <EnableDashboard ref={this.enableDashboardRef} />
            },
            {
                name: "Preview",
                component: () => <Preview ref={this.previewRef} {...props}/>
            },
            {
                name: "Verify and save",
                component: () => <VerifyAndSave ref={this.verifyAndSaveRef} {...this.props} disableSubmitButton={this.disableSubmitButton} />
            }
        ];
        this.config = configFun(props.meta.jsonData.apiUrl, props.meta.jsonData.mainProductUrl, props.meta.jsonData.grafanaUrl);
    }

    componentDidMount() {
        if (this.props.dashboardData) {
            this.setState({
                dashboardData: JSON.parse(JSON.stringify(this.props.dashboardData))
            });
        }
        if (this.props.viewJson) {
            const { apiKey } = this.props;
            const viewJson = JSON.parse(JSON.stringify(this.props.viewJson));
            if (viewJson && viewJson[apiKey] && viewJson[apiKey].length > 0) {
                this.setState({
                    viewJson: viewJson[apiKey],
                    presentView: VIEW_TYPE.VIEW_DASHBOARDS
                });
            }
        }
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (JSON.stringify(prevProps.dashboardData) !== JSON.stringify(this.props.dashboardData)) {
            const dashboardData = JSON.parse(JSON.stringify(this.props.dashboardData));
            this.setState({
                dashboardData
            });
            console.log("data trying to be set");
            this.verifyInputsRef.current && this.verifyInputsRef.current.setDashboardData(dashboardData);
        }
        if (JSON.stringify(prevProps.viewJson) !== JSON.stringify(this.props.viewJson)) {
            const { apiKey } = this.props;
            const viewJson = JSON.parse(JSON.stringify(this.props.viewJson));
            if (viewJson && viewJson[apiKey] && viewJson[apiKey].length > 0) {
                this.setState({
                    viewJson: viewJson[apiKey],
                    presentView: VIEW_TYPE.VIEW_DASHBOARDS
                });
            }
        }
    }
    onSubmit = async () => {
        if (this.state.isLoading) {
            this.setState({
                isAlertOpen: true,
                message: 'Dashboards are being imported. Please wait..',
                severity: 'warning',
                isSuccess: false
            });
            return;
        }
        const dashbaordJSONArray = this.verifyAndSaveRef.current.getDashboardJSONData();
        if (!dashbaordJSONArray) {
            this.setState({
                isAlertOpen: true,
                message: 'Dashboard json is loading, wait for a while',
                severity: 'warning',
                isSuccess: false
            });
            return;
        }
        if (dashbaordJSONArray.length === 0) {
            this.wizardRef.current.setActiveStep(0);
            this.setState({
                isAlertOpen: true,
                message: 'Please select dashboard',
                severity: 'warning',
                isSuccess: false
            });
            return;
        }
        const responseArray: any = [];
        this.setState({
            isLoading: true
        });
        const accountId = CommonService.getParameterByName("accountId", window.location.href);
        dashbaordJSONArray.forEach((dashboard: any) => {
            const dataJs = {
                // title: dashboard.title,
                // slug: dashboard.slug,
                // uid: dashboard.uid,
                // data: dashboard,
                Dashboard: JSON.parse(dashboard.data),
                UserId: 0,
                Overwrite: false,
                Message: "",
                OrgId: 1,
                PluginId: "",
                FolderId: 0,
                IsFolder: false,
            };
            dataJs.Dashboard.id = 0;
            dataJs.Dashboard.uid = "";
            dataJs.Dashboard.slug = dashboard.inputType + "_" + dashboard.elementType + "_" + Math.random().toString(36).substring(2, 7);
            dataJs.Dashboard.title = dataJs.Dashboard.slug;
            var json = JSON.stringify(dataJs);
            var reqOpt = RestService.optionWithAuthentication(json, 'POST');
            try {
                fetch(this.config.ADD_DASHBOARDS_TO_GRAFANA, reqOpt)
                    .then(response => response.json())
                    .then(result => {
                        if (!result.message) {
                            responseArray.push({
                                ...result,
                                dashboardCatalogueId: dashboard.dashboardCatalogueId,
                                cloudElement: dashboard.elementType,
                                accountId: accountId,
                                cloudElementId: dashboard.cloudElementId
                            });
                            if (responseArray.length === dashbaordJSONArray.length) {
                                this.sendViewJSON(responseArray);
                            }
                        } else {
                            this.setState({
                                isAlertOpen: true,
                                message: 'There was some error while importing dashboard',
                                severity: 'error',
                                isSuccess: true,
                                isLoading: false
                            });
                        }
                    }, error => {
                        responseArray.push(null);
                        if (responseArray.length === dashbaordJSONArray.length) {
                            this.setState({
                                isAlertOpen: true,
                                message: 'There was some error while importing dashboard',
                                severity: 'error',
                                isSuccess: true,
                                isLoading: false
                            });
                        }
                    })
            }
            catch (e) {
                this.setState({
                    isAlertOpen: true,
                    message: 'There was some error while importing dashboard',
                    severity: 'error',
                    isSuccess: true,
                    isLoading: false
                });
            }
        });
    };

    disableSubmitButton = (value: any) => {
        this.setState({ isLoading: value });
    }

    sendViewJSON = (responseArray: any) => {
        const { apiKey, serviceData } = this.props;
        const serviceId = serviceData.id;
        const result = {
            serviceId,
            [apiKey]: responseArray
        };
        var reqOpt = RestService.optionWithAuthentication(JSON.stringify(result), 'POST');
        try {
            fetch(this.config.ADD_VIEW_JSON_TO_GRAFANA, reqOpt)
                .then(response => response.json())
                .then(result => {
                    this.setState({
                        isAlertOpen: true,
                        message: 'Dashboards imported successfully',
                        severity: 'success',
                        isSuccess: false,
                        isLoading: false,
                        presentView: VIEW_TYPE.VIEW_DASHBOARDS
                    });
                    this.props.getAddedDashboards();
                }, error => {
                    this.setState({
                        isAlertOpen: true,
                        message: 'There was some issue while adding view',
                        severity: 'error',
                        isSuccess: false,
                        isLoading: false,
                    });
                })
        }
        catch (e) {
            this.setState({
                isAlertOpen: true,
                message: 'There was some issue while adding view',
                severity: 'error',
                isSuccess: false,
                isLoading: false,
            });
        }
    };

    handleCloseAlert = (e: any) => {
        this.setState({
            isAlertOpen: false,
            message: '',
            severity: ''
        })
    }

    renderDashboardList = () => {
        const { viewJson, activeDashboard } = this.state;
        if (viewJson) {
            const retData = [];
            for (let i = 0; i < viewJson.length; i++) {
                const dashboard = viewJson[i];
                retData.push(<div title={dashboard.slug} key={dashboard.uid} className={`dashboard-side-tab ${activeDashboard === i ? 'active' : ''}`} onClick={() => this.setState({ activeDashboard: i, iFrameLoaded: false })}>
                    {dashboard.slug}
                </div>);
            }
            return retData;
        }
        return [];
    };

    nextClick = (step: any) => {
        const dashboardData = this.verifyInputsRef.current.getSelectedDashboards();
        if (!dashboardData) {
            this.wizardRef.current.setActiveStep(0);
            this.setState({
                isAlertOpen: true,
                message: 'Please select the dashboard',
                severity: 'warning',
                isSuccess: false,
            });
            return;
        }
        this.setState({
            dashboardData,
            isLoading: false,
        });
        if (step === 1) {
            this.enableDashboardRef.current.setDashboardData(dashboardData);
        } else if (step === 2) {
            this.previewRef.current.setDashboardData(dashboardData);
        } else if (step === 3) {
            this.verifyAndSaveRef.current.setDashboardData(dashboardData);
        }
    }

    changeView = (view: any) => {
        this.setState({
            presentView: view
        }, () => {
            if (view === VIEW_TYPE.SHOW_WIZARD) {
                console.log("data trying to be set");
                this.verifyInputsRef.current && this.verifyInputsRef.current.setDashboardData(this.state.dashboardData);
            }
        });
    };

    onClickCollapseSideView = () => {
        this.setState({
            showAside: !this.state.showAside,
        });
    };

    render() {
        const { isAlertOpen, severity, message, iFrameLoaded, viewJson, activeDashboard, presentView, isLoading, showAside } = this.state;
        let activeDB = null;
        if (viewJson && viewJson[activeDashboard]) {
            activeDB = viewJson[activeDashboard];
        }
        return (
            <>
                <AlertMessage handleCloseAlert={this.handleCloseAlert} open={isAlertOpen} severity={severity} msg={message}></AlertMessage>
                {presentView === VIEW_TYPE.NO_DASHBOARDS && (
                    <>
                        <div className="performance-box">
                            <div className="performance-inner">
                                <strong>Monitoring is not enabled yet</strong>
                                <p>To endble Monitoring dashboards you will first have to configure the inputs for data collection</p>
                                <button className="asset-blue-button" onClick={() => this.changeView(VIEW_TYPE.SHOW_WIZARD)}>Enable Monitoring</button>
                            </div>
                        </div>
                        <div className="note-text">
                            <div className="note-text-inner">
                                <p><strong>Note:</strong> This screen will be displayed only for first time setup, if Inputs are already configured we will show list of dashboards as shown in last screen of this process flow</p>
                            </div>
                        </div>
                    </>
                )}
                {
                    presentView === VIEW_TYPE.VIEW_DASHBOARDS &&
                    <>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <button style={{ marginTop: "10px", float: "left", marginLeft: "10px", minWidth: "60px", padding: "4px", fontSize: "10px" }} onClick={this.onClickCollapseSideView} className="asset-blue-button m-b-0">{showAside ? 'Collapse' : 'Expand'}</button>
                            <button style={{ marginTop: "10px", float: "right", marginRight: "10px", minWidth: "60px", padding: "4px", fontSize: "10px" }} onClick={() => this.changeView(VIEW_TYPE.SHOW_WIZARD)} className="asset-blue-button m-b-0">Configure</button>
                        </div>
                        <div className="dashboard-view-container">
                            {
                                showAside ?
                                    <aside className="aside-container">{this.renderDashboardList()}</aside> : <></>
                            }
                            <div className="dashboard-view" style={{ width: showAside ? "80%" : "100%" }}>
                                {activeDB &&
                                    <>
                                        <iframe style={{ display: `${iFrameLoaded ? '' : 'none'}` }} src={`${this.config.IFRAME_URL}/justdashboard?uid=${activeDB.uid}&slug=${activeDB.slug}`} onLoad={() => { this.setState({ iFrameLoaded: true }) }}></iframe>
                                        <div style={{ textAlign: "center", display: iFrameLoaded ? 'none' : '', marginTop: "20px" }}>
                                            Dashboard is loading...
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </>
                }
                {
                    presentView === VIEW_TYPE.SHOW_WIZARD &&
                    <Wizard ref={this.wizardRef} steps={this.steps} submitPage={this.onSubmit} nextClick={this.nextClick} isDisabled={isLoading} />
                }

            </>
        );
    }
}