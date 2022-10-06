import * as React from 'react';
// import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../Breadcrumbs';
// import { configFun } from '../../config';
import { images } from '../../img';
// import { CommonService } from '../_common/common';
// import { SelectCloudFilter } from '../../components/SelectCloudFilter';
// import { RestService } from '../_service/RestService';
// import { PLUGIN_BASE_URL } from '../../constants';

export class ExploreDataSourceDetail extends React.Component<any, any> {
	breadCrumbs: any;
	constructor(props: any) {
		super(props);
		this.state = {
			queryName: '',
			account: '',
			showMenu: false,
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
	}

	async componentDidMount() {
		// await this.getAccountList();
	}

	handleStateChange = (e: any) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};
	toggleMenu = () => {
		this.setState({
			showMenu: !this.state.showMenu
		})
	}

	render() {
		return (
			<div className="add-data-source-container">
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
									<input type="text" className="input-group-text" placeholder="Search" />
								</div>
								<div className="back-btn">
									<button type="button" className="btn btn-link">
										<i className="far fa-arrow-alt-circle-left" />Back
									</button>
								</div>
							</div>
						</div>
						<div className="source-content">
							<div className="heading">
								<h4>Add inputs</h4>
							</div>
							<div className="source-content">
								<div className="source-details">
									<div className="row">
										<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
											<div className="source-box">
												<div className="source-detail-content">
													<div className="images">
														<img src={images.awsLogo} alt="" />
													</div>
													<div className="source-content">
														<label>AWS-pullMetric-Api</label>
														<span>cloud watch</span>
														<p>Pull aes metrix with cloud API</p>
													</div>
												</div>
												<div className="explore-content">
													<div className="explore-head">
														<div className="row">
															<div className="col-xl-6 col-lg-5 col-md-12 col-sm-12 col-xs-12">
																<div className="explore-head-left">
																	<label>Query Name</label>
																	<input type="text" className="form-control" />
																</div>
															</div>
															<div className="col-xl-6 col-lg-7 col-md-12 col-sm-12 col-xs-12">
																<div className="explore-head-right">
																	<ul>
																		<li>
																			<button
																				type="button"
																				className="btn btn-light split-btn"
																			>
																				<i className="fal fa-pause" />
																				Split
																			</button>
																		</li>
																		<li>
																			<div className="form-group time-content">
																				<select
																					className="input-group-text"
																					name="environment"
																					value=""
																					onChange={this.handleStateChange}
																				>
																					<option
																						key="1"
																						value="Last 1 hours"
																					>
																						Last 1 hours
																					</option>
																					<option
																						key="2"
																						value="Last 2 hours"
																					>
																						Last 2 hours
																					</option>
																					<option
																						key="3"
																						value="Last 3 hours"
																					>
																						Last 3 hours
																					</option>
																					<option
																						key="4"
																						value="Last 4 hours"
																					>
																						Last 4 hours
																					</option>
																					<option
																						key="5"
																						value="Last 5 hours"
																					>
																						Last 5 hours
																					</option>
																				</select>
																				<i className="far fa-clock" />
																			</div>
																		</li>
																		<li>
																			<button className="asset-blue-button">
																				Run Query
																			</button>
																		</li>
																		<li>
																			<button type="button" onClick={this.toggleMenu}
																				className="btn btn-link list-btn">
																				<i className="fas fa-bars" />
																			</button>
																			{this.state.showMenu == true && <div className="menu-list">
																				<ul>
																					<li><a href="#"><i className="fal fa-exclamation-circle"></i>Helpe</a></li>
																					<li><a href="#"><i className="fas fa-clone"></i>Duplicate</a></li>
																					<li><a href="#"><i className="far fa-eye"></i>Disable</a></li>
																					<li><a href="#"><i className="fas fa-trash-alt"></i>Delete</a></li>
																					<li><a href="#"><i className="fas fa-th-large"></i>Move</a></li>
																				</ul>
																			</div>
																			}
																		</li>
																	</ul>
																</div>
															</div>
														</div>
													</div>
													<div className="region-head">
														<div className="row d-flex align-items-center justify-content-start">
															<div className="col-xl-1 col-lg-2 col-md-2 col-sm-6 col-xs-12">
																<label>Region &#8758;</label>
															</div>
															<div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-xs-12">
																<div className="time-content">
																	<select
																		className="input-group-text"
																		name="environment"
																		value=""
																		onChange={this.handleStateChange}
																	>
																		<option key="1" value="Default">
																			Default
																		</option>
																		<option key="2" value="1">
																			1
																		</option>
																		<option key="2" value="2">
																			2
																		</option>
																	</select>
																</div>
															</div>
															<div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-xs-12">
																<div className="time-content">
																	<select
																		className="input-group-text"
																		name="environment"
																		value=""
																		onChange={this.handleStateChange}
																	>
																		<option key="1" value="Default">
																			CloudWatch Metrics
																		</option>
																		<option key="2" value="1">
																			1
																		</option>
																		<option key="2" value="2">
																			2
																		</option>
																	</select>
																</div>
															</div>
															<div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-xs-12">
																<div className="time-content">
																	<select
																		className="input-group-text"
																		name="environment"
																		value=""
																		onChange={this.handleStateChange}
																	>
																		<option key="1" value="Default">
																			Metrics Search
																		</option>
																		<option key="2" value="1">
																			1
																		</option>
																		<option key="2" value="2">
																			2
																		</option>
																	</select>
																</div>
															</div>
														</div>
													</div>
													<div className="environgment-details metrics-name">
														<div className="row">
															<div className="col-xl-4 col-lg-4 col-md-4 col-smm-12 col-xs-12">
																<div className="form-group description-content">
																	<label htmlFor="description">Name Space</label>
																	<select
																		className="input-group-text"
																		name="environment"
																		value=""
																		onChange={this.handleStateChange}
																	>
																		<option key="1" value="aws">
																			Select
																		</option>
																		<option key="2" value="Cloud">
																			1
																		</option>
																	</select>
																</div>
															</div>
															<div className="col-xl-4 col-lg-4 col-md-4 col-smm-12 col-xs-12">
																<div className="form-group description-content">
																	<label htmlFor="description">Metrics Name</label>
																	<select
																		className="input-group-text"
																		name="environment"
																		value=""
																		onChange={this.handleStateChange}
																	>
																		<option key="1" value="aws">
																			Select
																		</option>
																		<option key="2" value="Cloud">
																			1
																		</option>
																	</select>
																</div>
															</div>
															<div className="col-xl-4 col-lg-4 col-md-4 col-smm-12 col-xs-12">
																<div className="form-group description-content">
																	<label htmlFor="description">Statistic</label>
																	<select
																		className="input-group-text"
																		name="environment"
																		value=""
																		onChange={this.handleStateChange}
																	>
																		<option key="1" value="aws">
																			Select
																		</option>
																		<option key="2" value="Cloud">
																			1
																		</option>
																	</select>
																</div>
															</div>
														</div>
													</div>
													<div className="dimension-heading">
														<label>Dimension</label>
														<button
															type="button"
															className="btn btn-light dimension-add-btn"
														>
															<i className="fas fa-plus" />
														</button>
													</div>
													<div className="dimension-heading">
														<label>
															Match exact &#8722; <span>optional</span>
															<i className="fal fa-exclamation-circle" />
														</label>
														<div className="switch">
															<input type="checkbox" id="switch" />
															<label htmlFor="switch">Switch</label>
														</div>

													</div>
													<div className="environgment-details metrics-name">
														<div className="row">
															<div className="col-xl-4 col-lg-4 col-md-4 col-smm-12 col-xs-12">
																<div className="form-group description-content">
																	<label htmlFor="description">
																		ID &#8722; <span>optional</span>
																		<i className="fal fa-exclamation-circle" />
																	</label>
																	<input type="text" className="form-control" />
																</div>
															</div>
															<div className="col-xl-4 col-lg-4 col-md-4 col-smm-12 col-xs-12">
																<div className="form-group description-content">
																	<label htmlFor="description">
																		Period<span />
																		<i className="fal fa-exclamation-circle" />
																	</label>
																	<input
																		type="text"
																		className="form-control"
																		placeholder="Auto"
																	/>
																</div>
															</div>
															<div className="col-xl-4 col-lg-4 col-md-4 col-smm-12 col-xs-12">
																<div className="form-group description-content">
																	<label htmlFor="description">
																		Alias &#8722; <span>optional</span>
																		<i className="fal fa-exclamation-circle" />
																	</label>
																	<input type="text" className="form-control" />
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="explore-buttons">
													<button className="asset-blue-button">
														<i className="fas fa-plus" /> Add query
													</button>
													<button className="asset-blue-button">
														<i className="far fa-clock" />Query history
													</button>
													<button className="asset-blue-button">
														<i className="fal fa-exclamation-circle" />inspector
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
