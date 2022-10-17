import * as React from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "../../Breadcrumbs";
import { configFun } from "../../../config";
import { images } from "../../../img";
// import { RestService } from "../_service/RestService";
// import *as dateFormat from "dateformat";
import { Wizard } from "./Wizard";
import { DiscoveredAssets } from "./DiscoveredAssets";
import { Applications } from './Applications';
import { Billing } from "./Billing";
import { ThreatAndSecurityEvents } from "./ThreatAndSecurityEvents";
import { CompliancePolicies } from "./CompliancePolicies";
import { Alerts } from "./Alerts";
import { Inputs } from "./Inputs";
import { ROUTES } from '../../../constants';
import { prefixRoute } from '../../../utils/utils.routing';

export class AmazonServices extends React.Component<any, any> {
  breadCrumbs: any;
  dateFormat: any;
  steps: any;
  config: any;
  constructor(props: any) {
    super(props);
    this.state = {
      display_detail: true,
      displaygetEnvironmentData: null,
      cloudAssets: [],
    };
    this.breadCrumbs = [
      {
        label: "Home",
        route: `/`,
      },
      {
        label: "Assets | Environments",
        isCurrentPage: true,
      },
    ];
    this.steps = [
      {
        name: "Discovered Assets",
        component: <DiscoveredAssets {...props}/>,
      },
      {
        name: "Applications",
        component:  <Applications {...props} />,
      },
      {
        name: "Billing",
        component: <Billing />,
      },
      {
        name: "Threat and Security Events",
        component: <ThreatAndSecurityEvents />,
      },
      {
        name: "Compliance Policies",
        component: <CompliancePolicies />,
      },
      {
        name: "Alerts",
        component: <Alerts />,
      },
      {
        name: "Inputs",
        component: <Inputs {...props}/>,
      },
    ];
    this.config = configFun(props.meta.jsonData.apiUrl, props.meta.jsonData.mainProductUrl, props.meta.jsonData.grafanaUrl);
  }

  submitPage = () => {

  }

  showHideDetail = () => {
    const { display_detail } = this.state;
    this.setState({
      display_detail: !display_detail,
    });
  };

  async componentDidMount() {
  }

  displayAwsData() {
    const { displaygetEnvironmentData } = this.state;
    let retData = [];

    let row = displaygetEnvironmentData;
    if (row.cloudType.toLowerCase() === "AWS".toLowerCase()) {
      //   row.date = dateFormat(row.createdOn)
      const { display_detail } = this.state;
      retData.push(
        <div>
          <div className="heading">
            <span>
              <img src={images.awsLogo} alt="" />
            </span>
            <h2>Amazon Web Services</h2>
            <div className="icon float-right" onClick={this.showHideDetail}>
              <i
                className={display_detail ? "fa fa-minus" : "fa fa-plus"}
                aria-hidden="true"
              ></i>
            </div>
          </div>
          {display_detail && (
            <div className="service-content">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">Account Holder Name</div>
                    </div>
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">
                        <span>{row.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">Organisation</div>
                    </div>
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">
                        <span>
                          {row.organizationName && row.organizationName}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">Account Number</div>
                    </div>
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">
                        <span>{row.accountId}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">Organisation Unit</div>
                    </div>
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">
                        <span>
                          {row.organizationalUnit &&
                            row.organizationalUnit.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">
                        Total Online Instances
                      </div>
                    </div>
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">0</div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">
                        Full Protection Security Group
                      </div>
                    </div>
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">0</div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">Cloud Guard ID</div>
                    </div>
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">
                        e5b82995-c0fc-729d-a67b-926r81a5963d
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">
                        Read Only Security Group
                      </div>
                    </div>
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">0</div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">Added At</div>
                    </div>
                    <div className="col-gl-4 col-md-6 col-sm-6 col-xs-12">
                      <div className="services-added">{row.createdOn}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    return retData;
  }

  render() {
    return (
      <div className="asset-container">
        <Breadcrumbs
          breadcrumbs={this.breadCrumbs}
          pageTitle="PERFORMANCE MANAGEMENT"
        />
        <div className="service-container">
          <div className="common-container">
            <div className="row">
              <div className="col-lg-9 col-md-9 col-sm-12">
                <div className="asset-heading">Environments</div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-12">
                <div className="float-right common-right-btn">
                  <Link
                    to={prefixRoute(ROUTES.AssetManager)}
                    className="asset-white-button min-width-inherit m-r-0"
                  >
                    <i className="fa fa-arrow-circle-left"></i>&nbsp;&nbsp; Back
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="common-container border-bottom-0 p-b-0">
            {this.state.displaygetEnvironmentData && (
              <div className="service-full-container">
                {/* {this.displayAwsData()} */}
              </div>
            )}
          </div>
          <div className="common-container border-bottom-0">
            <Wizard steps={this.steps} submitPage={this.submitPage} />
          </div>
        </div>
      </div>
    );
  }
}
