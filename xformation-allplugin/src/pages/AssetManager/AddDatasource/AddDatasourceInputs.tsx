import * as React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../../Breadcrumbs';
import { configFun } from '../../../config';
import { images } from '../../../img';
import { CommonService } from '../../_common/common';
// import { SelectCloudFilter } from '../../components/SelectCloudFilter';
import { RestService } from '../../_service/RestService';
import { PLUGIN_BASE_URL } from '../../../constants';

export class AddDatasourceInputs extends React.Component<any, any> {
	breadCrumbs: any;
	config: any;
	constructor(props: any) {
		super(props);
		this.state = {
			environment: '',
			account: '',
			sourceList: {}
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
			await RestService.getData(
				'http://localhost:3000/api/plugins/filter-datasource/key=cloudwatCH,TESTDATA,grafana-azure-monitor-datasource',
				null,
				null
			).then((response: any) => {
				console.log(response);
				this.manipulateData(response);
				// this.setState({
				// 	accountList: response
				// });
				console.log('Loading Asstes : ', response);
			});
		} catch (err) {
			console.log('Loading Asstes failed. Error: ', err);
		}
	};

	manipulateData = (data: any) => {
		// let datasource: any = [];
		let dataobj: any = {};
		if (data && data.length > 0) {
			for (let i = 0; i < data.length; i++) {
				dataobj[data[i].category] = dataobj[data[i].category] || [];
				dataobj[data[i].category].push(data[i]);
			}
		}
		this.setState({
			sourceList: dataobj
		});
	};

	displayDataSource = () => {
		let retData: any = [];
		const { sourceList } = this.state;
		console.log(sourceList);
		let accountId = CommonService.getParameterByName('accountId', window.location.href);
		if (sourceList) {
			Object.keys(sourceList).map((source, indexedDB) => {
				retData.push(
					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<div className="services-heading">
								<span>
									<img src={images.awsLogo} alt="" />
								</span>
								<h5>{source ? source : 'Others'}</h5>
							</div>
							<div className="account-specific-content">
								<span>{source} Account specific input source</span>
								<div className="specific-heading">
									<p>
										Account &#8758;
										{/* <span>{accountdata.uid}</span> */}
									</p>
								</div>
							</div>
							<div className="source-boxs">
								<div className="row">
									{sourceList[source] &&
										sourceList[source].map((accountdata: any, i: any) => {
											return (
												<div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12">
													<Link
														to={`${PLUGIN_BASE_URL}/plugins/asset-manager/environments/add-datasource-credential?sourceName=${accountdata.name}&&accountId=${accountId}`}
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
																<span>{accountdata.type}</span>
																<p>Receive traces and store in local Zipkin DB</p>
															</div>
														</div>
													</Link>
												</div>
											);
										})}
								</div>
							</div>
						</div>
					</div>
				);
			});
		}
		return retData;
	};

	onChangeDataSource = (e: any) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	render() {
		// const { environment, account } = this.state;
		return (
			<div className="add-data-source-container">
				<Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="ASSET MANAGEMENT" />
				<div className="add-data-source-page-container">
					<div className="data-source-section">
						<div className="source-content">
							<div className="add-input-content">
								<div className="form-group">
									<div className="right-search-bar">
										<div className="form-group search-control m-b-0">
											<i className="fa fa-search" />
											<input
												type="text"
												className="input-group-text"
												placeholder="Search"
											/>
										</div>
									</div>
								</div>
								<div className="back-btn">
									<button type="button" className="btn btn-outline-secondary btn-link">Cancel</button>
									{/* <button type="button" className="asset-blue-button">
										Cancel
									</button> */}
								</div>
							</div>
							<div className="specific-input-content">{this.displayDataSource()}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
