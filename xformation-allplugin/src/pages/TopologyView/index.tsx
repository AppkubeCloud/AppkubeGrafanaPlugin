import * as React from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Breadcrumbs } from '../Breadcrumbs';
import { images } from '../../img';

export class TopologyView extends React.Component<any, any> {
  breadCrumbs: any;
  constructor(props: any) {
    super(props);
    this.state = {
      modal: false,
    };
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
  toggle = async () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    const { modal } = this.state;
    return (
      <>
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
                        <img src={images.MobileApps} alt="" style={{ maxWidth: '24px' }} />
                      </i>
                      <span>Mobile apps</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="">
                      <i className="icon">
                        <img src={images.Applications} alt="" style={{ maxWidth: '24px' }} />
                      </i>
                      <span>Applications</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="">
                      <i className="icon">
                        <img src={images.Dashboard} alt="" style={{ maxWidth: '24px' }} />
                      </i>
                      <span>Dashboard</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="">
                      <i className="icon">
                        <img src={images.Reports} alt="" style={{ maxWidth: '24px' }} />
                      </i>
                      <span>Reports</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="">
                      <i className="icon">
                        <img src={images.Query} alt="" style={{ maxWidth: '24px' }} />
                      </i>
                      <span>Query</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="">
                      <i className="icon">
                        <img src={images.Api} alt="" style={{ maxWidth: '24px' }} />
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
                          <a href="#" onClick={() => this.toggle()}>
                            Load Balancer
                          </a>
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
        <Modal isOpen={modal} toggle={this.toggle} className="modal-topology-view">
          <ModalHeader toggle={this.toggle}>{'List & Act'}</ModalHeader>
          <ModalBody style={{ height: 'calc(80vh - 50px)', overflowY: 'auto', overflowX: 'hidden' }}>
            <div className="cost-score">
              <div className="header">
                <div className="total-cost-text">Total Cost : $80</div>
                <div className="total-cost-text">Quality Score : 80%</div>
              </div>
              <div className="body">
                <div className="row">
                  <div className="col-md-4">
                    <div className="content">
                      <label>Performance:</label>
                      <p>
                        97% <span className="green"></span>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="content">
                      <label>Availability:</label>
                      <p>
                        77% <span className="green"></span>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="content">
                      <label>Reliability:</label>
                      <p>
                        39% <span className="red"></span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="content">
                      <label>Security:</label>
                      <p>
                        97% <span className="red"></span>
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="content">
                      <label>End Usage:</label>
                      <p>
                        59% <span className="green"></span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="table">
              <div className="thead">
                <div className="row">
                  <div className="col-md-3">
                    <span className="first">Service Type</span>
                  </div>
                  <div className="col-md-3">
                    <span>Services</span>
                  </div>
                  <div className="col-md-3">
                    <span>Service Type</span>
                  </div>
                  <div className="col-md-3">
                    <span>Location</span>
                  </div>
                </div>
              </div>
              <div className="tbody">
                <div className="row">
                  <div className="col-md-3">
                    <strong>App Services</strong>
                  </div>
                  <div className="col-md-9">
                    <div className="row">
                      <div className="col-md-4">
                        <span>App Service 1</span>
                      </div>
                      <div className="col-md-4">
                        <span>Common Service</span>
                      </div>
                      <div className="col-md-4">
                        <span>Kubernetes Cluster</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <span>App Service 2</span>
                      </div>
                      <div className="col-md-4">
                        <span>Common Service</span>
                      </div>
                      <div className="col-md-4">
                        <span>Kubernetes Cluster</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <span>App Service 3</span>
                      </div>
                      <div className="col-md-4">
                        <span>Business Service</span>
                      </div>
                      <div className="col-md-4">
                        <span>Cloud Managed Services</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <span>App Service 4</span>
                      </div>
                      <div className="col-md-4">
                        <span>Business Service</span>
                      </div>
                      <div className="col-md-4">
                        <span>Cloud Managed Services</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tbody">
                <div className="row">
                  <div className="col-md-3">
                    <strong>Data Services</strong>
                  </div>
                  <div className="col-md-9">
                    <div className="row">
                      <div className="col-md-4">
                        <span>Data Service 1</span>
                      </div>
                      <div className="col-md-4">
                        <span>Business Service</span>
                      </div>
                      <div className="col-md-4">
                        <span>Cloud Managed Services</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <span>Data Service 2</span>
                      </div>
                      <div className="col-md-4">
                        <span>Common Service</span>
                      </div>
                      <div className="col-md-4">
                        <span>Lambda</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <span>Data Service 3</span>
                      </div>
                      <div className="col-md-4">
                        <span>Common Service</span>
                      </div>
                      <div className="col-md-4">
                        <span>Lambda</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </>
    );
  }
}
