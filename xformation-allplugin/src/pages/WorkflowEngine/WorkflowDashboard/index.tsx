import * as React from 'react';
import { Breadcrumbs } from '../../Breadcrumbs';
import rfpImg from '../../../img/rfp-img.png';
import resourcesUserImg1 from '../../../img/dashboard/resources-user-img1.png';
import resourcesUserImg2 from '../../../img/dashboard/resources-user-img2.png';
import resourcesUserImg3 from '../../../img/dashboard/resources-user-img3.png';
import resourcesUserImg4 from '../../../img/dashboard/resources-user-img4.png';
import resourcesUserImg5 from '../../../img/dashboard/resources-user-img5.png';
// import resourcesUserImg from '../../../img/resources-user-img.png';
import { DateFormat } from './DateFormat';
import headerIcon from '../../../img/header-icon.png';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';
import { StageStatus } from '../../commonDS';
import { ROUTES } from '../../../constants';
import { prefixRoute } from '../../../utils/utils.routing';

ChartJS.register(ArcElement, Tooltip, Legend);

export class WorkflowDashboard extends React.Component<any, any> {
	breadCrumbs: any;
	constructor(props: any) {
		super(props);
		this.state = {
			workflowStatistics: {
				labels: ['Completed', 'Pending', 'In Progress', 'Un Assigned'],
				datasets: [
					{
						data: [27, 38, 15, 20],
						backgroundColor: ['#71A7FE', '#FF4A55', '#FFD55E', '#70DEAE']
					}
				]
			},
			workflowStatisticsOptions: {
				plugins: {
					legend: {
						labels: {
							usePointStyle: true,
							pointStyle: 'circle'
						},
						display: true,
						position: 'bottom',
						responsive: true,
						align: 'middle'
					},
					title: {
						display: true,
						text: '',
						position: 'bottom',
						color: '#202020',
						font: {
							size: 18
						}
					}
				}
			},
			overViewData: {
				total: null,
				labels: ['Procurement', 'HRMS', 'EMS', 'Xformation', 'SPM', 'xfo'],
				datasets: [
					{
						data: [85, 90, 80, 40, 60, 75],
						lineTension: 0.2,
						backgroundColor: ['#71EAFF']
					},
					{
						data: [100, 95, 100, 70, 80, 100],
						lineTension: 0.2,
						backgroundColor: ['#71A7FE']
					}
				]
			},
			overViewOptions: {
				plugins: {
					scales: {
						y: {
							ticks: {
								fontColor: 'black',
								stepSize: 10,
								beginAtZero: true
							},
							gridLines: {
								display: false
							}
						},
						x: {
							ticks: {
								fontColor: 'black',
								display: false,
								stepSize: 10
							},
							gridLines: {
								display: false
							}
						}
					},
					legend: {
						display: false
					},
					title: {
						display: false,
						text: 'Total Cost: $6,71,246',
						position: 'bottom',
						color: '#202020',
						font: {
							size: 18
						}
					},
					responsive: true
				}
			},
			resourcesData: [
				{
					profile: resourcesUserImg1,
					name: 'Angela Moss',
					product: 'Project - Xformation'
				},
				{
					profile: resourcesUserImg2,
					name: 'Angela Moss',
					product: 'Project - Xformation'
				},
				{
					profile: resourcesUserImg3,
					name: 'Angela Moss',
					product: 'Project - Xformation'
				},
				{
					profile: resourcesUserImg4,
					name: 'Angela Moss',
					product: 'Project - Xformation'
				},
				{
					profile: resourcesUserImg5,
					name: 'Angela Moss',
					product: 'Project - Xformation'
				},
				{
					profile: resourcesUserImg1,
					name: 'Angela Moss',
					product: 'Project - Xformation'
				},
				{
					profile: resourcesUserImg2,
					name: 'Angela Moss',
					product: 'Project - Xformation'
				},
				{
					profile: resourcesUserImg3,
					name: 'Angela Moss',
					product: 'Project - Xformation'
				},
				{
					profile: resourcesUserImg4,
					name: 'Angela Moss',
					product: 'Project - Xformation'
				},
				{
					profile: resourcesUserImg5,
					name: 'Angela Moss',
					product: 'Project - Xformation'
				}
			],
			projeuctListData: [
				{
					image: headerIcon,
					isStar: true,
					name: 'Procurement Solution',
					title: 'Last updated by Siddhesh D',
					time: '24 min ago',
					text:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ...',
					status: StageStatus.INPROGRESS
				},
				{
					image: headerIcon,
					isStar: false,
					name: 'Procurement Solution',
					title: 'Last updated by Siddhesh D',
					time: '24 min ago',
					text:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ...',
					status: StageStatus.INPROGRESS
				},
				{
					image: headerIcon,
					isStar: true,
					name: 'Procurement Solution',
					title: 'Last updated by Siddhesh D',
					time: '24 min ago',
					text:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ...',
					status: StageStatus.INPROGRESS
				},
				{
					image: headerIcon,
					isStar: false,
					name: 'Procurement Solution',
					title: 'Last updated by Siddhesh D',
					time: '24 min ago',
					text:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ...',
					status: StageStatus.INPROGRESS
				},
				{
					image: headerIcon,
					isStar: false,
					name: 'Procurement Solution',
					title: 'Last updated by Siddhesh D',
					time: '24 min ago',
					text:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ...',
					status: StageStatus.COMPLETED
				},
				{
					image: headerIcon,
					isStar: false,
					name: 'Procurement Solution',
					title: 'Last updated by Siddhesh D',
					time: '24 min ago',
					text:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ...',
					status: StageStatus.COMPLETED
				},
				{
					image: headerIcon,
					isStar: false,
					name: 'Procurement Solution',
					title: 'Last updated by Siddhesh D',
					time: '24 min ago',
					text:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ...',
					status: StageStatus.COMPLETED
				}
			],
			resourceAllocation: [
				{
					title: 'Xformation',
					userList: [
						{
							name: 'Angela Moss',
							designation: 'Employee',
							image: resourcesUserImg1
						},
						{
							name: 'Angela Moss',
							designation: 'Employee',
							image: resourcesUserImg2
						},
						{
							name: 'Angela Moss',
							designation: 'Employee',
							image: resourcesUserImg3
						},
						{
							name: 'Angela Moss',
							designation: 'Employee',
							image: resourcesUserImg4
						},
						{
							name: 'Angela Moss',
							designation: 'Employee',
							image: resourcesUserImg5
						},
						{
							name: 'Angela Moss',
							designation: 'Employee',
							image: resourcesUserImg1
						}
					]
				},
				{
					title: 'Xformation',
					userList: [
						{
							name: 'Angela Moss',
							designation: 'Employee',
							image: resourcesUserImg1
						},
						{
							name: 'Angela Moss',
							designation: 'Employee',
							image: resourcesUserImg2
						},
						{
							name: 'Angela Moss',
							designation: 'Employee',
							image: resourcesUserImg3
						},
						{
							name: 'Angela Moss',
							designation: 'Employee',
							image: resourcesUserImg4
						},
						{
							name: 'Angela Moss',
							designation: 'Employee',
							image: resourcesUserImg5
						},
						{
							name: 'Angela Moss',
							designation: 'Employee',
							image: resourcesUserImg1
						}
					]
				},
				{
					title: 'Xformation',
					userList: [
						{
							name: 'Angela Moss',
							designation: 'Employee',
							image: resourcesUserImg1
						},
						{
							name: 'Angela Moss',
							designation: 'Employee',
							image: resourcesUserImg2
						},
						{
							name: 'Angela Moss',
							designation: 'Employee',
							image: resourcesUserImg3
						},
						{
							name: 'Angela Moss',
							designation: 'Employee',
							image: resourcesUserImg4
						},
						{
							name: 'Angela Moss',
							designation: 'Employee',
							image: resourcesUserImg5
						},
						{
							name: 'Angela Moss',
							designation: 'Employee',
							image: resourcesUserImg1
						}
					]
				},
				{
					title: 'Xformation',
					userList: [
						{
							name: 'Angela Moss',
							designation: 'Employee',
							image: resourcesUserImg1
						},
						{
							name: 'Angela Moss',
							designation: 'Employee',
							image: resourcesUserImg2
						},
						{
							name: 'Angela Moss',
							designation: 'Employee',
							image: resourcesUserImg3
						},
						{
							name: 'Angela Moss',
							designation: 'Employee',
							image: resourcesUserImg4
						},
						{
							name: 'Angela Moss',
							designation: 'Employee',
							image: resourcesUserImg5
						},
						{
							name: 'Angela Moss',
							designation: 'Employee',
							image: resourcesUserImg1
						}
					]
				},
				{
					title: 'Xformation',
					userList: [
						{
							name: 'Angela Moss',
							designation: 'Employee',
							image: resourcesUserImg1
						},
						{
							name: 'Angela Moss',
							designation: 'Employee',
							image: resourcesUserImg2
						},
						{
							name: 'Angela Moss',
							designation: 'Employee',
							image: resourcesUserImg3
						},
						{
							name: 'Angela Moss',
							designation: 'Employee',
							image: resourcesUserImg4
						},
						{
							name: 'Angela Moss',
							designation: 'Employee',
							image: resourcesUserImg5
						},
						{
							name: 'Angela Moss',
							designation: 'Employee',
							image: resourcesUserImg1
						}
					]
				}
			],
			activeIndex: 0,
			status: 'all'
		};
		this.breadCrumbs = [
			{
				label: 'Home',
				route: `/`
			},
			{
				label: 'Kubernetes | Overview',
				isCurrentPage: true
			}
		];
	}

