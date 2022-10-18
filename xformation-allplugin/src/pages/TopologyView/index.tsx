import * as React from 'react';
import { Breadcrumbs } from '../Breadcrumbs';
import { Link } from 'react-router-dom';
import { images } from '../../img';

export class TopologyView extends React.Component<any, any> {
  breadCrumbs: any;
  constructor(props: any) {
    super(props);
    this.state = {};
    this.breadCrumbs = [
      {
        label: 'Home',
        route: `/`,
      },
      {
        label: 'Topology view',
        isCurrentPage: true,
      },
    ];
  }

  render() {
    // const state = this.state;
    return (
      <div className="topology-view-container">
        <Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="TOPOLOGY VIEW" />
        <div className="common-container bottom-border-none">
          <div className="row">
            <div className="col-lg-9 col-md-9 col-sm-12">
              <div className="topology-heading">
                Topology view
                <Link to={'#'} className="asset-white-button min-width-inherit">
                  <img src={images.Jobs} alt="" style={{ maxWidth: '15px' }} />
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12">
              <div className="search-box">
                <i className="fa fa-search" aria-hidden="true"></i>
                <input type="text" className="input-group-text" placeholder={'Search'} />
              </div>
            </div>
          </div>
        </div>
        <div className="common-container bottom-border-0 p-0">
          <div className="topology-view-contains">
            <div className="topology-left-nav">
              <ul>
                <li>
                  <a href="#" className="">
                    <i className="icon">
                      <img src={images.MobileApps} alt="" style={{ maxWidth: '37px' }} />
                    </i>
                    <span>Mobile apps</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="">
                    <i className="icon">
                      <img src={images.Applications} alt="" style={{ maxWidth: '37px' }} />
                    </i>
                    <span>Applications</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="">
                    <i className="icon">
                      <img src={images.Dashboard} alt="" style={{ maxWidth: '37px' }} />
                    </i>
                    <span>Dashboard</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="">
                    <i className="icon">
                      <img src={images.Reports} alt="" style={{ maxWidth: '37px' }} />
                    </i>
                    <span>Reports</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="">
                    <i className="icon">
                      <img src={images.Query} alt="" style={{ maxWidth: '37px' }} />
                    </i>
                    <span>Query</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="">
                    <i className="icon">
                      <img src={images.Api} alt="" style={{ maxWidth: '37px' }} />
                    </i>
                    <span>API</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="topology-buttons">
              <ul>
                <li className="waf">
                  <span>WAF</span>
                </li>
                <li className="api-gateway">
                  <span>API Gateway</span>
                </li>
              </ul>
            </div>
            <div className="app-services">
              <div className="heading">App Services</div>
              <div className="app-services-container">
                <div className="services-nav">
                  <ul>
                    <li className="orchestration">
                      <span>Orchestration</span>
                    </li>
                    <li className="business-service">
                      <span>Business Service</span>
                    </li>
                    <li className="common-service">
                      <span>Common Service</span>
                    </li>
                  </ul>
                </div>
                <div className="services-contains">
                  <div className="contains">
                    <div className="sub-heading">Cluster</div>
                    <ul className="orchestration-buttons">
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                    </ul>
                    <ul className="business-service-buttons">
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                    </ul>
                    <ul className="common-service-buttons">
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                    </ul>
                  </div>
                  <div className="contains">
                    <div className="sub-heading">Service less</div>
                    <ul className="orchestration-buttons">
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                    </ul>
                    <ul className="business-service-buttons">
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                    </ul>
                    <ul className="common-service-buttons">
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                    </ul>
                  </div>
                  <div className="contains">
                    <div className="sub-heading">Cloud Managed</div>
                    <ul className="orchestration-buttons">
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                    </ul>
                    <ul className="business-service-buttons">
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                    </ul>
                    <ul className="common-service-buttons">
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                      <li>
                        <a href="#">Load Balancer</a>
                      </li>
                      <li>
                        <a href="#">Service Mesh</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="data-services-right">
              <div className="data-heading">
                Data <br /> Services
              </div>
              <div className="data-services-buttons">
                <div className="sub-heading">Clustered</div>
                <ul>
                  <li>
                    <a href="#">
                      <i>
                        <img src={images.DataServicesIcon} alt="" style={{ maxWidth: '56px' }} />
                      </i>
                      <span>SQL DB</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i>
                        <img src={images.DataServicesIcon} alt="" style={{ maxWidth: '56px' }} />
                      </i>
                      <span>Mongo DB</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="data-services-buttons">
                <div className="sub-heading">Clustered</div>
                <ul>
                  <li>
                    <a href="#">
                      <i>
                        <img src={images.DataServicesIcon} alt="" style={{ maxWidth: '56px' }} />
                      </i>
                      <span>SQL DB</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i>
                        <img src={images.DataServicesIcon} alt="" style={{ maxWidth: '56px' }} />
                      </i>
                      <span>Mongo DB</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
