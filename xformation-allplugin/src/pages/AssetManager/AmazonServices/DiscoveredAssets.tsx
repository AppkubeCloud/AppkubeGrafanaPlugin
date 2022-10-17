import * as React from 'react';
import { images } from '../../../img';
import { Collapse } from 'reactstrap';
import { RestService } from '../../_service/RestService';
import { configFun } from '../../../config';
import { PLUGIN_BASE_URL } from '../../../constants';
import { SelectCloudFilter } from '../../../components/SelectCloudFilter';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';

export class DiscoveredAssets extends React.Component<any, any>{
  CreateNewOURef: any;
  config: any;
  nodeMapping: any = {};
  clusterMapping: any = {};
  constructor(props: any) {
    super(props);
    this.state = {
      tableData: {},
      labelText: '',
      openCreateMenu: '',
      servicesData: null,
      activeNode: '',
      accountId: '',
      cloudName: '',
      filterData: [{
        name: 'Product Enclave',
        key: 'nodes',
        filter: []
      }, {
        name: 'Clusters',
        key: 'clusters',
        filter: []
      }, {
        name: 'Products',
        key: 'products',
        filter: []
      }, {
        name: 'Environments',
        key: 'environments',
        filter: []
      }],
      filters: [],
      treeData: [],
      totalData: {},
    };
    this.config = configFun(props.meta.jsonData.apiUrl, props.meta.jsonData.mainProductUrl, props.meta.jsonData.grafanaUrl);
  }

  componentDidMount() {
    const queryPrm = new URLSearchParams(this.props.location.search);
    const accountId = queryPrm.get("accountId");
    const cloudName = queryPrm.get("cloudName");
    this.getServicesData(accountId);
    this.setState({
      accountId,
      cloudName
    });
  }

  getServicesData = async (accountId: any) => {
    try {
      await RestService.getData(
        `${this.config.GET_ACCOUNT_SERVICES_DATA}?accountId=${accountId}`,
        null,
        null
      ).then((response: any) => {
        this.setState({
          treeData: response[0].account_services_json.vpcs
        });
        this.getAppDataServices(response[0].account_services_json.vpcs);
      });
    } catch (err) {
      console.log("Loading accounts failed. Error: ", err);
    }
  }

  convertObjectIntoArray = (obj: any) => {
    const keys = Object.keys(obj);
    return keys.map((key) => {
      return obj[key];
    });
  };

  getAppDataServices = (treeData: any) => {
    const totalData: any = {};
    const { filterData } = this.state;
    const filterVPC: any = {};
    const filterCluster: any = {};
    const filterProducts: any = {};
    const filterEnvs: any = {};
    for (let vpcIndex = 0; vpcIndex < treeData.length; vpcIndex++) {
      filterVPC[treeData[vpcIndex].name] = {
        label: treeData[vpcIndex].name,
        value: treeData[vpcIndex].name,
      };
      const clusters = treeData[vpcIndex].clusters;
      totalData[vpcIndex] = {};
      clusters.forEach((cluster: any) => {
        const products = cluster.products;
        filterCluster[cluster.name] = {
          label: cluster.name,
          value: cluster.name,
        };
        totalData[vpcIndex]['products'] = totalData[vpcIndex]['products'] || 0;
        totalData[vpcIndex]['products'] += cluster.products.length;
        products.forEach((product: any) => {
          const { environments, name } = product;
          filterProducts[name] = {
            label: name,
            value: name,
          };
          environments.forEach((env: any) => {
            const { services } = env;
            filterEnvs[env.name] = {
              label: env.name,
              value: env.name,
            };
            services.common.forEach((appData: any) => {
              if (appData.app) {
                totalData[vpcIndex]['app'] = totalData[vpcIndex]['app'] || 0;
                totalData[vpcIndex]['app'] += appData.app.length;
              }
              if (appData.data) {
                totalData[vpcIndex]['data'] = totalData[vpcIndex]['data'] || 0;
                totalData[vpcIndex]['data'] += appData.data.length;
              }
            });
          });
        });
      });
    }
    filterData[0].filter = this.convertObjectIntoArray(filterVPC);
    filterData[1].filter = this.convertObjectIntoArray(filterCluster);
    filterData[2].filter = this.convertObjectIntoArray(filterProducts);
    filterData[3].filter = this.convertObjectIntoArray(filterEnvs);
    this.setState({
      totalData,
      filterData
    });
  };