	displayResourcesData = () => {
		const { resourcesData } = this.state;
		let retData: any = [];
		for (let i = 0; i < resourcesData.length; i++) {
			let row = resourcesData[i];
			retData.push(
				<div className="resource" key={row.name}>
					<Link className="content" to={prefixRoute(ROUTES.ResourceWiseViewAllTasks)}>
						<div className="image">
							<img src={row.profile} alt="" />
						</div>
						<div className="user-name">
							<h3>{row.name}</h3>
							<p>{row.product}</p>
						</div>
					</Link>
					<div className="plus-icon">
						<span>
							<i className="fa fa-plus" />
						</span>
					</div>
				</div>
			);
		}
		return retData;
	};

	displayProjeuctListData = () => {
		const { projeuctListData, activeIndex, status } = this.state;
		let retData: any = [];
		for (let i = 0; i < projeuctListData.length; i++) {
			let row = projeuctListData[i];
			if (status == row.status || status == 'all') {
				retData.push(
					<div
						className={i == activeIndex ? 'project active' : 'project'}
						key={row.name}
						onClick={() => {
							this.setState({ activeIndex: i });
						}}
					>
						<div className={row.isStar ? 'star-box active' : 'star-box'}>
							<span>
								<i className="fa fa-star" />
							</span>
						</div>
						<div className="icon">
							<img src={row.image} alt="" />
						</div>
						<div className="content">
							<Link to="/a/xformation-assetmanager-ui-plugin/plugins/workflow-engine/project-wise">
								<h4>{row.name}</h4>
							</Link>
							<span>
								{row.title} <i className="fa fa-circle" /> {row.time}
							</span>
							<p>{row.text}</p>
						</div>
					</div>
				);
			}
		}
		return retData;
	};

