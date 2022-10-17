import * as React from 'react';
import { Breadcrumbs } from '../../Breadcrumbs';
import headerIcon from '../../../img/header-icon.png';
import resourcesUserImg from '../../../img/resources-user-img.png';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';
// import 'simplebar/dist/simplebar.min.css';
import { AwsHelper } from '../AwsHelpers';
import { ROUTES } from '../../../constants';
import { prefixRoute } from '../../../utils/utils.routing';


// const stepsData = {
// 	'requirement': {},
// 	'mock_development': {},
// 	'actual_development': {},
// };

export class ProjectWise extends React.Component<any, any> {
	breadCrumbs: any;
	createStreamRef: any;
	newStreamRef: any;
	manageOutputRef: any;
	allEventRef: any;
	credentials: any;
	config: any;
	dynamoDB: any;
	awsHelper: any;
	constructor(props: any) {
		super(props);
		this.state = {
			tcpInputs: [],
			openCreateMenu: false,
			streamTableData: [],
			indexSets: [],
			useCaseList: [
			],
			searchKey: '',
			machineArn: 'arn:aws:states:us-east-1:657907747545:stateMachine:send-to-pre-state',
			steps: [],
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
		this.awsHelper = new AwsHelper({ meta: props.meta });
	}

	componentDidMount() {
		this.awsHelper.getUsecaseList((useCaseList: any) => {
			useCaseList.forEach((useCase: any) => {
				this.awsHelper.getExecutionHistory(
					"arn:aws:states:us-east-1:657907747545:execution:send-to-pre-state:9bc49c92-4016-47a5-8a22-88d353e912ab",
					(items: any) => {
						const useCases = this.state.useCaseList;
						useCases.push({
							...useCase,
							steps: items,
							executionArn: { S: "arn:aws:states:us-east-1:657907747545:execution:send-to-pre-state:9bc49c92-4016-47a5-8a22-88d353e912ab" }
						});
						this.setState({
							useCaseList: useCases
						});
					},
					(err: any) => { console.log(err) }
				);
			});
		}, () => { });
		this.awsHelper.gettingMachineDef(
			this.state.machineArn,
			(states: any) => {
				// console.log(states);
			},
			(err: any) => {
				console.log(err);
			}
		);
	}

	manipulateSteps = (steps: any) => {

	};

	searchUseCase = (e: any) => {
		const { value, name } = e.target;
		const { useCaseList } = this.state;
		this.setState({
			[name]: value
		});
		if (useCaseList && useCaseList.length > 0) {
			for (let i = 0; i < useCaseList.length; i++) {
				if (value && value !== '') {
					if (useCaseList[i].name.toLowerCase().indexOf(value) === -1) {
						useCaseList[i].isHide = true;
					} else {
						useCaseList[i].isHide = false;
					}
				} else {
					useCaseList[i].isHide = false;
				}
			}
		}
		this.setState({
			useCaseList
		});
	};

	checkStatusOfWorkflow = (data: any) => {
		let count = 0
		let retData = ''
		if (data && data && data.length > 0) {
			for (const usecase of data) {
				if (usecase.checked && usecase.checked === true) {
					count++;
				}
				else {
					retData = " "
				}
			}
			if (count == data.length) {
				retData = 'fa fa-check green';
			} else if (count >0 && count<data.length) {
				retData = "fa fa-check orange";
			} else {
				retData = 'fa fa-check blue';
			}
		}
		return retData;

	}

	render() {
		const { useCaseList, searchKey } = this.state;
		return (
			<div className="owrkflow-project-wise-container">
				<Breadcrumbs breadcrumbs={this.breadCrumbs} pageTitle="WORKFLOW MANAGEMENT" />
				<div className="project-wise-page-container">
					<div className="project-wise-page-heading">
						<div className="row">
							<div className="col-lx-8 col-lg-8 col-md-7 col-sm-7 col-xs-12">
								<div className="heading-content-left">
									<div className="heading-icon">
										<img src={headerIcon} alt="" />
									</div>
									<div className="heading-content">
										<h3>Xformation Platform</h3>
										<span>Last updated by Siddhesh D 24 min ago</span>
										<p>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
											tempor incididunt ut laboreet dolore magna aliqua. Ut enim ad minim, quis
											nostrud exercitation ullamco laboris nisi...
										</p>
									</div>
								</div>
							</div>
							<div className="col-lx-4 col-lg-4 col-md-5 col-sm-5 col-xs-12">
								<div className="heading-content-right">
									<Link to={prefixRoute(ROUTES.CreateUsecase)}
										className="btn-primary pro-overview-btn">Create Usecase</Link>
									<span>
										<Link to={prefixRoute(ROUTES.WorkflowDashboard)}>
											<i className="fa fa-times" aria-hidden="true" />
										</Link>
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="project-wise-status">
						<div className="status-fliter">
							<div className="row d-flex align-items-center justify-content-center">
								<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
									<div className="project-status-heading">Project Status</div>
								</div>
								<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
									<div className="filler-search">
										<select>
											<option>Sort by</option>
											<option>Sort by 1</option>
											<option>Sort by 2</option>
											<option>Sort by 3</option>
										</select>
									</div>
								</div>
								<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
									<div className="search-bar">
										<input
											type="text"
											className="control-form"
											name="searchKey"
											onChange={this.searchUseCase}
											value={searchKey}
											placeholder="Search Usecase"
										/>
										<i className="fa fa-search" aria-hidden="true" />
									</div>
								</div>
							</div>
						</div>
						<div className="project-wise-table">
							<div className="table">
								<div className="thead">
									<div className="th">Usecase </div>
									<div className="th">Requirements</div>
									<div className="th">Mock Development</div>
									<div className="th">Actual Development</div>
									<div className="th">CI/CD Test</div>
									<div className="th">Staging/Release</div>
									<div className="th last">Publish/Operate</div>
								</div>
								<div className="tbody">
									{useCaseList &&
										useCaseList.map((useCase: any, index: any) => {
											let checkList = useCase?.stepinput? useCase.stepinput:""
											if (checkList.stages && checkList.stages.length > 0) {
												return (
													<div className="tr" key={`usecase-${index}`}>
														<div className="td">
															<Link
																to={`/a/xformation-workflow-engine/procurement-detail/${useCase.usecasename}`}
															>
																{useCase.usecasename}
															</Link>
														</div>
														{checkList.stages && checkList.stages.length > 0 ?
															checkList.stages.map((list: any, index: any) => {
																let statusclass = list.workflowCheckList ? this.checkStatusOfWorkflow(list.workflowCheckList) : this.checkStatusOfWorkflow(list.workflowCheckList);
																return (
																	<div className="td" key={index}>
																		<i
																			className={statusclass}
																		/>
																	</div>)
															}) : <React.Fragment></React.Fragment>}
													</div>
												)
											} else {
												return <React.Fragment></React.Fragment>
											}
										})}
								</div>
							</div>
						</div>
					</div>
					<div className="project-wise-resources">
						<div className="project-resources-heading">Project Resources</div>
						<div className="project-resources-section">
							<div className="project-resources-inner">
								<div className="project-resources-box">
									<div className="user-content">
										<div className="user-img">
											<img src={resourcesUserImg} alt="" />
										</div>
										<div className="user-text">
											<span>Angela Moss</span>
											<p>Project Manager</p>
										</div>
									</div>
									<div className="resources-progress-heading">
										<h4>Current Task-User Document</h4>
										<span>Total Task- 10</span>
									</div>
									<div className="project-progressbar text-center">
										<CircularProgressbar
											value={66}
											text={`80%`}
											strokeWidth={15}
											styles={buildStyles({
												strokeLinecap: {},
												trailColor: '#E5E7E9',
												pathColor: '#6317c2',
												textColor: 'black'
											})}
										/>
										<p>Task Completed</p>
									</div>
								</div>
								<div className="project-resources-box">
									<div className="user-content">
										<div className="user-img">
											<img src={resourcesUserImg} alt="" />
										</div>
										<div className="user-text">
											<span>Angela Moss</span>
											<p>Project Manager</p>
										</div>
									</div>
									<div className="resources-progress-heading">
										<h4>Current Task-User Document</h4>
										<span>Total Task- 10</span>
									</div>
									<div className="project-progressbar text-center">
										<CircularProgressbar
											value={66}
											text={`80%`}
											strokeWidth={15}
											styles={buildStyles({
												strokeLinecap: {},
												trailColor: '#E5E7E9',
												pathColor: '#6317c2',
												textColor: 'black'
											})}
										/>
										<p>Task Completed</p>
									</div>
								</div>
								<div className="project-resources-box">
									<div className="user-content">
										<div className="user-img">
											<img src={resourcesUserImg} alt="" />
										</div>
										<div className="user-text">
											<span>Angela Moss</span>
											<p>Project Manager</p>
										</div>
									</div>
									<div className="resources-progress-heading">
										<h4>Current Task-User Document</h4>
										<span>Total Task- 10</span>
									</div>
									<div className="project-progressbar text-center">
										<CircularProgressbar
											value={66}
											text={`80%`}
											strokeWidth={15}
											styles={buildStyles({
												strokeLinecap: {},
												trailColor: '#E5E7E9',
												pathColor: '#6317c2',
												textColor: 'black'
											})}
										/>
										<p>Task Completed</p>
									</div>
								</div>
								<div className="project-resources-box">
									<div className="user-content">
										<div className="user-img">
											<img src={resourcesUserImg} alt="" />
										</div>
										<div className="user-text">
											<span>Angela Moss</span>
											<p>Project Manager</p>
										</div>
									</div>
									<div className="resources-progress-heading">
										<h4>Current Task-User Document</h4>
										<span>Total Task- 10</span>
									</div>
									<div className="project-progressbar text-center">
										<CircularProgressbar
											value={66}
											text={`80%`}
											strokeWidth={15}
											styles={buildStyles({
												strokeLinecap: {},
												trailColor: '#E5E7E9',
												pathColor: '#6317c2',
												textColor: 'black'
											})}
										/>
										<p>Task Completed</p>
									</div>
								</div>
								<div className="project-resources-box">
									<div className="user-content">
										<div className="user-img">
											<img src={resourcesUserImg} alt="" />
										</div>
										<div className="user-text">
											<span>Angela Moss</span>
											<p>Project Manager</p>
										</div>
									</div>
									<div className="resources-progress-heading">
										<h4>Current Task-User Document</h4>
										<span>Total Task- 10</span>
									</div>
									<div className="project-progressbar text-center">
										<CircularProgressbar
											value={66}
											text={`80%`}
											strokeWidth={15}
											styles={buildStyles({
												strokeLinecap: {},
												trailColor: '#E5E7E9',
												pathColor: '#6317c2',
												textColor: 'black'
											})}
										/>
										<p>Task Completed</p>
									</div>
								</div>
								<div className="project-resources-box">
									<div className="user-content">
										<div className="user-img">
											<img src={resourcesUserImg} alt="" />
										</div>
										<div className="user-text">
											<span>Angela Moss</span>
											<p>Project Manager</p>
										</div>
									</div>
									<div className="resources-progress-heading">
										<h4>Current Task-User Document</h4>
										<span>Total Task- 10</span>
									</div>
									<div className="project-progressbar text-center">
										<CircularProgressbar
											value={66}
											text={`80%`}
											strokeWidth={15}
											styles={buildStyles({
												strokeLinecap: {},
												trailColor: '#E5E7E9',
												pathColor: '#6317c2',
												textColor: 'black'
											})}
										/>
										<p>Task Completed</p>
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