  toggleNode = (index: any, activeNodeName: any) => {
    const { treeData } = this.state;
    treeData[index].isOpened = !treeData[index].isOpened;
    this.setState({
      treeData,
      servicesData: null,
      activeNode: activeNodeName,
    });
  }

  toggleCluster = (nodeIndex: any, clusterIndex: any, activeNodeName: any) => {
    const { treeData } = this.state;
    treeData[nodeIndex].clusters[clusterIndex].isOpened = !treeData[nodeIndex].clusters[clusterIndex].isOpened;
    this.setState({
      treeData,
      servicesData: null,
      activeNode: activeNodeName
    });
  }

  onClickProduct = (nodeIndex: any, clusterIndex: any, productIndex: any, activeNode: any) => {
    const { treeData } = this.state;
    let text = treeData[nodeIndex].name + ' > ' + treeData[nodeIndex].clusters[clusterIndex].name + ' > ' + treeData[nodeIndex].clusters[clusterIndex].products[productIndex].name;
    this.setState({
      servicesData: JSON.parse(JSON.stringify(treeData[nodeIndex].clusters[clusterIndex].products[productIndex].environments)),
      labelText: text,
      activeNode: activeNode
    });
  };

  onClickEnvironment = (nodeKey: any, clusterKey: any, environmentKey: any) => {
    const { tableData } = this.state;
    let text = nodeKey + ' > ' + clusterKey + ' > ' + environmentKey;
    this.setState({
      servicesData: JSON.parse(JSON.stringify(tableData[nodeKey][clusterKey][environmentKey])),
      labelText: text,
      activeNode: environmentKey
    });
  };

  onClickAppDataService = (nodeKey: any, clusterKey: any, environmentKey: any, serviceKey: any) => {
    const { tableData } = this.state;
    let text = nodeKey + ' > ' + clusterKey + ' > ' + environmentKey + ' > ' + serviceKey + ' Services';
    this.setState({
      servicesData: tableData[nodeKey][clusterKey][environmentKey][serviceKey],
      labelText: text,
      activeNode: serviceKey
    });
  };

  handleMenuToggle = (key: any) => {
    const { tableData } = this.state;
    tableData[key].showMenu = !tableData[key].showMenu;
    this.setState({
      tableData
    });
  };

  renderNodes = (nodes: any) => {
    const { totalData, activeNode, filters } = this.state;
    const retData: any = [];
    if (nodes) {
      const filteredNodes = filters['Product Enclave'];
      const totalNodes = nodes.length;
      for (let i = 0; i < totalNodes; i++) {
        const node = nodes[i];
        // const node = nodes[key];
        if ((filteredNodes && filteredNodes.indexOf(node.name) !== -1) || !filteredNodes) {
          retData.push(
            <div className="tbody" key={v4()}>
              <div className="tbody-inner">
                <div className={`tbody-td first ${activeNode === node.name ? 'active' : ''}`} onClick={() => this.toggleNode(i, node.name)} title={node.name}>
                  <div className={node.isOpened ? "caret-down" : "caret-right"}></div>
                  {node.name}
                </div>
                <div className="tbody-td">{totalData[i] ? (totalData[i]['products'] || 0) : 0}</div>
                <div className="tbody-td">{totalData[i] ? (totalData[i]['app'] || 0) : 0}</div>
                <div className="tbody-td">{totalData[i] ? (totalData[i]['data'] || 0) : 0}</div>
                <div className="tbody-td">
                  <div className="d-block text-center action-edit">
                    {node.showMenu &&
                      <>
                        <div className="open-create-menu-close" onClick={(e) => { this.handleMenuToggle(i) }}></div>
                        <div className="text-center open-create-menu">
                          <a>Add New Product</a>
                          <a>Add Cluster</a>
                          <a>Add Cloud Managed Services</a>
                          <a>Add Gateway Services</a>
                        </div>
                      </>
                    }
                    <button className="asset-white-button min-width-inherit m-r-0" onClick={(e) => { this.handleMenuToggle(i) }}>
                      <a className="fa fa-ellipsis-h"></a>
                    </button>
                  </div>
                </div>
              </div>
              {
                node.isOpened ?
                  <Collapse className="collapse-content" isOpen={node.isOpened}>
                    {this.renderClusters(i, node.clusters)}
                  </Collapse> : <></>
              }
            </div>
          );
        }
      }
    }
    return retData;
  };

