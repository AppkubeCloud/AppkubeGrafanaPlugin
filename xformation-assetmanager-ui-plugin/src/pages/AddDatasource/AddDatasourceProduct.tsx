import * as React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../Breadcrumbs';
import { configFun } from '../../config';
import { images } from '../../img';
// import { CommonService } from '../_common/common';
// import { SelectCloudFilter } from '../../components/SelectCloudFilter';
import { RestService } from '../_service/RestService';
import { PLUGIN_BASE_URL } from '../../constants';

export class AddDatasourceProduct extends React.Component<any, any> {
	breadCrumbs: any;
	config: any;
	constructor(props: any) {
		super(props);
		this.state = {
			environment: '',
			account: '',
			sourceList: [],
			environmentList: [],
			accountList: [],
			searchkey: ''
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
		await this.getAccountList();
	}

	getAccountList = async () => {
		try {
			await RestService.getDataWithAuth(this.config.GET_ALL_DATASOURCE, null, null).then((response: any) => {
				// this.setState({
				// 	sourceList: response
				// });
				this.manipulateData(response);
				console.log('Loading Asstes : ', response);
			});
		} catch (err) {
			console.log('Loading Asstes failed. Error: ', err);
		}
	};

	manipulateData = (data: any) => {
		let { environmentList, accountList } = this.state;
		let dataobj: any = {};
		if (data && data.length > 0) {
			for (let i = 0; i < data.length; i++) {
				if (data[i].accountID) {
					dataobj[data[i].cloudType] = dataobj[data[i].cloudType] || {};
					dataobj[data[i].cloudType][data[i].accountID] = dataobj[data[i].cloudType][data[i].accountID] || [];
					dataobj[data[i].cloudType][data[i].accountID].push(data[i]);
					if (environmentList && environmentList.length > 0) {
						if (environmentList.indexOf(data[i].cloudType) === -1) {
							environmentList.push(data[i].cloudType);
						}
					} else {
						environmentList.push(data[i].cloudType);
					}

					if (data[i].accountID && data[i].accountID != '') {
						if (accountList && accountList.length > 0) {
							if (accountList.indexOf(data[i].accountID) === -1) {
								accountList.push(data[i].accountID);
							}
						} else {
							accountList.push(data[i].accountID);
						}
					}
				}
			}
		}
		this.setState({
			sourceList: dataobj,
			environmentList,
			accountList
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
							<div className="account-details-heading">
								<span>
									<img src={images.awsLogo} alt="" />
								</span>
								<h5>{source}</h5>
							</div>
							<div className="row">
								<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
									<p className="account-input-heading">{source} Account specific Input sources</p>
								</div>
								{Object.keys(sourceList[source]).map((datasource, i) => {
									if (
										(account == '' || account == datasource) &&
										!sourceList[source][datasource]['isHide']
									) {
										return (
											<React.Fragment>
												<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
													<div className="services-heading">
														<p>
															Account &#8282;{' '}
															<span>
																{source} {datasource}
															</span>
														</p>
													</div>
												</div>
												<div className="source-boxs">
													{sourceList[source][datasource] &&
														sourceList[source][
															datasource
														].map((accountdata: any, i: any) => {
															if (
																(accountdata.accountID == account || account == '') &&
																!accountdata.isHide
															) {
																return (
																	<Link
																		to={`/datasources/edit/${accountdata.uid}`}
																	>
																		<div className="source-box">
																			<div className="images">
																				<img
																					src={accountdata.typeLogoUrl}
																					height="50px"
																					width="50px"
																					alt=""
																				/>
																			</div>
																			<div className="source-content">
																				<label>{accountdata.name}</label>
																				<span>{accountdata.cloudType}</span>
																				<p>Pull AWS matrics with cloud API</p>
																			</div>
																		</div>
																	</Link>
																);
															} else {
																return;
															}
														})}
												</div>
											</React.Fragment>
										);
									} else {
										return;
									}
								})}
							</div>
						</React.Fragment>
					);
				}
			});
		}
		if (retData.length == 0) {
			retData.push(<div>Selected Account Not found</div>);
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
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	handleSearchChange = (e: any) => {
		const { sourceList } = this.state;
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
		Object.keys(sourceList).map((source, indexedDB) => {
			{
				sourceList[source] &&
					Object.keys(sourceList[source]).map((datasource, i) => {
						sourceList[source][datasource].map((accountdata: any, i: any) => {
							if (accountdata.name.toLowerCase().indexOf(value) === -1) {
								sourceList[source][datasource][i].isHide = true;
							} else {
								sourceList[source][datasource][i].isHide = false;
							}
						});
						let count = 0;
						for (let j = 0; j < sourceList[source][datasource].length; j++) {
							if (sourceList[source][datasource][j].isHide == true) {
								count++;
							}
						}
						if (count == sourceList[source][datasource].length) {
							sourceList[source][datasource]['isHide'] = true;
							// sourceList[source]['isHide'] = true;
						} else {
							sourceList[source][datasource]['isHide'] = false;
							// sourceList[source]['isHide'] = false;
						}
					});
			}
		});
		this.setState({
			sourceList
		});
	};

	render() {
		const { environmentList, environment, account, accountList, searchkey } = this.state;
		return (
			<div className="add-data-source-container">
				<Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="ASSET MANAGEMENT" />
				<div className="add-data-source-page-container">
					<div className="data-source-product">
						<div className="source-head">
							<h3>inputs</h3>
						</div>
						<div className="source-content">
							<div className="add-input-content">
								<div className="row justify-content-end">
									<div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
										<div className="form-group description-content">
											<select
												className="input-group-text"
												name="environment"
												value={environment}
												onChange={this.onChangeDataSource}
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
									</div>
									<div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
										<div className="form-group description-content">
											<select
												className="input-group-text"
												name="account"
												value={account}
												onChange={this.onChangeDataSource}
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
									<div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-12">
										<div className="form-group">
											<div className="right-search-bar">
												<div className="form-group search-control m-b-0">
													<i className="fa fa-search" />
													<input
														type="text"
														className="input-group-text"
														placeholder="Search"
														name="searchkey"
														value={searchkey}
														onChange={this.handleSearchChange}
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-2 col-lg-3 col-md-6 col-sm-6 col-xs-12">
										<div className="back-btn">
											<Link
												to={`${PLUGIN_BASE_URL}/add-data-source`}
												type="button"
												className="asset-blue-button"
											>
												Add input
											</Link>
										</div>
									</div>
								</div>
							</div>
							<div className="specific-input-inner-content">{this.displayDataSource()}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
