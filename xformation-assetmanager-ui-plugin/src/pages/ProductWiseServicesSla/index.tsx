import * as React from 'react';
import { Breadcrumbs } from '../Breadcrumbs';
import { Bar } from 'react-chartjs-2';
import { RestService } from '../_service/RestService';
import { configFun } from '../../config';

const GLOBAL_SERVICE = 'Cloud Managed';

export class ProductWiseServicesSla extends React.Component<any, any> {
	breadCrumbs: any;
	config: any;
	nodeMapping: any = {};
	clusterMapping: any = {};
	constructor(props: any) {
		super(props);
		this.state = {
			chartData: [],
			auctionchartData: {
				labels: [],
				datasets: [
					{
						data: [],
						backgroundColor: ['#5AB66F', '#E08600', '#DC3F1F', '#DC3F1F', '#E08600']
					}
				]
			},
			accountId: '',
			tableData: [],
			environmentType: 'PROD',
			productName: 'AUCTION'
		};
		this.breadCrumbs = [
			{
				label: 'Home',
				route: `/`
			},
			{
				label: 'Assets | Environments',
				isCurrentPage: true
			}
		];
		this.config = configFun(props.meta.jsonData.apiUrl, props.meta.jsonData.mainProductUrl, props.meta.jsonData.grafanaUrl);
	}

	componentDidMount() {
		this.getServicesData();
	}

	getServicesData = async () => {
		try {
			await RestService.getData(`${this.config.GET_SERVICES_DATA}`, null, null).then((response: any) => {
				this.manipulateServiceData(response.services);
			});
		} catch (err) {
			console.log('Loading accounts failed. Error: ', err);
		}
	};

	manipulateServiceData = (services: any) => {
		const treeData: any = [];
		const { filterData } = this.state;
		// const filteredNodes: any = {};
		// const filteredClusters: any = {};
		// const filteredEnvironment: any = {};
		// const filteredServiceNature: any = {};
		// const filteredProducts: any = {};
		// let nodeIndex = 1;
		// let clusterIndex = 1;
		services.forEach((service: any) => {
			const { serviceNature, associatedProduct, associatedEnv, serviceType } = service.metadata_json;
			const node = treeData[associatedProduct] || {};
			const clusterData = node[associatedEnv] || {};
			const environmentData = clusterData[serviceNature] || {};
			const assiciatedServiceData = environmentData[serviceType] || {
				services: []
			};
			if (assiciatedServiceData && assiciatedServiceData.services) {
				assiciatedServiceData.services.push({
					...service.metadata_json
				});
			}
			
			environmentData[serviceType] = assiciatedServiceData;
			clusterData[serviceNature] = environmentData;
			node[associatedEnv] = clusterData;
			treeData[associatedProduct] = node;
		});
		console.log(treeData);
		this.setState({
			tableData: treeData,
			filterData
		});
		// this.getAppDataServices(treeData);
	};

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