  renderClusters = (index: any, clusters: any) => {
    const { activeNode, filters } = this.state;
    const filteredClusters = filters['Clusters'];
    // const keys = Object.keys(clusters);
    const retData: any = [];
    clusters.forEach((cluster: any, clusterIndex: any) => {
      if ((filteredClusters && filteredClusters.indexOf(cluster.name) !== -1) || !filteredClusters) {
        retData.push(
          <div className="tbody">
            <div className="tbody-inner">
              <div className={`tbody-td first ${activeNode === cluster.name ? 'active' : ''}`} onClick={() => this.toggleCluster(index, clusterIndex, cluster.name)} title={cluster.name}>
                <div className={cluster.isOpened ? "caret-down" : "caret-right"}></div>
                {cluster.name}
              </div >
              {/* </Link> */}
            </div >
            {
              cluster.isOpened ?
                <Collapse className="collapse-content" isOpen={cluster.isOpened}>
                  {this.renderProducts(index, clusterIndex, cluster.products)}
                </Collapse> : <></>
            }
          </div >
        );
      }
    });
    return retData;
  };

  renderProducts = (nodeIndex: any, clusterIndex: any, products: any) => {
    const { activeNode, filters } = this.state;
    const filteredProducts = filters['Products'];
    const retData: any = [];
    products.forEach(((product: any, productIndex: any) => {
      if ((filteredProducts && filteredProducts.indexOf(product.name) !== -1) || !filteredProducts) {
        retData.push(
          <div className="tbody">
            <div className="tbody-inner">
              <div className={`tbody-td first ${activeNode === product.name ? 'active' : ''}`} onClick={() => this.onClickProduct(nodeIndex, clusterIndex, productIndex, product.name)}>
                {product.name}
              </div >
            </div >
          </div >
        );
      }
    }));
    return retData;
  };

  toggleEnvironment = (envIndex: any) => {
    const { servicesData } = this.state;
    servicesData[envIndex].isOpened = !servicesData[envIndex].isOpened;
    this.setState({
      servicesData
    });
  };

  toggleServices = (envIndex: any, serviceKey: any) => {
    const { servicesData } = this.state;
    servicesData[envIndex].services[serviceKey].isOpened = !servicesData[envIndex].services[serviceKey].isOpened;
    this.setState({
      servicesData
    });
  };

  toggleAssociatedServices = (envIndex: any, serviceKey: any, serviceIndex: any) => {
    const { servicesData } = this.state;
    servicesData[envIndex].services[serviceKey][serviceIndex].isOpened = !servicesData[envIndex].services[serviceKey][serviceIndex].isOpened;
    this.setState({
      servicesData
    });
  };

  toggleAppDataService = (envIndex: any, serviceKey: any, serviceIndex: any, appDataKey: any) => {
    const { servicesData } = this.state;
    servicesData[envIndex].services[serviceKey][serviceIndex][appDataKey].isOpened = !servicesData[envIndex].services[serviceKey][serviceIndex][appDataKey].isOpened;
    this.setState({
      servicesData
    });
  };

  renderEnvironments = () => {
    const { servicesData, filters } = this.state;
    const filteredServiceNature = filters['Environments'];
    if (servicesData) {
      const tableHead = <div className="thead">
        <div className="name">
          Name
        </div>
        <div className="performance">
          Performance
        </div>
        <div className="availability">
          Availability
        </div>
        <div className="security">
          Security
        </div>
        <div className="data-protection">
          Data Protection
        </div>
        <div className="user-exp">
          User exp
        </div>
      </div>;
      let environmentJSX: any = [];
      servicesData.forEach((environment: any, envIndex: any) => {
        if ((filteredServiceNature && filteredServiceNature.indexOf(environment.name) !== -1) || !filteredServiceNature) {
          environmentJSX.push(
            <>
              <div className="tbody" onClick={() => this.toggleEnvironment(envIndex)}>
                <div className="name" style={{ paddingLeft: '15px' }}>
                  {environment.name} <span><i className="fa fa-angle-down"></i></span>
                </div>
              </div>
              {
                environment.isOpened ?
                  this.renderServices(envIndex, environment.services) : <></>
              }
            </>
          );
        }
      });
      return <div className="data-table">
        {tableHead}
        {environmentJSX}
      </div>;
    }
    return <></>;
  };

