import * as React from 'react';
import { images } from '../../img';
import { Collapse } from 'reactstrap';
import { RestService } from '../_service/RestService';
import { configFun } from '../../config';
import { PLUGIN_BASE_URL } from '../../constants';
import { SelectCloudFilter } from '../../components/SelectCloudFilter';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';

const SERVICE_MAPPING: any = {
  'App': 'App Services',
  'Data': 'Data Services',
  'Other': 'Other Services',
  'Network': 'Network Services',
  'Common': 'Common Services',
  'Business': 'Business Services',
};

const GLOBAL_SERVICE = 'Cloud Managed';

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
      servicesLength: {},
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
        name: 'Environments',
        key: 'environments',
        filter: []
      }, {
        name: 'Service Nature',
        key: 'serviceNature',
        filter: []
      }, {
        name: 'Products',
        key: 'products',
        filter: []
      }],
      filters: [],
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
        `${this.config.GET_FILTERED_SERVICES_DATA}?associatedLandingZone=${accountId}`,
        null,
        null
      ).then((response: any) => {
        this.manipulateServiceData(response.services);
      });
    } catch (err) {
      console.log("Loading accounts failed. Error: ", err);
    }
  }

  manipulateServiceData = (services: any) => {
    const treeData: any = [];
    const { filterData, accountId } = this.state;
    const filteredNodes: any = {};
    const filteredClusters: any = {};
    const filteredEnvironment: any = {};
    // const filteredServiceType: any = {};
    const filteredServiceNature: any = {};
    const filteredProducts: any = {};
    let nodeIndex = 1;
    let clusterIndex = 1;
    services.forEach((service: any) => {
      const { associatedProductEnclave, associatedCluster, serviceNature, associatedProduct, associatedEnv, associatedLandingZone, associatedBusinessService, associatedCommonService, serviceType } =
        service.metadata_json;
      if (accountId === associatedLandingZone) {
        const id = service.id;
        if (associatedProductEnclave) {
          const node = treeData[associatedProductEnclave] || {};
          if (!this.nodeMapping[associatedProductEnclave]) {
            this.nodeMapping[associatedProductEnclave] = `VPC ${nodeIndex}`;
            nodeIndex += 1;
            clusterIndex = 1;
          }
          filteredNodes[associatedProductEnclave] = {
            value: associatedProductEnclave,
            label: this.nodeMapping[associatedProductEnclave],
          };
          const clusterData = node[associatedCluster] || {};
          if (!this.clusterMapping[associatedCluster]) {
            this.clusterMapping[associatedCluster] = `Cluster ${clusterIndex}`;
            clusterIndex += 1;
          }
          filteredClusters[associatedCluster] = {
            value: associatedCluster,
            label: `${this.nodeMapping[associatedProductEnclave]} > ${this.clusterMapping[associatedCluster]}`,
          };
          const environmentData = clusterData[associatedEnv] || {};
          filteredEnvironment[associatedEnv] = {
            value: associatedEnv,
            label: associatedEnv,
          };
          // const serviceTypeData = environmentData[serviceType] || {};
          // filteredServiceType[serviceType] = {
          //   value: serviceType,
          //   label: serviceType,
          // };
          const assiciatedServiceData = environmentData[serviceNature] || {};
          filteredServiceNature[serviceNature] = {
            value: serviceNature,
            label: serviceNature,
          };
          const productData = assiciatedServiceData[associatedProduct] || {};
          filteredProducts[associatedProduct] = {
            value: associatedProduct,
            label: associatedProduct,
          };

          let associatedServiceName = "";
          if (serviceNature === "Business") {
            associatedServiceName = associatedBusinessService;
          } else {
            associatedServiceName = associatedCommonService;
          }
          const serviceData = productData[associatedServiceName] || { title: associatedServiceName, services: [], appData: {} };
          serviceData.services.push({
            id,
            ...service.details
          });
          if (!serviceData.appData[serviceType]) {
            serviceData.appData[serviceType] = 0;
          }
          serviceData.appData[serviceType] += 1;
          productData[associatedServiceName] = serviceData;
          assiciatedServiceData[associatedProduct] = productData;
          environmentData[serviceNature] = assiciatedServiceData;
          // environmentData[serviceType] = serviceTypeData;
          clusterData[associatedEnv] = environmentData;
          node[associatedCluster] = clusterData;
          treeData[associatedProductEnclave] = node;
        } else {
          const node = treeData[GLOBAL_SERVICE] || {};
          if (!this.nodeMapping[GLOBAL_SERVICE]) {
            this.nodeMapping[GLOBAL_SERVICE] = GLOBAL_SERVICE;
          }
          filteredNodes[GLOBAL_SERVICE] = {
            value: GLOBAL_SERVICE,
            label: GLOBAL_SERVICE,
          };
          node.isGlobalService = true;
          const environmentData = node[associatedEnv] || {};
          filteredEnvironment[associatedEnv] = {
            value: associatedEnv,
            label: associatedEnv,
          };
          const assiciatedServiceData = environmentData[serviceNature] || {};
          filteredServiceNature[serviceNature] = {
            value: serviceNature,
            label: serviceNature,
          };
          const productData = assiciatedServiceData[associatedProduct] || {};
          filteredProducts[associatedProduct] = {
            value: associatedProduct,
            label: associatedProduct,
          };

          let associatedServiceName = "";
          if (serviceNature === "Business") {
            associatedServiceName = associatedBusinessService;
          } else {
            associatedServiceName = associatedCommonService;
          }
          const serviceData = productData[associatedServiceName] || { title: associatedServiceName, services: [], appData: {} };
          serviceData.services.push({
            id,
            ...service.details
          });
          if (!serviceData.appData[serviceType]) {
            serviceData.appData[serviceType] = 0;
          }
          serviceData.appData[serviceType] += 1;
          productData[associatedServiceName] = serviceData;
          assiciatedServiceData[associatedProduct] = productData;
          environmentData[serviceNature] = assiciatedServiceData;
          node[associatedEnv] = environmentData;
          treeData[GLOBAL_SERVICE] = node;
        }
      }
    });
    filterData[0].filter = this.convertObjectIntoArray(filteredNodes);
    filterData[1].filter = this.convertObjectIntoArray(filteredClusters);
    filterData[2].filter = this.convertObjectIntoArray(filteredEnvironment);
    // filterData[3].filter = this.convertObjectIntoArray(filteredServiceType);
    filterData[3].filter = this.convertObjectIntoArray(filteredServiceNature);
    filterData[4].filter = this.convertObjectIntoArray(filteredProducts);
    this.setState({
      tableData: treeData,
      filterData
    });
    this.getAppDataServices(treeData);
  }

  convertObjectIntoArray = (obj: any) => {
    const keys = Object.keys(obj);
    return keys.map((key) => {
      return obj[key];
    });
  };

  getAppDataServices = (treeData: any) => {
    const nodeKeys = Object.keys(treeData);
    const servicesLength: any = {};
    nodeKeys.forEach((nodeKey: any) => {
      if (nodeKey === GLOBAL_SERVICE) {
        const uniqueProducts: any = [];
        const environmentData = treeData[GLOBAL_SERVICE];
        const environemntKeys = Object.keys(environmentData);
        environemntKeys.forEach((enviornemntKey: any) => {
          const commonBusinessServices = environmentData[enviornemntKey];
          const commonBusinessKeys = Object.keys(commonBusinessServices);
          commonBusinessKeys.forEach((commonBusinessKey: any) => {
            const productData = commonBusinessServices[commonBusinessKey];
            const productKeys = Object.keys(productData);
            productKeys.forEach((productKey: any) => {
              if (uniqueProducts.indexOf(productKey) === -1) {
                uniqueProducts.push(productKey);
              }
              servicesLength[nodeKey] = servicesLength[nodeKey] || {};
              servicesLength[nodeKey].uniqueProducts = uniqueProducts.length;
            });
          });
        });
      } else {
        const uniqueProducts: any = [];
        const clusterData = treeData[nodeKey];
        const clusterKeys = Object.keys(clusterData);
        clusterKeys.forEach((clusterKey: any) => {
          const environmentData = clusterData[clusterKey];
          const environemntKeys = Object.keys(environmentData);
          environemntKeys.forEach((enviornemntKey: any) => {
            const commonBusinessServices = environmentData[enviornemntKey];
            const commonBusinessKeys = Object.keys(commonBusinessServices);
            commonBusinessKeys.forEach((commonBusinessKey: any) => {
              const productData = commonBusinessServices[commonBusinessKey];
              const productKeys = Object.keys(productData);
              productKeys.forEach((productKey: any) => {
                if (uniqueProducts.indexOf(productKey) === -1) {
                  uniqueProducts.push(productKey);
                }
                const serviceDatas = productData[productKey];
                const serviceDataKeys = Object.keys(serviceDatas);
                serviceDataKeys.forEach((serviceDataKey: any) => {
                  const appData = serviceDatas[serviceDataKey].appData;
                  const appDataKeys = Object.keys(appData);
                  appDataKeys.forEach((appDataKey: any) => {
                    servicesLength[nodeKey] = servicesLength[nodeKey] || {};
                    servicesLength[nodeKey][appDataKey] = servicesLength[nodeKey][appDataKey] || 0;
                    servicesLength[nodeKey][appDataKey] += appData[appDataKey];
                    servicesLength[nodeKey].uniqueProducts = uniqueProducts.length;
                  });
                });
              });
            });
          });
        });
      }
    });
    this.setState({
      servicesLength
    });
  };

  toggleNode = (key: any) => {
    const { tableData } = this.state;
    tableData[key].isOpened = !tableData[key].isOpened;
    this.setState({
      tableData,
      servicesData: null,
      activeNode: key,
    });
  }

  toggleCluster = (nodeKey: any, clusterKey: any) => {
    const { tableData } = this.state;
    tableData[nodeKey][clusterKey].isOpened = !tableData[nodeKey][clusterKey].isOpened;
    this.setState({
      tableData,
      servicesData: null,
      activeNode: clusterKey
    });
  }

  toggleEnvironemt = (nodeKey: any, clusterKey: any, environmentKey: any) => {
    const { tableData } = this.state;
    tableData[nodeKey][clusterKey][environmentKey].isOpened = !tableData[nodeKey][clusterKey][environmentKey].isOpened;
    this.setState({
      tableData,
      servicesData: null,
      activeNode: environmentKey
    });
  }

  onClickGlobalEnvironment = (nodeKey: any, environmentKey: any) => {
    const { tableData } = this.state;
    const data = JSON.parse(JSON.stringify(tableData[nodeKey][environmentKey]));
    this.setState({
      servicesData: data,
      activeNode: environmentKey,
      labelText: GLOBAL_SERVICE,
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
    const { servicesLength, activeNode, filters } = this.state;
    const retData: any = [];
    if (nodes) {
      const filteredNodes = filters['Product Enclave'];
      let keys = Object.keys(nodes);
      const globalIndex = keys.indexOf(GLOBAL_SERVICE);
      if (globalIndex !== -1) {
        //push the global services at last
        keys.splice(globalIndex, 1);
        keys.push(GLOBAL_SERVICE);
      }
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const node = nodes[key];
        if ((filteredNodes && filteredNodes.indexOf(key) !== -1) || !filteredNodes) {
          retData.push(
            <div className="tbody" key={v4()}>
              <div className="tbody-inner">
                <div className={`tbody-td first ${activeNode === key ? 'active' : ''}`} onClick={() => this.toggleNode(key)} title={key}>
                  <div className={node.isOpened ? "caret-down" : "caret-right"}></div>
                  {this.nodeMapping[key]}
                </div>
                <div className="tbody-td">{servicesLength[key] ? (servicesLength[key]['uniqueProducts'] || 0) : 0}</div>
                <div className="tbody-td">{servicesLength[key] ? (servicesLength[key]['App'] || 0) : 0}</div>
                <div className="tbody-td">{servicesLength[key] ? (servicesLength[key]['Data'] || 0) : 0}</div>
                <div className="tbody-td">
                  <div className="d-block text-center action-edit">
                    {node.showMenu &&
                      <>
                        <div className="open-create-menu-close" onClick={(e) => { this.handleMenuToggle(key) }}></div>
                        <div className="text-center open-create-menu">
                          <a>Add New Product</a>
                          <a>Add Cluster</a>
                          <a>Add Cloud Managed Services</a>
                          <a>Add Gateway Services</a>
                        </div>
                      </>
                    }
                    <button className="asset-white-button min-width-inherit m-r-0" onClick={(e) => { this.handleMenuToggle(key) }}>
                      <a className="fa fa-ellipsis-h"></a>
                    </button>
                  </div>
                </div>
              </div>
              {
                node.isOpened ?
                  <Collapse className="collapse-content" isOpen={node.isOpened}>
                    {
                      node.isGlobalService ?
                        this.renderGlobalEnvironments(key, node) :
                        this.renderClusters(key, node)
                    }
                  </Collapse> : <></>
              }
            </div>
          );
        }
      }
    }
    return retData;
  };

  renderClusters = (nodeKey: any, clusters: any) => {
    const { activeNode, filters } = this.state;
    const filteredClusters = filters['Clusters'];
    const keys = Object.keys(clusters);
    const retData: any = [];
    keys.forEach(((key: any, index: any) => {
      if ((filteredClusters && filteredClusters.indexOf(key) !== -1) || !filteredClusters) {
        if (key !== 'isOpened' && key !== 'showMenu') {
          const cluster = clusters[key];
          retData.push(
            <div className="tbody">
              <div className="tbody-inner">
                <div className={`tbody-td first ${activeNode === key ? 'active' : ''}`} onClick={() => this.toggleCluster(nodeKey, key)} title={key}>
                  <div className={cluster.isOpened ? "caret-down" : "caret-right"}></div>
                  {this.clusterMapping[key]}
                </div >
                {/* </Link> */}
              </div >
              {
                cluster.isOpened ?
                  <Collapse className="collapse-content" isOpen={cluster.isOpened}>
                    {this.renderEnviornents(nodeKey, key, cluster)}
                  </Collapse> : <></>
              }
            </div >
          );
        }
      }
    }));
    return retData;
  };

  renderEnviornents = (nodeKey: any, clusterKey: any, environents: any) => {
    const { activeNode, filters } = this.state;
    const filteredEnvironments = filters['Environments'];
    const retData: any = [];
    const keys = Object.keys(environents);
    keys.forEach(((key: any) => {
      if ((filteredEnvironments && filteredEnvironments.indexOf(key) !== -1) || !filteredEnvironments) {
        if (key !== 'isOpened' && key !== 'showMenu') {
          // const environment = environents[key];
          retData.push(
            <div className="tbody">
              <div className="tbody-inner">
                <div className={`tbody-td first ${activeNode === key ? 'active' : ''}`} onClick={() => this.onClickEnvironment(nodeKey, clusterKey, key)}>
                  {key}
                </div >
                {/* </Link> */}
              </div >
              {/* {
                environment.isOpened ?
                  <Collapse className="collapse-content" isOpen={environment.isOpened}>
                    {this.renerAppDataServices(nodeKey, clusterKey, key, environment)}
                  </Collapse> : <></>
              } */}
            </div >
          );
        }
      }
    }));
    return retData;
  };

  renderGlobalEnvironments = (nodeKey: any, environents: any) => {
    const { activeNode, filters } = this.state;
    const filteredEnvironments = filters['Environments'];
    const retData: any = [];
    const keys = Object.keys(environents);
    keys.forEach(((key: any) => {
      if ((filteredEnvironments && filteredEnvironments.indexOf(key) !== -1) || !filteredEnvironments) {
        if (key !== 'isOpened' && key !== 'showMenu' && key !== 'isGlobalService') {
          const environment = environents[key];
          retData.push(
            <div className="tbody">
              <div className="tbody-inner">
                <div className={`tbody-td first ${activeNode === key ? 'active' : ''}`} onClick={() => this.onClickGlobalEnvironment(nodeKey, key)}>
                  <div className={environment.isOpened ? "caret-down" : "caret-right"}></div>
                  {key}
                </div >
              </div >
            </div >
          );
        }
      }
    }));
    return retData;
  };

  renerAppDataServices = (nodeKey: any, clusterKey: any, environmentKey: any, services: any) => {
    const { activeNode, filters } = this.state;
    const filteredServiceType = filters['Service Type'];
    const retData: any = [];
    const keys = Object.keys(services);
    keys.forEach(((key: any) => {
      if ((filteredServiceType && filteredServiceType.indexOf(key) !== -1) || !filteredServiceType) {
        if (SERVICE_MAPPING[key]) {
          retData.push(
            <div className="tbody">
              <div className="tbody-inner">
                <div style={{ paddingLeft: '80px' }} className={`tbody-td first ${activeNode === key ? 'active' : ''}`} onClick={() => this.onClickAppDataService(nodeKey, clusterKey, environmentKey, key)}>
                  {SERVICE_MAPPING[key]}
                </div>
              </div>
            </div>
          );
        }
      }
    }));
    return retData;
  };

  toggleCommonBusinessService = (serviceKey: any) => {
    const { servicesData } = this.state;
    servicesData[serviceKey].isOpened = !servicesData[serviceKey].isOpened;
    this.setState({
      servicesData
    });
  };

  toggleProducts = (serviceKey: any, productKey: any) => {
    const { servicesData } = this.state;
    servicesData[serviceKey][productKey].isOpened = !servicesData[serviceKey][productKey].isOpened;
    this.setState({
      servicesData
    });
  };

  toggleAssociatedServices = (serviceKey: any, productKey: any, associatedServiceKey: any) => {
    const { servicesData } = this.state;
    servicesData[serviceKey][productKey][associatedServiceKey].isOpened = !servicesData[serviceKey][productKey][associatedServiceKey].isOpened;
    this.setState({
      servicesData
    });
  };

  renderCommonBusinessServices = () => {
    const { servicesData, filters } = this.state;
    const filteredServiceNature = filters['Service Nature'];
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
      let servicesJSX: any = [];
      const keys = Object.keys(servicesData);
      keys.forEach((key: any) => {
        if ((filteredServiceNature && filteredServiceNature.indexOf(key) !== -1) || !filteredServiceNature) {
          if (SERVICE_MAPPING[key]) {
            const service = servicesData[key];
            servicesJSX.push(
              <>
                <div className="tbody" onClick={() => this.toggleCommonBusinessService(key)}>
                  <div className="name" style={{ paddingLeft: '15px' }}>
                    {SERVICE_MAPPING[key]} <span><i className="fa fa-angle-down"></i></span>
                  </div>
                </div>
                {
                  service.isOpened ?
                    this.renderProducts(key, service) : <></>
                }
              </>
            );
          }
        }
      });
      return <div className="data-table">
        {tableHead}
        {servicesJSX}
      </div>;
    }
    return <></>;
  };

  renderProducts = (serviceKey: any, service: any) => {
    const { filters } = this.state;
    const keys = Object.keys(service);
    const filteredProducts = filters['Products'];
    let retData: any = [];
    keys.forEach((key: any) => {
      if ((filteredProducts && filteredProducts.indexOf(key) !== -1) || !filteredProducts) {
        if (key !== 'isOpened') {
          const product = service[key];
          retData.push(
            <div className="data-table">
              <div className="tbody" onClick={() => this.toggleProducts(serviceKey, key)}>
                <div className="name" style={{ paddingLeft: '30px' }}>
                  {key} <span><i className="fa fa-angle-down"></i></span>
                </div>
              </div>
              {
                product.isOpened ?
                  this.renderAssociatedServices(serviceKey, key, product) : <></>
              }
            </div>
          );
        }
      }
    });
    return retData;
  };

  renderAssociatedServices = (serviceKey: any, productKey: any, associatedServices: any) => {
    const keys = Object.keys(associatedServices);
    let retData: any = [];
    keys.forEach((key: any) => {
      if (key !== 'isOpened') {
        const associatedService = associatedServices[key];
        retData.push(
          <div className="data-table">
            <div className="tbody" onClick={() => this.toggleAssociatedServices(serviceKey, productKey, key)}>
              <div className="name" style={{ paddingLeft: '45px' }}>
                {key} <span><i className="fa fa-angle-down"></i></span>
              </div>
            </div>
            {
              associatedService.isOpened ?
                this.renderDirectServices(associatedService.services) : <></>
            }
          </div>
        );
      }
    });
    return retData;
  };

  renderDirectServices = (list: any) => {
    let retData = [];
    const { accountId, cloudName } = this.state;
    if (list) {
      retData = list.map((service: any) => {
        return (
          <div className="tbody">
            <div className="service-name" style={{ paddingLeft: '60px' }} title={service.description}> <Link onClick={(e: any) => this.onClickDirectService(e, service)} to={`${PLUGIN_BASE_URL}/storage-details?accountId=${accountId}&cloudName=${cloudName}`}>{service.name} {service.associatedGlobalServiceLocation ? `(${service.associatedGlobalServiceLocation})` : ''}</Link></div>
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
      if (serviceData[i].id === service.id) {
        existingIndex = i;
        break;
      }
    }
    if (existingIndex !== -1) {
      serviceData.splice(existingIndex, 1);
    }
    let avgScore = (service.performance.score + service.availability.score + service.security.score + service.dataProtection.score + service.userExperiance.score) / 5;
    serviceData.push({
      id: service.id,
      name: service.name,
      labelText,
      organizationUnit: service.associatedOU,
      serviceType: service.serviceType,
      serviceScore: avgScore.toFixed(2),
      associatedProduct: service.associatedProduct,
      asscociatedEnv: service.associatedEnv,
      associatedCloudElementType: service.associatedCloudElement
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
    const { labelText, tableData, servicesData, filterData } = this.state;
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
                  {this.renderNodes(tableData)}
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
                  {this.renderCommonBusinessServices()}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}