	displayServiceSLA = () => {
		let { tableData, auctionchartData, productName } = this.state;
		let retData: any = [];
		let labels: any = [];
		if (tableData) {
			const products = Object.keys(tableData);
			products.map((product, index) => {
				let appcount = 0;
				let datacount = 0;
				let data: any = {};
				let chartticksdata: any = [];
				let chart: any = {};
				chart[product] = chart[product] || {};
				chart[product] = auctionchartData;
				let totalCount = 0;
				let envCount = 0;
				const environments = Object.keys(tableData[product]);
				let serviceByType: any = {};
				environments.map((environment, i) => {
					envCount = envCount + 1;
						const servicesType = tableData[product][environment];
						Object.keys(servicesType).map((serviceName, j) => {
							Object.keys(servicesType[serviceName]).map((servicetype) => {
								if (servicetype === 'Data') {
									datacount =
										datacount + servicesType[serviceName][servicetype].services.length;
								} else if (servicetype === 'App') {
									appcount =
										appcount + servicesType[serviceName][servicetype].services.length;
								}
								if (
									servicesType[serviceName][servicetype]['services'] &&
									servicesType[serviceName][servicetype]['services'].length > 0
								) {
									let servicearry = servicesType[serviceName][servicetype]['services'];
									serviceByType['performance'] = serviceByType['performance'] || 0;
									serviceByType['availability'] = serviceByType['availability'] || 0;
									serviceByType['security'] = serviceByType['security'] || 0;
									serviceByType['Reliabillity'] = serviceByType['Reliabillity'] || 0;
									serviceByType['End Usage'] = serviceByType['End Usage'] || 0;
									for (let i = 0; i < servicearry.length; i++) {
										serviceByType['performance'] =
											serviceByType['performance'] + servicearry[i].performance['score'];
										serviceByType['availability'] =
											serviceByType['availability'] + servicearry[i].availability['score'];
										serviceByType['security'] =
											serviceByType['security'] + servicearry[i].security['score'];
										serviceByType['Reliabillity'] =
											serviceByType['Reliabillity'] + servicearry[i].dataProtection['score'];
										serviceByType['End Usage'] =
											serviceByType['End Usage'] + servicearry[i].userExperiance['score'];

										// totalCount = totalCount + parseInt(servicearry[i].stats.totalCostSoFar);
									}
								}
							});
						});
				});
				debugger
				serviceByType['performance'] = serviceByType['performance'] / (appcount+datacount);
				serviceByType['availability'] = serviceByType['availability'] / (appcount+datacount);
				serviceByType['security'] = serviceByType['security'] / (appcount+datacount);
				serviceByType['Reliabillity'] = serviceByType['Reliabillity'] / (appcount+datacount); 
				serviceByType['End Usage'] = serviceByType['End Usage'] / (appcount+datacount);
				for (var val in serviceByType) {
					data[val] = serviceByType[val] || 0;
					// data[val] = data[val] + serviceByType[val];
					if (labels && labels.length > 0) {
						for (let j = 0; j < labels.length; j++) {
							if (labels.indexOf(val) === -1) {
								labels.push(val);
							}
						}
					} else {
						labels.push(val);
					}
				}
				Object.keys(data).map((ser, ind) => {
					chartticksdata.push(data[ser]);
				});
				chart[product].labels = labels;
				chart[product].datasets[0].data = chartticksdata;
				chartticksdata = [];
				retData.push(
					<div
						className={product == productName ? "services-sla-box active" : "services-sla-box"}
						onClick={() => {
							this.setState({ productName: product });
						}}
					>
						<a className="heading">{product}</a>
						<div className="contents">
							<ul>
								<li>
									<label>No of Env:</label>
									<span>{envCount}</span>
								</li>
								<li>
									<label>No of App Services:</label>
									<span>{appcount}</span>
								</li>
								<li>
									<label>No of Data Services:</label>
									<span>{datacount}</span>
								</li>
							</ul>
							<div className="production-chart">
								<Bar
									data={chart[product]}
									height={200}
									width={350}
									ref={React.createRef()}
									options={{
										responsive: false,
										plugins: {
											legend: {
												position: 'top',
												display: false
											},
											title: {
												display: true,
												text: `Total Cost : $${totalCount}`,
												color: '#202020',
												font: {
													size: 18
												}
											}
										},
										scales: {
											x: {
												ticks: {
													// maxRotation: 0,
													maxTicksLimit: 5
												}
											}
										}
									}}
								/>
							</div>
						</div>
					</div>
				);
			});
		}

		return retData;
	};

	displayEnvServices = () => {
		const { tableData, environmentType, productName } = this.state;
		let retData: any = [];
		let serviceList: any = [];
		if (tableData) {
			Object.keys(tableData).map((key, index) => {
				if (productName === key) {
					Object.keys(tableData[key]).map((service, i) => {
						if (serviceList && serviceList.length > 0) {
							if (serviceList.indexOf(service) === -1) {
								serviceList.push(service);
							}
						} else {
							serviceList.push(service);
						}
					});
				}
			});
			if (serviceList && serviceList.length > 0) {
				for (let i = 0; i < serviceList.length; i++) {
					retData.push(
						<li
							className={environmentType == serviceList[i] ? 'active' : ''}
							onClick={() => {
								this.setState({ environmentType: serviceList[i] });
							}}
						>
							{serviceList[i]}
						</li>
					);
				}
			}
		}
		return retData;
	};