  renderServices = (envIndex: any, services: any) => {
    const keys = Object.keys(services);
    let retData: any = [];
    keys.forEach((key: any) => {
      const service = services[key];
      retData.push(
        <div className="data-table">
          <div className="tbody" onClick={() => this.toggleServices(envIndex, key)}>
            <div className="name" style={{ paddingLeft: '30px' }}>
              {key} <span><i className="fa fa-angle-down"></i></span>
            </div>
          </div>
          {
            service.isOpened ?
              this.renderAssociatedServices(envIndex, key, service) : <></>
          }
        </div>
      );
    });
    return retData;
  };

  renderAssociatedServices = (envIndex: any, serviceKey: any, services: any) => {
    let retData: any = [];
    services.forEach((service: any, index: any) => {
      retData.push(
        <div className="data-table">
          <div className="tbody" onClick={() => this.toggleAssociatedServices(envIndex, serviceKey, index)}>
            <div className="name" style={{ paddingLeft: '45px' }}>
              {service.name} <span><i className="fa fa-angle-down"></i></span>
            </div>
          </div>
          {
            service.isOpened ?
              this.renderAppDataServices(envIndex, serviceKey, index, service) : <></>
          }
        </div>
      );
    });
    return retData;
  };

  renderAppDataServices = (envIndex: any, serviceKey: any, serviceIndex: any, service: any) => {
    const appJSX = [
      <div className="data-table">
        <div className="tbody" onClick={() => this.toggleAppDataService(envIndex, serviceKey, serviceIndex, 'app')}>
          <div className="name" style={{ paddingLeft: '60px' }}>
            App <span><i className="fa fa-angle-down"></i></span>
          </div>
        </div>
        {
          service.app.isOpened ?
            this.renderDirectServices(envIndex, serviceKey, serviceIndex, 'app', service.app) : <></>
        }
      </div>
    ];
    const dataJSX = [
      <div className="data-table">
        <div className="tbody" onClick={() => this.toggleAppDataService(envIndex, serviceKey, serviceIndex, 'data')}>
          <div className="name" style={{ paddingLeft: '60px' }}>
            Data <span><i className="fa fa-angle-down"></i></span>
          </div>
        </div>
        {
          service.data.isOpened ?
            this.renderDirectServices(envIndex, serviceKey, serviceIndex, 'data', service.data) : <></>
        }
      </div>
    ];
    return <>{appJSX}{dataJSX}</>;
  };

  renderDirectServices = (envIndex: any, serviceKey: any, serviceIndex: any, appDataKey: any, appDataServices: any) => {
    let retData = [];
    const { accountId, cloudName } = this.state;
    if (appDataServices) {
      retData = appDataServices.map((service: any) => {
        return (
          <div className="tbody">
            <div className="service-name" style={{ paddingLeft: '75px' }} title={service.name}> <Link onClick={(e: any) => this.onClickDirectService(e, service)} to={`${PLUGIN_BASE_URL}/plugins/asset-manager/environments/storage-details?accountId=${accountId}&cloudName=${cloudName}`}>{service.name} {service.associatedGlobalServiceLocation ? `(${service.associatedGlobalServiceLocation})` : ''}</Link></div>
            <div className="performance">
              <div className={`status ${this.getPerformanceClass(service.performance.score)}`}>
                <i className="fa fa-check"></i>
              </div>
            </div>
            <div className="availability">
              <div className={`status ${this.getPerformanceClass(service.availability.score)}`}>
                <i className="fa fa-check"></i>
              </div>
            </div>
            <div className="security">
              <div className={`status ${this.getPerformanceClass(service.security.score)}`}>
                <i className="fa fa-check"></i>
              </div>
            </div>
            <div className="data-protection">
              <div className={`status ${this.getPerformanceClass(service.dataProtection.score)}`}>
                <i className="fa fa-check"></i>
              </div>
            </div>
            <div className="user-exp">
              <div className={`status ${this.getPerformanceClass(service.userExperiance.score)}`}>
                <i className="fa fa-check"></i>
              </div>
            </div>
          </div>
        );
      });
    }
    return retData;
  };

