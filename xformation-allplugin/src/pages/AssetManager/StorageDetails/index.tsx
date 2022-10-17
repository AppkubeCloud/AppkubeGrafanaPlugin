import * as React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../../Breadcrumbs';
import { Node } from './Node';
import { PLUGIN_BASE_URL } from '../../../constants';
import { CommonService } from '../../_common/common';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

export class StorageDetails extends React.Component<any, any> {
  breadCrumbs: any;
  constructor(props: any) {
    super(props);
    let viewId = CommonService.getParameterByName('viewId', window.location.href);
    let serviceData: any = localStorage.getItem('added-services');
    let activeViewIndex = -1;
    let viewName = '';
    const accountId = CommonService.getParameterByName('accountId', window.location.href);
    const cloudName = CommonService.getParameterByName('cloudName', window.location.href);
    if (viewId) {
      serviceData = localStorage.getItem('viewData');
      if (serviceData) {
        serviceData = JSON.parse(serviceData);
        for (let i = 0; i < serviceData.length; i++) {
          if (serviceData[i].id == viewId) {
            viewName = serviceData[i].viewName;
            serviceData = serviceData[i].services;
            activeViewIndex = i;
            break;
          }
        }
      } else {
        serviceData = [];
        props.history.push(`${PLUGIN_BASE_URL}/plugins/asset-manager/environments/amazon-services?accountId=${accountId}`);
      }
    } else {
      if (serviceData) {
        serviceData = JSON.parse(serviceData);
      } else {
        serviceData = [];
        props.history.push(`${PLUGIN_BASE_URL}/plugins/asset-manager/environments/amazon-services?accountId=${accountId}`);
      }
    }
    this.state = {
      activeTab: serviceData.length - 1,
      serviceDetails: serviceData,
      openView: false,
      viewName,
      isSubmitted: false,
      accountId: accountId,
      cloudName: cloudName,
      activeViewIndex,
      viewId,
    };
    this.breadCrumbs = [
      {
        label: 'Home',
        route: `/`,
      },
      {
        label: 'Assets | Environments',
        isCurrentPage: true,
      },
    ];
    console.log(serviceData);
  }

  setActiveTab = (activeTab: any) => {
    this.setState({
      activeTab,
    });
  };

  displayTabs = () => {
    const { activeTab, serviceDetails } = this.state;
    let retData = [];
    if (serviceDetails) {
      for (let i = 0; i < serviceDetails.length; i++) {
        let node = serviceDetails[i];
        retData.push(
          <li className={activeTab === i ? 'active' : ''} onClick={(e) => this.setActiveTab(i)}>
            <a>
              {node.name}
              <i className="fa fa-times" aria-hidden="true" onClick={(e: any) => this.removeTab(i, e)} />
            </a>
          </li>
        );
      }
    }
    return retData;
  };

  removeTab = (index: any, e: any) => {
    e.stopPropagation();
    const { serviceDetails, activeTab, activeViewIndex, accountId } = this.state;
    if (serviceDetails.length > 1) {
      serviceDetails.splice(index, 1);
      this.setState({
        serviceDetails,
        activeTab: serviceDetails[activeTab] ? activeTab : serviceDetails.length - 1,
      });
      if (activeViewIndex === -1) {
        localStorage.setItem('added-services', JSON.stringify(serviceDetails));
      } else {
        let serviceData: any = localStorage.getItem('viewData');
        if (serviceData) {
          serviceData = JSON.parse(serviceData);
          serviceData[activeViewIndex].services = serviceDetails;
          localStorage.setItem('viewData', JSON.stringify(serviceData));
        }
      }
    } else {
      if (activeViewIndex === -1) {
        localStorage.setItem('added-services', '');
      } else {
        let serviceData: any = localStorage.getItem('viewData');
        if (serviceData) {
          serviceData = JSON.parse(serviceData);
          serviceData.splice(activeViewIndex, 1);
          localStorage.setItem('viewData', JSON.stringify(serviceData));
        }
      }
      this.props.history.push(`${PLUGIN_BASE_URL}/amazon-services?accountId=${accountId}`);
    }
  };

