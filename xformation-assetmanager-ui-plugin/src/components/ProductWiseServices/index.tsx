import * as React from 'react';
// import { Link } from 'react-router-dom';
// import { images } from '../../img';
// import { PLUGIN_BASE_URL } from '../../constants';
import { SelectCloudFilter } from '../SelectCloudFilter';
import { ServicesPerformance } from './ServicesPerformance';
import { v4 } from 'uuid';

// const ViewMapping: any = {
//   BUSINESS_VIEW: "0",
//   CLOUD_VIEW: "1"
// };

export class ProductWiseServices extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      // showRecentFilter: false,
      // showAddNewFilter: false,
      productComponent: [],
      product: [],
      isDataLoaded: false,
      hostingType: 'Cluster',
      filters: {}
    };
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (!this.state.isDataLoaded && this.props.product) {
      this.setState({
        product: this.props.product,
        isDataLoaded: true
      });
    }
  }

  openProduct = (i: any, j: any) => {
    const { product } = this.state;
    for (let m = 0; m < product[i].productList.length; m++) {
      if (j !== m) {
        const viewData = product[i].productList[m];
        viewData.isOpen = false;
      }
    }
    const viewData = product[i].productList[j];
    viewData.isOpen = !viewData.isOpen;
    this.setState({
      product
    });
  }

  handleChangeViewOfProduct = (viewType:any) => {
    this.setState({hostingType:viewType})
  }

  displayProductServices = () => {
    const { product, hostingType, filters } = this.state;
    let retData = [];
    const productFilter = filters['Products'];
    if (product && product.length > 0) {
      for (let i = 0; i < product.length; i++) {
        let serviceByType: any = {};
        let row = product[i];
        retData.push(
          <div key={v4()} className="inner-table">
            <div className="thead">{row.name}</div>
            {row.productList && row.productList.map((viewData: any, index: any) => {
              const val = viewData;
              if (!productFilter || (productFilter && productFilter.indexOf(viewData.name) !== -1)) {
                let productServiceList = [];
                if (val && val.deploymentEnvironmentList) {
                  for (let b = 0; b < val.deploymentEnvironmentList.length; b++) {
                    productServiceList.push(val.deploymentEnvironmentList[b].name);
                    let environment = val.deploymentEnvironmentList[b];
                    if (environment.serviceCategoryList && environment.serviceCategoryList.length > 0) {
                      for (let a = 0; a < environment.serviceCategoryList.length; a++) {
                        const serviceCategory = environment.serviceCategoryList[a];
                        if (serviceCategory.serviceNameList && serviceCategory.serviceNameList.length > 0) {
                          for (let n = 0; n < serviceCategory.serviceNameList.length; n++) {
                            let serviceName = serviceCategory.serviceNameList[n];
                            if (serviceName.tagList) {
                              serviceName.tagList.map(
                                (subServices: any) => {
                                  serviceByType[subServices.tagName] = serviceByType[subServices.tagName] || 0;
                                  serviceByType[subServices.tagName] += subServices.serviceList ? subServices.serviceList.length : 0;
                                }, 0);
                            }
                          }
                        }
                      }
                    }
                  }
                }
                return (
                  <div className="tbody" key={index}>
                    <div className="name" onClick={() => this.openProduct(i, index)}>
                      <span>{val.name}</span>
                      <i className={val.isOpen == true ? 'fa fa-chevron-up' : 'fa fa-chevron-down'} />
                    </div>
                    <div className="cloud-environment"></div>
                    <div className="app-services">{serviceByType['App'] || 0}</div>
                    <div className="data-services">{serviceByType['Data'] || 0}</div>
                    <div className="product-environment">{productServiceList.join()}</div>
                    <div className="edit">
                      {/* onClick={() => this.onClickMenu(defaultView, i)} */}
                      <button className="edit-btn" onClick={() => this.onClickMenu(i, index)} >
                        <span></span>
                        <span></span>
                        <span></span>
                      </button>
                      {val.menuOpen === true && (
                        <>
                          <div className="text-center open-create-menu-close" onClick={() => this.onClickMenu(i, index)} ></div>
                          <div className="text-center open-create-menu" >
                            <a>Add Services</a>
                            <a>Associate to Department</a>
                            <a>Migrate</a>
                          </div>
                        </>
                      )}
                    </div>
                    {val.isOpen == true &&
                      <ServicesPerformance
                        handleChangeViewOfProduct={this.handleChangeViewOfProduct}
                        product={val}
                        hostingType={hostingType}
                        filters={filters}
                        accountId={this.props.accountId}
                        cloudName={this.props.cloudName}
                      />
                    }
                  </div>
                )
              }
              return <></>;
            })
            }
          </div >
        );
      }
    }
    return retData;
  }

  onClickMenu = (i: any, j: any) => {
    const { product } = this.state;
    for (let m = 0; m < product.length; m++) {
      for (let k = 0; k < product[m].productList.length; k++) {
        if (m === i) {
          let viewData = product[m].productList[k]
          if (j == k) {
            viewData.menuOpen = !viewData.menuOpen;
          }
          else {
            viewData.menuOpen = false
          }
        }
        else {
          let viewData = product[m].productList[k];
          viewData.menuOpen = false;
        }
      }
    }
    this.setState({
      product
    });
  }

  onChangeFilter = (filters: any) => {
    this.setState({
      filters
    });
  };

  render() {
    return (
      <div className="common-container department-fliters-container">
        <div className="selects-container" style={{ marginBottom: '20px' }}>
          <SelectCloudFilter filterJsonData={this.props.displayJsonData} onChangeFilter={this.onChangeFilter} />
        </div>
        <div className="data-table">
          <div className="thead">
            <div className="name">Name</div>
            <div className="cloud-environment">Cloud Environment</div>
            <div className="app-services">App Services</div>
            <div className="data-services">Data Services</div>
            <div className="product-environment">Product Environment</div>
            <div className="edit">
              <button className="edit-btn">
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
          <div className="tbody">
            {this.displayProductServices()}
          </div>
        </div>
      </div>
    );
  }
}