  onClickDirectService = (e: any, service: any) => {
    const { labelText } = this.state;
    let serviceData: any = localStorage.getItem('added-services');
    if (serviceData) {
      serviceData = JSON.parse(serviceData);
    } else {
      serviceData = [];
    }
    let existingIndex = -1;
    for (let i = 0; i < serviceData.length; i++) {
      if (serviceData[i].id === service.dbid) {
        existingIndex = i;
        break;
      }
    }
    if (existingIndex !== -1) {
      serviceData.splice(existingIndex, 1);
    }
    let avgScore = (service.performance.score + service.availability.score + service.security.score + service.dataProtection.score + service.userExperiance.score) / 5;
    serviceData.push({
      id: service.dbid,
      name: service.name,
      labelText,
      organizationUnit: service.associatedOU,
      serviceType: service.serviceType,
      serviceScore: avgScore.toFixed(2),
      associatedProduct: service.associatedProduct,
      asscociatedEnv: service.associatedEnv,
      associatedCloudElementType: service.associatedCloudElement,
      associatedCloudElementId: service.associatedCloudElementId,
    });
    localStorage.setItem('added-services', JSON.stringify(serviceData));
  };

  getPerformanceClass = (score: any) => {
    if (score >= 75) {
      return 'green';
    } else if (score >= 50) {
      return 'orange';
    } else if (score >= 25) {
      return 'yellow';
    } else {
      return 'red';
    }
  };

  onChangeFilter = (filters: any) => {
    this.setState({
      filters
    });
  };

  render() {
    const { labelText, treeData, servicesData, filterData } = this.state;
    return (
      <div className='department-wise-container'>
        <div className='common-container'>
          <div style={{ marginBottom: '20px' }}>
            <SelectCloudFilter filterJsonData={filterData} onChangeFilter={this.onChangeFilter} />
          </div>
          <div className="organisational-details">
            <div className="container-inner">
              <div className="organisational-data-table">
                <div className={servicesData ? "organisational-data-table-left" : ""}>
                  <div className="thead">
                    <div className="thead-th organisational-heading"><span><img src={images.awsLogo} alt="" /></span> AWS</div>
                    <div className="thead-th">Products</div>
                    <div className="thead-th">App Services</div>
                    <div className="thead-th">Data Services</div>
                    <div className="thead-th">Action</div>
                  </div>
                  {this.renderNodes(treeData)}
                </div>
                <div className={servicesData ? "organisational-data-table-right" : ""}>
                  <div className="right-part-filters">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="filters-breadcrumbs">
                          <ul>
                            <li>{labelText}</li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12 col-sm-12" style={{ display: 'none' }}>
                        <div className="filters-buttons">
                          <button className="asset-white-button min-width-inherit">
                            <i className="fa fa-plus"></i> Add
                          </button>
                          <button className="asset-white-button min-width-inherit">
                            <i className="fa fa-refresh"></i> Refresh
                          </button>
                          <button className="asset-white-button min-width-inherit m-r-0">
                            <i className="fa fa-trash"></i> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row" style={{ display: 'none' }}>
                      <div className="col-lg-4 col-md-12 col-sm-12">
                        <div className="filters-search">
                          <label>Filter by deployment name</label>
                          <div className="form-group">
                            <input type="text" className="control-form" placeholder="Enter the full deployment name" value="" />
                            <button><i className="fa fa-search"></i></button>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-12 col-sm-12">
                        <div className="filters-search">
                          <label>Filter by App</label>
                          <div className="form-group">
                            <input type="text" className="control-form" placeholder="foo-bar,key!=value" value="" />
                            <button><i className="fa fa-search"></i></button>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-12 col-sm-12">
                        <div className="filters-search">
                          <label>Filter by SLA</label>
                          <div className="form-group">
                            <input type="text" className="control-form" placeholder="All SLA" value="" />
                            <button><i className="fa fa-search"></i></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {this.renderEnvironments()}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}