	displayServiceData = () => {
		const { tableData, environmentType, productName } = this.state;
		let retServiceData: any = [];
		let servicesJSX: any = [];
		Object.keys(tableData).map((key, index) => {
			if (key === productName) {
				Object.keys(tableData[key]).map((service, i) => {
					if (service == environmentType) {
						Object.keys(tableData[key][service]).map((serviceName, j) => {
							let serviceByType: any = {};
							servicesJSX = [];
							Object.keys(tableData[key][service][serviceName]).map((servicetype) => {
								let servicearry = tableData[key][service][serviceName][servicetype]['services'];
								if (
									tableData[key][service][serviceName][servicetype]['services'] &&
									tableData[key][service][serviceName][servicetype]['services'].length > 0
								) {
									serviceByType['performance'] = serviceByType['performance'] || 0;
									serviceByType['availability'] = serviceByType['availability'] || 0;
									serviceByType['security'] = serviceByType['security'] || 0;
									serviceByType['Reliabillity'] = serviceByType['Reliabillity'] || 0;
									serviceByType['End Usage'] = serviceByType['End Usage'] || 0;
									for (let i = 0; i < servicearry.length; i++) {
										serviceByType['performance'] =
											serviceByType['performance'] + servicearry[i].performance['score'];
										serviceByType['availability'] =
											serviceByType['availability'] + servicearry[i].availability['score'];
										serviceByType['security'] =
											serviceByType['security'] + servicearry[i].security['score'];
										serviceByType['Reliabillity'] =
											serviceByType['Reliabillity'] + servicearry[i].dataProtection['score'];
										serviceByType['End Usage'] =
											serviceByType['End Usage'] + servicearry[i].userExperiance['score'];
									}
								}
								servicesJSX.push(
									<div className="service-box">
										<div className="heading">{servicetype}</div>
										<div className="contents">
											<div className="total-cost-text">
												Total Cost : $
												{serviceByType['performance'] +
													serviceByType['availability'] +
													serviceByType['security'] +
													serviceByType['Reliabillity'] +
													serviceByType['End Usage']}
											</div>
											<div className="quality-score-text">
												Quality Score :
												{((serviceByType['performance']/servicearry.length +
													serviceByType['availability']/servicearry.length +
													serviceByType['security']/servicearry.length +
													serviceByType['Reliabillity']/servicearry.length +
													serviceByType['End Usage']/servicearry.length) /5).toFixed(2)
													}%
											</div>
											<ul>
												<li>
													<label>Performance:</label>
													<span>
														{Math.round(serviceByType['performance'] / servicearry.length)}%{' '}
														<span style={{ backgroundColor: '#5AB66F' }} />
													</span>
												</li>
												<li>
													<label>Availability:</label>
													<span>
														{Math.round(
															serviceByType['availability'] / servicearry.length
														)}% <span style={{ backgroundColor: '#E08600' }} />
													</span>
												</li>
												<li>
													<label>Reliability:</label>
													<span>
														{Math.round(
															serviceByType['Reliabillity'] / servicearry.length
														)}% <span style={{ backgroundColor: '#DC3F1F' }} />
													</span>
												</li>
												<li>
													<label>Security:</label>
													<span>
														{Math.round(serviceByType['security'] / servicearry.length)}%{' '}
														<span style={{ backgroundColor: '#5AB66F' }} />
													</span>
												</li>
												<li>
													<label>End Usage:</label>
													<span>
														{Math.round(serviceByType['End Usage'] / servicearry.length)}%{' '}
														<span style={{ backgroundColor: '#E08600' }} />
													</span>
												</li>
											</ul>
										</div>
									</div>
								);
							});
							retServiceData.push(
								<React.Fragment>
									<div className="heading">
										<div className="row">
											<div className="col-md-7">
												<h3>{serviceName}</h3>
											</div>
											<div className="col-md-5">
												{/* <div className="show-more">
													Show More <i className="fa fa-chevron-down" />
												</div> */}
												<div className="form-group search-control m-b-0">
													<button className="btn btn-search">
														<i className="fa fa-search" />
													</button>
													<input
														type="text"
														className="input-group-text"
														placeholder="Search"
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="services-boxes">{servicesJSX}</div>
								</React.Fragment>
							);
						});
					}
				});
			}
		});
		return retServiceData;
	};

	render() {
		const { productName, tableData } = this.state;
		console.log(tableData);
		return (
			<div className="asset-container">
				<Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="ASSET MANAGEMENT" />
				<div className="services-sla-container">
					<div className="common-container border-bottom-0">
						<div className="services-heading">Product Wise Services SLA</div>
						{!tableData ||
							(tableData &&
								Object.keys(tableData).length === 0 && <div className="services-sla-boxs">Loading...</div>)}
						{tableData &&
							Object.keys(tableData).length > 0 && (
								<div className="services-sla-boxs">
									<div className="services-sla-inner">{this.displayServiceSLA()}</div>
								</div>
							)}
					</div>
					<div className="common-container border-bottom-0">
						<div className="services-heading">{productName}</div>
						{!tableData ||
							(tableData &&
								Object.keys(tableData).length === 0 && <div className="services-tabs">Loading...</div>)}
						{tableData &&
							Object.keys(tableData).length > 0 && (
								<div className="services-tabs">
									<ul className="tabs">{this.displayEnvServices()}</ul>
									<div className="services-contents active">
										<div className="environment-services">
											<div className="services-boxes">{this.displayServiceData()}</div>
										</div>
									</div>
								</div>
							)}
					</div>
				</div>
			</div>
		);
	}
}