  saveEnvironmentView = () => {
    const { serviceDetails, viewName, accountId, activeViewIndex, viewId } = this.state;
    this.setState({ isSubmitted: true });
    const errorData = this.validate(true);
    if (errorData.isValid) {
      if (serviceDetails && serviceDetails.length > 0) {
        let data: any = localStorage.getItem('viewData');
        if (activeViewIndex === -1) {
          const viewdata = data ? JSON.parse(data) : [];
          let result = '';
          const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          const charactersLength = characters.length;
          for (var i = 0; i < 5; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
          }
          viewdata.push({ viewName: viewName, services: serviceDetails, id: result, accountId: accountId });
          localStorage.setItem('viewData', JSON.stringify(viewdata));
          this.openViewModal();
        } else {
          const viewdata = JSON.parse(data);
          viewdata[activeViewIndex] = {
            viewName,
            services: serviceDetails,
            accountId,
            id: viewId,
          };
          localStorage.setItem('viewData', JSON.stringify(viewdata));
          this.openViewModal();
        }
      }
    }
  };

  openViewModal = () => {
    const { openView } = this.state;
    this.setState({
      openView: !openView,
    });
  };

  handleStateChange = (e: any) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  validate = (isSubmitted: any) => {
    const validObj = {
      isValid: true,
      message: '',
    };
    let isValid = true;
    const retData = {
      viewName: validObj,
      isValid,
    };
    if (isSubmitted) {
      const { viewName } = this.state;
      if (!viewName) {
        retData.viewName = {
          isValid: false,
          message: 'View name is required',
        };
        isValid = false;
      }
    }
    retData.isValid = isValid;
    return retData;
  };

  render() {
    const { activeTab, serviceDetails, openView, viewName, isSubmitted } = this.state;
    const accountId = CommonService.getParameterByName('accountId', window.location.href);
    const cloudName = CommonService.getParameterByName('cloudName', window.location.href);
    const errorData = this.validate(isSubmitted);
    return (
      <div className="asset-container">
        <Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="PERFORMANCE MANAGEMENT" />
        <div className="service-container">
          <div className="common-container">
            <div className="row">
              <div className="col-lg-9 col-md-9 col-sm-12">
                <div className="asset-heading">Environments</div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-12">
                <div className="float-right common-right-btn">
                  <Link
                    to={`${PLUGIN_BASE_URL}/plugins/asset-manager/environments/amazon-services?accountId=${accountId}&cloudName=${cloudName}`}
                    className="asset-white-button min-width-inherit m-r-0"
                  >
                    <i className="fa fa-arrow-circle-left" />
                    &nbsp;&nbsp; Back
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="common-container">
            <div className="service-account-container">
              <div className="d-flex" style={{ width: '100%', justifyContent: 'space-between' }}>
                <div className="account-tabs">
                  <ul>{this.displayTabs()}</ul>
                </div>
                {/* <div className="float-right">
									<button className='asset-blue-button' onClick={this.openViewModal}>Save view</button>
								</div> */}
              </div>
              <div className="webservice-container">
                <Node key={serviceDetails[activeTab].id} serviceData={serviceDetails[activeTab]} {...this.props} />
              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={openView} toggle={this.openViewModal} className="analytics-modal-container">
          <ModalHeader>
            Save View
            <button type="button" className="close" aria-label="Close" onClick={this.openViewModal}>
              <span aria-hidden="true">×</span>
            </button>
          </ModalHeader>
          <ModalBody style={{ height: 'calc(25vh - 25px)', overflowY: 'auto', overflowX: 'hidden' }}>
            <div className="d-block width-100">
              <div className="form-group">
                <label htmlFor="viewName">View Name</label>
                <input
                  type="text"
                  name="viewName"
                  className="input-group-text"
                  value={viewName}
                  onChange={this.handleStateChange}
                />
                <span>{errorData.viewName.message}</span>
              </div>
              <div className="d-block text-right">
                <button className="analytics-gray-button cancel" onClick={this.openViewModal}>
                  Cancel
                </button>
                <button className="analytics-blue-button m-r-0 continue" onClick={this.saveEnvironmentView}>
                  Continue
                </button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