	displayResouceAllocation = () => {
		const { resourceAllocation } = this.state;
		let retData = [];
		if (resourceAllocation && resourceAllocation.length > 0) {
			for (let i = 0; i < resourceAllocation.length; i++) {
				let rowData = resourceAllocation[i];
				retData.push(
					<div className="allocation-box">
						<h3>{rowData.title}</h3>
						<div className="resource-box">
							{rowData &&
								rowData.userList &&
								rowData.userList.map((val: any, index: any) => {
									return (
										<div className="resource">
											<div className="image">
												<img src={val.image} alt="" />
											</div>
											<div className="content">
												<h4>{val.name}</h4>
												<p>{val.designation}</p>
											</div>
										</div>
									);
								})}
						</div>
					</div>
				);
			}
		}
		return retData;
	};

	displayProjectStatus = (type: any) => {
		this.setState({
			status: type
		});
	};

	render() {
		return (
			<div className="owrkflow-dashboard-container">
				<Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="WORKFLOW MANAGEMENT" />
				<div className="dashboard-container">
					<div className="fliter-container">
						<div className="row">
							<div className="col-xl-4 col-lg-5 col-md-4 col-sm-12 col-xs-12">
								<div className="heading">Procurement Workflow management</div>
							</div>
							<div className="col-xl-8 col-lg-7 col-md-8 col-sm-12 col-xs-12">
								<div className="fliter-search">
									<div className="fliter-box">
										<select>
											<option>Fliter by</option>
											<option>Fliter by 1</option>
											<option>Fliter by 2</option>
											<option>Fliter by 3</option>
										</select>
									</div>
									<div className="fliter-search-box">
										<input
											type={'Search for...'}
											className="input-group-text"
											placeholder={'Search for...'}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="dashbord-top-section">
						<div className="row">
							<div className="col-xl-9 col-lg-8 col-md-7 col-sm-12 col-xs-12">
								<div className="heading">
									<h3>{'Dashboard'}</h3>
									<span>Lorem ipsum dolor sit amet</span>
								</div>
							</div>
							<div className="col-xl-3 col-lg-4 col-md-5 col-sm-12 col-sx-12">
								<div className="calender"><DateFormat /></div>
							</div>
						</div>
					</div>
					<div className="progress-rfp-boxs">
						<div className="row">
							<div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
								<div className="progress-box">
									<div className="progress-img">
										<img src={rfpImg} alt="" />
									</div>
									<div className="progress-content">
										<h3>215</h3>
										<span>{"Today's RFP"}</span>
									</div>
								</div>
							</div>
							<div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
								<div className="progress-box">
									<div className="progress-img">
										<img src={rfpImg} alt="" />
									</div>
									<div className="progress-content">
										<h3>26685</h3>
										<span>{'Total RFP'}</span>
									</div>
								</div>
							</div>
							<div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
								<div className="progress-box">
									<div className="progress-img">
										<div className="mail-icon">
											<i className="fa fa-envelope" />
										</div>
										<span>&#33;</span>
									</div>
									<div className="progress-content">
										<h3>35</h3>
										<span>{'Important Emails'}</span>
									</div>
								</div>
							</div>
							<div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
								<div className="progress-box">
									<div className="progress-img order">
										<div className="in-progress" />
										<div className="complate-progress" />
									</div>
									<div className="progress-content">
										<div className="completed">
											<h5>2,841</h5>
											<span>{'Completed Orders'}</span>
										</div>
										<div className="in-progrss">
											<h5>1.456</h5>
											<span>{'In-progrss Orders'}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="average-section">
						<div className="row">
							<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 pl-lg-2">
								<div className="statistics-graph">
									<div className="requistions-heading">
										<h5 className="d-block">{'Workflow Statistics'}</h5>
									</div>
									<div className="requistions-graph">
										<Doughnut
											data={this.state.workflowStatistics}
											options={this.state.workflowStatisticsOptions}
										/>
									</div>
								</div>
							</div>
							<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 pl-lg-2">
								<div className="statistics-graph">
									<div className="requistions-heading">
										<div className="row">
											<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
												<h5 className="d-block">{'Project Overview'}</h5>
											</div>
											<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
												<div className="requistions-dropdown">
													<div className="opensens-dropdown">
														<select className="opensens-content">
															<option value="">Monthly</option>
															<option value={10}>abc</option>
															<option value={20}>def</option>
															<option value={30}>abc</option>
														</select>
														<div className="meore-menu-icon">
															<i className="fa fa-ellipsis-v" />
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="">
										<div className="totalpaid">
											<div className="paid-content">
												<span>{'Completed Task'}</span>
											</div>
											<div className="paid-content unpaid">
												<span>{'Pending Task'}</span>
											</div>
										</div>
									</div>
									<Bar data={this.state.overViewData} options={this.state.overViewOptions} />
								</div>
							</div>
						</div>
					</div>
					<div className="project-resources-section">
						<div className="row">
							<div className="col-xl-9 col-lg-8 col-md-12 col-sm-12 col-xs-12 pl-lg-2">
								<div className="project-list">
									<div className="heading">
										<div className="row">
											<div className="col-xl-6 col-lg-4 col-md-4 col-sm-12 col-xs-12">
												<h5>Project List</h5>
											</div>
											<div className="col-xl-6 col-lg-8 col-md-8 col-sm-12 col-xs-12">
												<ul className="tabs">
													<li
														className={this.state.status == 'all' ? 'active' : ''}
														onClick={() => this.displayProjectStatus('all')}
													>
														All Projects
													</li>
													<li
														className={this.state.status == StageStatus.COMPLETED ? 'active' : ''}
														onClick={() => this.displayProjectStatus(StageStatus.COMPLETED)}
													>
														Completed
													</li>
													<li
														className={this.state.status == StageStatus.INPROGRESS ? 'active' : ''}
														onClick={() => this.displayProjectStatus(StageStatus.INPROGRESS)}
													>
														In Progress
													</li>
												</ul>
											</div>
										</div>
									</div>
									<div className="project-list-content">
										<div className="projects">{this.displayProjeuctListData()}</div>
									</div>
								</div>
							</div>
							<div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 col-xs-12 pr-lg-2">
								<div className="resources-list">
									<div className="heading">
										<h5>Resources</h5>
										<p>All Resources</p>
									</div>
									<div className="resources">{this.displayResourcesData()}</div>
								</div>
							</div>
						</div>
					</div>
					<div className="project-overview-section">
						<div className="heading">
							<h5>Project Overview</h5>
						</div>
						<div className="table">
							<table className="overview">
								<thead>
									<tr>
										<th>Project Name</th>
										<th>Total Usecase</th>
										<th>Project Manager</th>
										<th>Assigned date</th>
										<th>Age</th>
										<th>Status</th>
										<th>Activity Logs</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<strong>
												<a href="#">Xformation</a>
											</strong>
										</td>
										<td>80</td>
										<td>
											<span>Ganesh</span>
										</td>
										<td>15/02/2021</td>
										<td>7d</td>
										<td>
											<div className="progress">In progress</div>
										</td>
										<td>
											<a href="#">View Logs</a>
										</td>
									</tr>
									<tr>
										<td>
											<strong>
												<a href="#">Procurement</a>
											</strong>
										</td>
										<td>95</td>
										<td>
											<span>Akhila</span>
										</td>
										<td>17/02/2021</td>
										<td>5d</td>
										<td>
											<div className="pending">Pending for review</div>
										</td>
										<td>
											<a href="#">View Logs</a>
										</td>
									</tr>
									<tr>
										<td>
											<strong>
												<a href="#">Supply chail</a>
											</strong>
										</td>
										<td>70</td>
										<td>
											<span>Zakir</span>
										</td>
										<td>15/02/2021</td>
										<td>7d</td>
										<td>
											<div className="progress">In progress</div>
										</td>
										<td>
											<a href="#">View Logs</a>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div className="project-overview-section">
						<div className="heading">
							<h5>Project Progress Overview</h5>
						</div>
						<div className="table progress">
							<table>
								<thead>
									<tr>
										<th>Project Name</th>
										<th>Reuirements</th>
										<th>Mock Development</th>
										<th>Actual Development</th>
										<th>CI/CD Test</th>
										<th>Staging/Release</th>
										<th>Publish/Operate</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td colSpan={7} />
									</tr>
									<tr>
										<td>
											<strong>
												<a href="#">Xformation</a>
											</strong>
										</td>
										<td>
											<i className="fa fa-check green" />
										</td>
										<td>
											<i className="fa fa-check green" />
										</td>
										<td>
											<i className="fa fa-check orange" />
										</td>
										<td />
										<td />
										<td />
									</tr>
									<tr>
										<td>
											<strong>
												<a href="#">Procurement</a>
											</strong>
										</td>
										<td>
											<i className="fa fa-check green" />
										</td>
										<td>
											<i className="fa fa-check green" />
										</td>
										<td>
											<i className="fa fa-check green" />
										</td>
										<td>
											<i className="fa fa-check green" />
										</td>
										<td>
											<i className="fa fa-check green" />
										</td>
										<td>
											<i className="fa fa-check orange" />
										</td>
									</tr>
									<tr>
										<td>
											<strong>
												<a href="#">Supply chail</a>
											</strong>
										</td>
										<td>
											<i className="fa fa-check green" />
										</td>
										<td>
											<i className="fa fa-check green" />
										</td>
										<td>
											<i className="fa fa-check green" />
										</td>
										<td>
											<i className="fa fa-check orange" />
										</td>
										<td />
										<td />
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div className="project-allocation-section">
						<div className="heading">
							<h5>Project Wise Resource Allocation</h5>
						</div>
						<div className="resource-allocation">{this.displayResouceAllocation()}</div>
					</div>
					<div className="project-overview-section">
						<div className="heading">
							<h5>Rask wise Resource Progress Overview</h5>
						</div>
						<div className="table">
							<table>
								<thead>
									<tr>
										<th>Resource Name</th>
										<th>Reuirements</th>
										<th>Mock Development</th>
										<th>Actual Development</th>
										<th>CI/CD Test</th>
										<th>Staging/Release</th>
										<th>Publish/Operate</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<a href="#">Siddhesh</a>
										</td>
										<td>4851232</td>
										<td>Kubernets</td>
										<td>
											<span>Akhila</span>
										</td>
										<td>17/022021</td>
										<td>5d</td>
										<td>
											<div className="completed">Completed</div>
										</td>
									</tr>
									<tr>
										<td>
											<a href="#">Siddhesh</a>
										</td>
										<td>4851232</td>
										<td>Kubernets</td>
										<td>
											<span>Akhila</span>
										</td>
										<td>17/022021</td>
										<td>5d</td>
										<td>
											<div className="progress">In progress</div>
										</td>
									</tr>
									<tr>
										<td>
											<a href="#">Siddhesh</a>
										</td>
										<td>4851232</td>
										<td>Kubernets</td>
										<td>
											<span>Akhila</span>
										</td>
										<td>17/022021</td>
										<td>5d</td>
										<td>
											<div className="completed">Completed</div>
										</td>
									</tr>
									<tr>
										<td>
											<a href="#">Siddhesh</a>
										</td>
										<td>4851232</td>
										<td>Kubernets</td>
										<td>
											<span>Akhila</span>
										</td>
										<td>17/022021</td>
										<td>5d</td>
										<td>
											<div className="progress">In progress</div>
										</td>
									</tr>
									<tr>
										<td>
											<a href="#">Siddhesh</a>
										</td>
										<td>4851232</td>
										<td>Kubernets</td>
										<td>
											<span>Akhila</span>
										</td>
										<td>17/022021</td>
										<td>5d</td>
										<td>
											<div className="completed">Completed</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
