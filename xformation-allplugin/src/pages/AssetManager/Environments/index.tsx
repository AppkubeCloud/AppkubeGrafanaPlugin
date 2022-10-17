import * as React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../../Breadcrumbs';
import { configFun } from '../../../config';
import { images } from '../../../img';
import { SelectCloudFilter } from '../../../components/SelectCloudFilter';
import { RestService } from '../../_service/RestService';
import { PLUGIN_BASE_URL } from '../../../constants';
import { ROUTES } from '../../../constants';
import { prefixRoute } from '../../../utils/utils.routing';



const LOGOS: any = {
  aws: images.awsLogo,
  azure: images.microsoftAzureLogo,
  gcp: images.gcpLogo,
};

export class Environments extends React.Component<any, any> {
  breadCrumbs: any;
  config: any;
  constructor(props: any) {
    super(props);
    this.state = {
      accountList: {},
      awsRegionList: [],
      optionJsonData: [],
      displayJsonData: [],
      selectedTeg: [],
      showRecentFilter: false,
      showAddNewFilter: false,
      filterJsonData: [],
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
    this.config = configFun(
      props.meta.jsonData.apiUrl,
      props.meta.jsonData.mainProductUrl,
      props.meta.jsonData.grafanaUrl
    );
  }

  handleMenuToggle = (envKey: any, accountIndex: any) => {
    const { accountList } = this.state;
    accountList[envKey][accountIndex].showMenu = !accountList[envKey][accountIndex].showMenu;
    this.setState({
      accountList,
    });
  };

  renderEnvironmentBoxes = () => {
    const { accountList } = this.state;
    const keys = Object.keys(accountList);
    const retData: any = [];
    keys.forEach((env: any) => {
      const accounts = accountList[env];
      if (accounts.length > 0) {
        const account = accounts[0];
        retData.push(
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
            <div className="services-box">
              <div className="heading">
                <span>
                  <img src={LOGOS[account.cloud.name.toLowerCase()]} alt="" />
                </span>
                <h3>{account.cloud.name}</h3>
              </div>
              <div className="table-box">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Accounts</td>
                      <td>{accounts.length}</td>
                    </tr>
                    <tr>
                      <td>Assets</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>Alerts</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>Total Billing</td>
                      <td>0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }
    });
    return retData;
  };

  componentDidMount() {
    this.getAccountList();
  }

  getAccountList = async () => {
    try {
      await RestService.getData(this.config.GET_ALL_ACCOUNT, null, null).then((response: any) => {
        const accounts: any = {};
        response.forEach((account: any) => {
          accounts[account.cloud.name] = accounts[account.cloud.name] || [];
          accounts[account.cloud.name].push(account);
        });
        this.setState({
          accountList: accounts,
        });
      });
    } catch (err) {
      console.log('Loading Asstes failed. Error: ', err);
    }
  };

  renderEnvironmentTable() {
    const { accountList } = this.state;
    const keys = Object.keys(accountList);
    const retData: any = [];
    keys.forEach((env: any, envIndex: any) => {
      const accounts = accountList[env];
      const accountsJSX: any = [];
      accounts.forEach((account: any, accountIndex: any) => {
        accountsJSX.push(
          <tr key={`env-${envIndex}-${accountIndex}`}>
            <td>
              <Link
                to={`${PLUGIN_BASE_URL}/plugins/asset-manager/amazon-services?accountId=${account.accountId}&cloudName=${account.cloud.name}`}
              >
                {account.cloud.name} ({account.accountId})
              </Link>
            </td>
            <td>{account.totalProductEnclave}</td>
            <td>{account.totalProducts}</td>
            <td>{account.totalAppServices}</td>
            <td>
              {account.totalDataServices}
              {/* <div className={row.status === 'ACTIVE' ? 'status enable' : 'status disable'}></div> */}
            </td>
            <td>
              <div className="d-block text-center action-edit">
                {account.showMenu && (
                  <>
                    <div
                      className="open-create-menu-close"
                      onClick={(e) => {
                        this.handleMenuToggle(env, accountIndex);
                      }}
                    ></div>
                    <div className="text-center open-create-menu">
                      <a
                        href={`${PLUGIN_BASE_URL}/plugins/asset-manager/add-data-source?accountId=${account.accountId}&cloudName=${account.cloud.name}`}
                      >
                        Add New Input
                      </a>
                      <a>Add Cluster</a>
                      <a>Add Cloud Managed Services</a>
                      <a>Add Gateway Services</a>
                    </div>
                  </>
                )}

                <button
                  className="asset-white-button min-width-inherit m-r-0"
                  onClick={(e) => {
                    this.handleMenuToggle(env, accountIndex);
                  }}
                >
                  <i className="fa fa-ellipsis-h"></i>
                </button>
              </div>
            </td>
          </tr>
        );
      });
      if (accounts.length > 0) {
        const account = accounts[0];
        retData.push(
          <table className="table">
            <thead>
              <tr>
                <th>
                  <span>
                    <img src={LOGOS[account.cloud.name.toLowerCase()]} alt="" />
                  </span>
                  {account.cloud.name}
                </th>
                <th>Product Enclave</th>
                <th>Products</th>
                <th>App Services</th>
                <th>Data Services</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{accountsJSX}</tbody>
          </table>
        );
      }
    });
    return retData;
  }

  render() {
    const { showRecentFilter, showAddNewFilter, filterJsonData } = this.state;
    return (
      <div className="asset-container">
        <Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="PERFORMANCE MANAGEMENT" />
        <div className="environments-page-container">
          <div className="common-container">
            <div className="row">
              <div className="col-lg-9 col-md-9 col-sm-12">
                <div className="asset-heading">Environments</div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-12">
                <div className="float-right common-right-btn">
                  <Link
                    to={prefixRoute(ROUTES.DepartmentWiseProducts)}
                    className="asset-white-button min-width-inherit"
                  >
                    <img src={images.Jobs} alt="" style={{ maxWidth: '20px' }} />
                  </Link>
                  {/* <Link to={`${PLUGIN_BASE_URL}/environments`} className="asset-white-button min-width-inherit">
                    <i className="fa fa-arrow-circle-left"></i>&nbsp;&nbsp; Back
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
          <div className="common-container border-bottom-0 environments-services-container">
            <div className="row">{this.renderEnvironmentBoxes()}</div>
          </div>
          <div className="common-container border-bottom-0 environments-table-container">
            <SelectCloudFilter filterJsonData={filterJsonData} />
            <div className="recent-fliters-container">
              <div className="row">
                <div className="col-lg-8 col-md-8 col-sm-12">
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <div className="fliter">
                        <div
                          className="fliter-toggel"
                          onClick={() =>
                            this.setState({
                              showRecentFilter: !showRecentFilter,
                            })
                          }
                        >
                          <i className="fa fa-clock-o" />
                          <span>Recent</span>
                        </div>
                        <div className={showRecentFilter === true ? 'fliter-collapse active' : 'fliter-collapse'}>
                          <ul>
                            <li>
                              <Link to={`${PLUGIN_BASE_URL}/plugins/asset-manager/account-setup`}>
                                <span>
                                  <img src={images.awsLogo} alt="" />
                                </span>
                                <p>AWS (657907747545)</p>
                              </Link>
                            </li>
                            <li>
                              <Link to={`${PLUGIN_BASE_URL}/plugins/asset-manager/account-setup`}>
                                <span>
                                  <img src={images.awsLogo} alt="" />
                                </span>
                                <p>AWS (655668745458)</p>
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div
                          className={showRecentFilter === true ? 'fliters-collapse-bg active' : 'fliters-collapse-bg'}
                          onClick={() => this.setState({ showRecentFilter: !showRecentFilter })}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <div className="fliter">
                        <div
                          className="fliter-toggel"
                          onClick={() =>
                            this.setState({
                              showAddNewFilter: !showAddNewFilter,
                            })
                          }
                        >
                          <i className="fa fa-plus" />
                          <span>Add New Environment</span>
                        </div>
                        <div className={showAddNewFilter === true ? 'fliter-collapse active' : 'fliter-collapse'}>
                          <ul>
                            <li>
                              <Link to={`${PLUGIN_BASE_URL}/plugins/asset-manager/account-setup`}>
                                <span>
                                  <img src={images.awsLogo} alt="" />
                                </span>
                                <p>AWS Environment</p>
                              </Link>
                            </li>
                            <li>
                              <Link to={`${PLUGIN_BASE_URL}/plugins/asset-manager/account-setup`}>
                                <span>
                                  <img src={images.microsoftAzureLogo} alt="" />
                                </span>
                                <p>Azure Environment</p>
                              </Link>
                            </li>
                            <li>
                              <Link to={`${PLUGIN_BASE_URL}/plugins/asset-manager/account-setup`}>
                                <span>
                                  <img src={images.gcpLogo} alt="" />
                                </span>
                                <p>GCP Environment</p>
                              </Link>
                            </li>
                            <li>
                              <Link to={`${PLUGIN_BASE_URL}/plugins/asset-manager/account-setup`}>
                                <span>
                                  <img src={images.KubernetesLogo} alt="" />
                                </span>
                                <p>Kubernetes</p>
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div
                          className={showAddNewFilter === true ? 'fliters-collapse-bg active' : 'fliters-collapse-bg'}
                          onClick={() => this.setState({ showAddNewFilter: !showAddNewFilter })}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <div className="fliter">
                        <div className="fliter-toggel">
                          <i className="fa fa-sign-out" />
                          <span>Export</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="form-group search-control m-b-0">
                    <button className="btn btn-search">
                      <i className="fa fa-search" />
                    </button>
                    <input type="text" className="input-group-text" placeholder="Search" />
                  </div>
                </div>
              </div>
            </div>
            <div className="environments-table">{this.renderEnvironmentTable()}</div>
          </div>
        </div>
      </div>
    );
  }
}
