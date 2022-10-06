import * as React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../Breadcrumbs';
import { configFun } from '../../config';
import { images } from '../../img';
import { CommonService } from '../_common/common';
// import { SelectCloudFilter } from '../../components/SelectCloudFilter';
import { RestService } from '../_service/RestService';
import { PLUGIN_BASE_URL } from '../../constants';
import AlertMessage from '../../components/AlertMessage';

export class AddDatasource extends React.Component<any, any> {
	breadCrumbs: any;
	config: any;
	constructor(props: any) {
		super(props);
		let accountId = CommonService.getParameterByName('accountId', window.location.href);
		let serverName = CommonService.getParameterByName('cloudName', window.location.href);
		this.state = {
			environment: serverName ? serverName?.toLowerCase() : '',
			account: accountId ? accountId : '',
			sourceList: [],
			environmentList: [],
			accountList: [],
			searchkey: '',
			accountFromUrl: accountId ? accountId : '',
			environmentFromUrl: serverName ? serverName?.toLowerCase() : '',
			isAlertOpen: false,
			severity: null,
			message: null,
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

	async componentDidMount() {
		await this.getMasterDataSource();
		await RestService.getData(this.config.GET_ALL_ACCOUNT, null, null).then((response: any) => {
			if (response && response.length > 0) {
				const accounts: any = [];
				response.forEach((account: any) => {
					accounts.push(account.accountId);
				});
				this.setState({
					accountList: accounts,
				});
			}
		});
	}

	getMasterDataSource = async () => {
		try {
			await RestService.getDataWithAuth(this.config.GET_MASTER_DATASOURCE, null, null).then((response: any) => {
				this.manipulateData(response);
				console.log('Loading Asstes : ', response);
			});
		} catch (err) {
			console.log('Loading Asstes failed. Error: ', err);
		}
	};

	manipulateData = (data: any) => {
		let { environmentList } = this.state;
		let dataobj: any = {};
		if (data && data.length > 0) {
			for (let i = 0; i < data.length; i++) {
				let datasource = data[i];
				dataobj[datasource.cloudType] = dataobj[datasource.cloudType] || [];
				datasource.jsonData['uniqId'] = datasource.id;
				dataobj[datasource.cloudType].push(datasource.jsonData);
				if (environmentList && environmentList.length > 0) {
					if (environmentList.indexOf(datasource.cloudType) === -1) {
						environmentList.push(datasource.cloudType);
					}
				} else {
					environmentList.push(datasource.cloudType);
				}
			}
		}
		this.setState({
			sourceList: dataobj,
			environmentList
		});
	};

	displayDataSource = () => {
		let retData: any = [];
		const { sourceList, environment, account } = this.state;
		// let accountId = CommonService.getParameterByName('accountId', window.location.href);
		if (sourceList) {
			Object.keys(sourceList).map((source, indexedDB) => {
				if ((source == environment || environment === '') && !sourceList[source]['isHide']) {
					retData.push(
						<React.Fragment>
							<div className="services-heading">
								<span>
									<img src={images.awsLogo} alt="" />
								</span>
								<h5>{source ? source : 'Others'}</h5>
							</div>
							<div className="source-inner-box">
								{sourceList[source] &&
									sourceList[source].map((accountdata: any, i: any) => {
										if (!accountdata.isHide) {
											return (
												<React.Fragment>
													{account && environment ?
														<Link
															to={`${PLUGIN_BASE_URL}/add-datasource-credential?sourceName=${environment}&accountId=${account}&Id=${accountdata.name}`}
														>
															<div className="source-box">
																<div className="images">
																	<img
																		src={accountdata.info.logos.small}
																		height="50px"
																		width="50px"
																		alt=""
																	/>
																</div>
																<div className="source-content">
																	<label>{accountdata.name}</label>
																	<span>{accountdata.type}</span>
																	<p>{accountdata.info.description}</p>
																</div>
															</div>
														</Link>
														:
														// <button>
														<div className="source-box" onClick={() => this.toggleAlert("Please select account and environment", "warning", true)}>
															<div className="images">
																<img
																	src={accountdata.info.logos.small}
																	height="50px"
																	width="50px"
																	alt=""
																/>
															</div>
															<div className="source-content">
																<label>{accountdata.name}</label>
																<span>{accountdata.type}</span>
																<p>{accountdata.info.description}</p>
															</div>
														</div>
														// </button>
													}
												</React.Fragment>
											);
										}
										return
									})}
							</div>
						</React.Fragment>
					);
				}
			});
		}
		if (retData && retData.length == 0) {
			retData.push(
				<div className="d-flex">
					<span>Data source not found, select other account.</span>
				</div>
			);
		}
		return retData;
	};

	onChangeDataSource = (e: any) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	handleStateChange = (e: any) => {
		const { sourceList } = this.state;
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
		Object.keys(sourceList).map((source, indexedDB) => {
			{
				sourceList[source] &&
					sourceList[source].map((accountdata: any, i: any) => {
						if (accountdata.name.toLowerCase().indexOf(value) === -1) {
							sourceList[source][i].isHide = true;
						} else {
							sourceList[source][i].isHide = false;
						}
					});
				let count = 0;
				for (let j = 0; j < sourceList[source].length; j++) {
					if (sourceList[source][j].isHide == true) {
						count++;
					}
				}
				if (count == sourceList[source].length) {
					sourceList[source]['isHide'] = true;
				} else {
					sourceList[source]['isHide'] = false;
				}
			}
		})
		this.setState({
			sourceList
		})
	}

	toggleAlert = (message: any, severity: any, isAlertOpen: any) => {
		this.setState({
			isAlertOpen,
			message,
			severity,
		});
	};

	handleCloseAlert = () => {
		this.setState({
			isAlertOpen: false,
			message: '',
			severity: '',
		});
	}

	render() {
		const { environment, account, environmentList, accountList, searchkey, accountFromUrl, environmentFromUrl, isAlertOpen, severity, message } = this.state;
		return (
			<div className="add-data-source-container">
				<AlertMessage handleCloseAlert={this.handleCloseAlert} open={isAlertOpen} severity={severity} msg={message}></AlertMessage>
				<Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="ASSET MANAGEMENT" />
				<div className="add-data-source-page-container">
					<div className="data-source-section">
						<div className="source-head">
							<h3>inputs</h3>
							<div className="right-search-bar">
								<div className="form-group search-control m-b-0">
									<button className="btn btn-search">
										<i className="fa fa-search" />
									</button>
									<input type="text" name="searchkey" value={searchkey} className="input-group-text" placeholder="Search" onChange={this.handleStateChange} />
								</div>
								<div className="back-btn">
									<Link
										to="/a/xformation-assetmanager-ui-plugin/environments"
										type="button"
										className="btn btn-link"
									>
										<i className="far fa-arrow-alt-circle-left" />Back
									</Link>
								</div>
							</div>
						</div>
						<div className="source-content">
							{/* <div className="heading">
								<Link
									to={`${PLUGIN_BASE_URL}/add-data-source-product?accountId=${account}&&cloudName=${environment}`}
									type="button"
									className="asset-blue-button"
								>
									Add input
								</Link>
							</div> */}
							<div className="heading">
								<h4>Input</h4>
							</div>
							<div className="account-details-heading">
								<h5>Account Details</h5>
							</div>
							{/* {environment == '' && account == '' &&  */}
							<div className="environgment-details">
								<div className="form-group description-content">
									<label htmlFor="description">Select Environment</label>
									<select
										className="input-group-text"
										name="environment"
										value={environment}
										onChange={this.onChangeDataSource}
										disabled={accountFromUrl && environmentFromUrl}
									>
										<option key={-1} value={''}>
											Select Environment
										</option>
										{environmentList &&
											environmentList.length > 0 &&
											environmentList.map((val: any, index: any) => {
												return (
													<option key={index} value={val}>
														{val}
													</option>
												);
											})}
									</select>
								</div>
								<div className="form-group description-content">
									<label htmlFor="description">Select Account</label>
									<select
										className="input-group-text"
										name="account"
										value={account}
										onChange={this.onChangeDataSource}
										disabled={accountFromUrl && environmentFromUrl}
									>
										<option key={-1} value={''}>
											Select Account
										</option>
										{accountList &&
											accountList.length > 0 &&
											accountList.map((val: any, index: any) => {
												return (
													<option key={index} value={val}>
														{val}
													</option>
												);
											})}
									</select>
								</div>
							</div>
							{/* } */}
							{/* <div className="services-heading">
								<span>
									<img src={images.awsLogo} alt="" />
								</span>
								<h5>Account Details</h5>
							</div> */}
							<div className="source-boxs">{this.displayDataSource()}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
