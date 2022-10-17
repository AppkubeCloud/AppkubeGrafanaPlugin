// import { values } from 'lodash';
import * as React from 'react';
import downloadIcon from '../../../img/projectoverview/download-icon.png'
// import overviewMenu1 from '../../img/projectoverview/overview-menu1.png';
// import overviewMenu2 from '../../img/projectoverview/overview-menu2.png';
// import overviewMenu3 from '../../img/projectoverview/overview-menu3.png';
// import overviewMenu4 from '../../img/projectoverview/overview-menu4.png';
// import overviewMenu5 from '../../img/projectoverview/overview-menu5.png';
// import overviewMenu6 from '../../img/projectoverview/overview-menu6.png';
// import overviewMenu7 from '../../img/projectoverview/overview-menu7.png';
import { Link } from 'react-router-dom';
import { AwsHelper } from '../AwsHelpers';
import { getLocationSrv } from '@grafana/runtime';
import AlertMessage from '../../../components/AlertMessage';
import { UsersList, ActorList } from '../../commonDS';
import { ROUTES } from '../../../constants';
import { prefixRoute } from '../../../utils/utils.routing';

export class CreateUsecase extends React.Component<any, any> {
	id: any;
	awsHelper: any;
	replaceKeyInXml: any;
	constructor(props: any) {
		super(props);
		this.state = {
			isAlertOpen: false,
			message: '',
			severity: '',
			subStageDetails: { subStageName: '', assignto: '', startDate: '', endDate: '', comments: '' },
			userList: UsersList,
			stages: [],
			createStages: [
				{
					name: 'Requirements',
					description: '',
					index: 0,
					assignedTo: '',
					workflowCheckList: [
						{ label: 'Finalized API Specification is available in GitHub', id: 3, checked: false },
						{ label: 'API spec Review meeting is done with UI /API Team', id: 10, checked: false },
						{ label: 'UI code is available in GitHub that works with Mock API', id: 6, checked: false },
						{
							label: 'The code has adequate build / test instructions to run mock server and review UI',
							id: 6,
							checked: false
						},
						{
							label:
								'Test Plans is available in Git and its stitched in netlify site in Use Cases Matrix',
							id: 1,
							checked: false
						}
					],
					details: [
						{
							subStageName: 'Create Usecase Document',
							assignto: '',
							startDate: '',
							endDate: '',
							comments: '',
							data: [{ link: '', label: 'Github link' }]
						},
						{
							subStageName: 'Create Screen Design',
							assignto: '',
							startDate: '',
							endDate: '',
							comments: '',
							data: [{ link: '', label: 'Github link' }]
						},
						{
							subStageName: 'Updating Usecase in Netlifi',
							assignto: '',
							startDate: '',
							endDate: '',
							comments: '',
							data: [{ link: '', label: 'Github link' }]
						}
					],
					usecaseDevelopment: {
						specs: [],
						usecaseName: '',
						selectActors: ActorList,
						description: '',
						tigger: '',
						preConditions: '',
						postConditions: '',
						usecaseFlow: '',
						prototypeLink: "",

					},
				},
				{
					name: 'Mock Development',
					description: '',
					assignedTo: '',
					index: 1,
					workflowCheckList: [
						{ label: 'Finalized API Specification is available in GitHub', id: 3, checked: false },
						{ label: 'API spec Review meeting is done with UI /API Team', id: 10, checked: false },
						{ label: 'UI code is available in GitHub that works with Mock API', id: 6, checked: false },
						{
							label: 'The code has adequate build / test instructions to run mock server and review UI',
							id: 6,
							checked: false
						},
						{
							label:
								'Test Plans is available in Git and its stitched in netlify site in Use Cases Matrix',
							id: 1,
							checked: false
						}
					],
					details: [
						{
							subStageName: 'Create API Spec',
							assignto: '',
							startDate: '',
							endDate: '',
							comments: '',
							data: [{ link: '', label: 'Github link' }]
						},
						{
							subStageName: 'Create Postman Test',
							assignto: '',
							startDate: '',
							endDate: '',
							comments: '',
							data: [{ link: '', label: 'Github link' }]
						},
						{
							subStageName: 'Create UI Screen with Mock API',
							assignto: '',
							startDate: '',
							endDate: '',
							comments: '',
							data: [{ link: '', label: 'Github link' }]
						},
						{
							subStageName: 'Create Test API',
							assignto: '',
							startDate: '',
							endDate: '',
							comments: '',
							data: [{ link: '', label: 'Github link' }]
						}
					]
				},
				{
					name: 'Actual Development',
					description: '',
					assignedTo: '',
					index: 2,
					workflowCheckList: [
						{ label: 'Finalized API Specification is available in GitHub', id: 3, checked: false },
						{ label: 'API spec Review meeting is done with UI /API Team', id: 10, checked: false },
						{ label: 'UI code is available in GitHub that works with Mock API', id: 6, checked: false },
						{
							label: 'The code has adequate build / test instructions to run mock server and review UI',
							id: 6,
							checked: false
						},
						{
							label:
								'Test Plans is available in Git and its stitched in netlify site in Use Cases Matrix',
							id: 1,
							checked: false
						}
					],
					details: [
						{
							subStageName: 'Data Design GitHub Page',
							assignto: '',
							startDate: '',
							endDate: '',
							comments: '',
							data: [{ link: '', label: 'Github link' }]
						},
						{
							subStageName: 'API Source Code in GitHub',
							assignto: '',
							startDate: '',
							endDate: '',
							comments: '',
							data: [{ link: '', label: 'Github link' }]
						},
						{
							subStageName: 'Populate Test data in GitHub',
							assignto: '',
							startDate: '',
							endDate: '',
							comments: '',
							data: [{ link: '', label: 'Github link' }]
						},
						{
							subStageName: 'Junit5 Test in GitHub',
							assignto: '',
							startDate: '',
							endDate: '',
							comments: '',
							data: [{ link: '', label: 'Github link' }]
						},
						{
							subStageName: 'Cucumber BDD tests in GitHub',
							assignto: '',
							startDate: '',
							endDate: '',
							comments: '',
							data: [{ link: '', label: 'Github link' }]
						},
						{
							subStageName: 'Gatling Performance',
							assignto: '',
							startDate: '',
							endDate: '',
							comments: '',
							data: [{ link: '', label: 'Github link' }]
						},
						{
							subStageName: 'Code Review with Tech Lead',
							assignto: '',
							startDate: '',
							endDate: '',
							comments: '',
							data: [{ link: '', label: 'Github link' }]
						},
						{
							subStageName: 'Actual UI-API Integration',
							assignto: '',
							startDate: '',
							endDate: '',
							comments: '',
							data: [{ link: '', label: 'Github link' }]
						},
						{
							subStageName: 'Branch Merge after Review',
							assignto: '',
							startDate: '',
							endDate: '',
							comments: '',
							data: [{ link: '', label: 'Github link' }]
						}
					]
				},
				{
					name: 'CI/CD/TEST',
					description: '',
					index: 3,
					assignedTo: '',
					workflowCheckList: [
						{ label: 'Finalized API Specification is available in GitHub', id: 3, checked: false },
						{ label: 'API spec Review meeting is done with UI /API Team', id: 10, checked: false },
						{ label: 'UI code is available in GitHub that works with Mock API', id: 6, checked: false },
						{
							label: 'The code has adequate build / test instructions to run mock server and review UI',
							id: 6,
							checked: false
						},
						{
							label:
								'Test Plans is available in Git and its stitched in netlify site in Use Cases Matrix',
							id: 1,
							checked: false
						}
					],
					details: [
						{
							subStageName: 'Create CI/CD Pipeline',
							assignto: '',
							startDate: '',
							endDate: '',
							comments: '',
							data: [{ link: '', label: 'Github link' }]
						},
						{
							subStageName: 'Create Kubernetes Operator',
							assignto: '',
							startDate: '',
							endDate: '',
							comments: '',
							data: [{ link: '', label: 'Github link' }]
						},
						{
							subStageName: 'Link API with GitHub and Netlifi',
							assignto: '',
							startDate: '',
							endDate: '',
							comments: '',
							data: [{ link: '', label: 'Github link' }]
						},
						{
							subStageName: 'Upload Test results in S3 Website',
							assignto: '',
							startDate: '',
							endDate: '',
							comments: '',
							data: [{ link: '', label: 'Github link' }]
						},
						{
							subStageName: 'Upload Test env URL in Netlifi site',
							assignto: '',
							startDate: '',
							endDate: '',
							comments: '',
							data: [{ link: '', label: 'Github link' }]
						},
						{
							subStageName: 'Stage after review',
							assignto: '',
							startDate: '',
							endDate: '',
							comments: '',
							data: [{ link: '', label: 'Github link' }]
						}
					]
				},
				{
					name: 'Stage / Release',
					description: '',
					index: 4,
					assignedTo: '',
					workflowCheckList: [
						{ label: 'Finalized API Specification is available in GitHub', id: 3, checked: false },
						{ label: 'API spec Review meeting is done with UI /API Team', id: 10, checked: false },
						{ label: 'UI code is available in GitHub that works with Mock API', id: 6, checked: false },
						{
							label: 'The code has adequate build / test instructions to run mock server and review UI',
							id: 6,
							checked: false
						},
						{
							label:
								'Test Plans is available in Git and its stitched in netlify site in Use Cases Matrix',
							id: 1,
							checked: false
						}
					],
					details: [
						{
							subStageName: 'Stage Test and Review',
							assignto: '',
							startDate: '',
							endDate: '',
							comments: '',
							data: [{ link: '', label: 'Github link' }]
						},
						{
							subStageName: 'Promote to Prod',
							assignto: '',
							startDate: '',
							endDate: '',
							comments: '',
							data: [{ link: '', label: 'Github link' }]
						},
						{
							subStageName: 'API Security Test in Prod',
							assignto: '',
							startDate: '',
							endDate: '',
							comments: '',
							data: [{ link: '', label: 'Github link' }]
						},
						{
							subStageName: 'Create/Update Release Note',
							assignto: '',
							startDate: '',
							endDate: '',
							comments: '',
							data: [{ link: '', label: 'Github link' }]
						}
					]
				},
				{
					name: 'Publish/Operate',
					description: '',
					index: 5,
					assignedTo: '',
					workflowCheckList: [
						{ label: 'Finalized API Specification is available in GitHub', id: 3, checked: false },
						{ label: 'API spec Review meeting is done with UI /API Team', id: 10, checked: false },
						{ label: 'UI code is available in GitHub that works with Mock API', id: 6, checked: false },
						{
							label: 'The code has adequate build / test instructions to run mock server and review UI',
							id: 6,
							checked: false
						},
						{
							label:
								'Test Plans is available in Git and its stitched in netlify site in Use Cases Matrix',
							id: 1,
							checked: false
						}
					],
					details: [
						{
							subStageName: 'Security & Operation Readiness',
							assignto: '',
							startDate: '',
							endDate: '',
							comments: '',
							data: [{ link: '', label: 'Github link' }]
						},
						{
							subStageName: 'Release Note',
							assignto: '',
							startDate: '',
							endDate: '',
							comments: '',
							data: [{ link: '', label: 'Github link' }]
						}
					]
				}
			],
			usecase: {},
			createUsecase: {
				name: '',
				description: '',
				assignTo: ''
			},
			isSubmitted: false,
			subStageName: '',
			activeIndex: 0,
			activeUsecaseIndex: -1,
			machineArn: 'arn:aws:states:us-east-1:657907747545:stateMachine:send-to-pre-state',
			useCaseList: [],
			editUsecase: {}
		};
		this.id = 10;
		this.awsHelper = new AwsHelper({ meta: props.meta });
		// this.replaceKeyInXml = {
		// 	name: 'Name',
		// 	description: 'Description',
		// 	assignedTo: 'Assigned-To',
		// 	details: 'Details',
		// 	subStageName: 'Sub-Stage-Name',
		// 	id: 'Id',
		// 	stage: 'Stage',
		// 	startDate: 'Start-Date',
		// 	endDate: 'End-Date',
		// 	comments: 'Comments',
		// 	workflowCheckList: 'Workflow-CheckList',
		// 	links: 'Links',
		// 	link: 'Link',
		// 	label: 'Label',
		// 	assignto: 'Assign-To',
		// 	data: 'Data'
		// };
	}

	componentDidMount() {
		this.resetState();
		this.awsHelper.getUsecaseList(
			(useCaseList: any) => {
				useCaseList.forEach((useCase: any) => {
					if (useCase) {
						this.awsHelper.getExecutionHistory(
							'arn:aws:states:us-east-1:657907747545:execution:send-to-pre-state:9bc49c92-4016-47a5-8a22-88d353e912ab',
							(items: any) => {
								if (useCase?.stepinput) {
									if (useCase?.stepinput?.stages?.length > 0) {
										const useCases = this.state.useCaseList;
										useCases.push({
											...useCase,
											steps: items
										});
										this.setState({
											useCaseList: useCases
										});
									}
								}
							},
							(err: any) => {
								console.log(err);
							}
						);
					}
				});
			},
			() => { }
		);
	}

	resetState = () => {
		const { createStages, createUsecase } = this.state;
		this.setState({ activeUsecaseIndex: -1, stages: JSON.parse(JSON.stringify(createStages)), usecase: JSON.parse(JSON.stringify(createUsecase)) })
	}

	// OBJtoXML(obj: any) {
	// 	var xml = '';

	// 	for (var prop in obj) {
	// 		xml += obj[prop] instanceof Array ? '' : obj[prop] ? '<' + this.replaceKeyInXml[prop] + '>' : '';
	// 		if (obj[prop] instanceof Array) {
	// 			for (var array in obj[prop]) {
	// 				xml += obj[prop][array] ? '<' + this.replaceKeyInXml[prop] + '>' : '';
	// 				xml += this.OBJtoXML(new Object(obj[prop][array]));
	// 				xml += obj[prop][array] ? '</' + this.replaceKeyInXml[prop] + '>' : '';
	// 			}
	// 		} else if (typeof obj[prop] == 'object') {
	// 			xml += this.OBJtoXML(new Object(obj[prop]));
	// 		} else {
	// 			xml += obj[prop];
	// 		}
	// 		xml += obj[prop] instanceof Array ? '' : obj[prop] ? '</' + this.replaceKeyInXml[prop] + '>' : '';
	// 	}
	// 	var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');

	// 	return xml;
	// }

	handleStateChange = (e: any) => {
		const { name, value } = e.target;
		const { usecase } = this.state;
		this.setState({ usecase: { ...usecase, [name]: value } });
	};

	handleStageDetail = (e: any, index: any) => {
		const { name, value } = e.target;
		const { stages } = this.state;
		stages[index] = {
			...stages[index],
			[name]: value
		};
		this.setState({ stages: JSON.parse(JSON.stringify(stages)) });
	};

	addDetails = (index: any) => {
		let { activeIndex } = this.state;
		activeIndex = index;
		this.setState({ activeIndex });
	};

	validateForm = (submitted: any) => {
		const { usecase, stages } = this.state;
		const validObj = {
			isValid: true,
			message: ''
		};
		let isValid = true;
		const retData = {
			name: validObj,
			description: validObj,
			assignTo: validObj,
			stageDetail: validObj,
			isValid
		};
		if (submitted) {
			if (!usecase.name) {
				retData.name = {
					isValid: false,
					message: 'Name is required'
				};
				isValid = false;
			}
			if (!usecase.description) {
				retData.description = {
					isValid: false,
					message: 'Description is required'
				};
				isValid = false;
			}
			if (!usecase.assignTo) {
				retData.assignTo = {
					isValid: false,
					message: 'Assig to is required'
				};
				isValid = false;
			}
			if (stages && stages.length > 0) {
				for (let i = 0; i < stages.length; i++) {
					if (!stages[i].description || !stages[i].assignedTo || !stages[i].name) {
						retData.stageDetail = {
							isValid: false,
							message: 'Stage Detail is required'
						};
						isValid = false;
					}
				}
			}
		}
		retData.isValid = isValid;
		return retData;
	};

	submitWorkflow = () => {
		const { usecase, stages, activeUsecaseIndex, useCaseList } = this.state;
		this.setState({ isSubmitted: true });
		if (activeUsecaseIndex === -1) {
			let usecaseJson = {
				...usecase,
				stages: stages
			}
			let params = {
				stateMachineArn: 'arn:aws:states:us-east-1:657907747545:stateMachine:send-to-pre-state',
				input: usecaseJson,
				usecaseName: usecase.name
			};
			// let dataForXlm = '<?xml version="1.0" encoding="UTF-8"?><Note>';
			// dataForXlm += this.maniupulateDataForXml(usecaseJson);
			// dataForXlm += '</Note>';

			this.awsHelper.executeStateMachine(params, (res: any) => {
				if (res && res.message) {
					this.setState({
						isAlertOpen: true,
						message: res.message,
						severity: 'success'
					})
					setTimeout(() => {
						getLocationSrv().update({
							path: `/a/xformation-workflow-engine/project-wise`
						});
					}, 2000)

				}
			});
		}
		else {
			let setInputs = {
				name: usecase.name,
				usecaseName: useCaseList[activeUsecaseIndex].usecasename,
				description: usecase.description,
				assignTo: usecase.assignTo,
				stages: stages
			}
			this.awsHelper.updateUsecaseWholeData(setInputs, () => {

			}, (res: any) => {
				this.setState({
					isAlertOpen: true,
					message: res.message,
					severity: 'success'
				})
			});
		}
	};

	handleCloseAlert = () => {
		this.setState({
			isAlertOpen: false,
			message: '',
			severity: ''
		})
	}
	// maniupulateDataForXml = (stages: any) => {
	// 	let Xmldata: any = '';
	// 	for (let i = 0; i < stages.length; i++) {
	// 		let stage = { stage: stages[i] };
	// 		Xmldata += this.OBJtoXML(stage);
	// 	}
	// 	return Xmldata;
	// };

	handleSubStageName = (index: any, e: any) => {
		const { activeIndex, stages } = this.state;
		const { name, value } = e.target;
		stages[activeIndex].details[index][name] = value;
		this.setState({ stages });
	};

	removeSubString = (stageIndex: any, subStringIndex: any) => {
		const { stages } = this.state;
		this.state.stages[stageIndex].details.splice(subStringIndex, 1);
		this.setState({ stages });
	};

	handleSubStageData = (e: any, i: any, index: any) => {
		const { name, value } = e.target;
		const { stages } = this.state;
		let details = stages[i].details[index];
		details[name] = value;
		this.setState({ stages });
	};

	displayUseCaseList = () => {
		const { useCaseList, activeUsecaseIndex } = this.state;
		let retData = [];
		retData.push(<li className={activeUsecaseIndex == -1 ? "active" : ""} key="-1" onClick={() => { this.handleSelectUseCase(-1) }}>
			<span>New Usecase</span>
		</li>)
		if (useCaseList && useCaseList.length > 0) {
			for (let i = 0; i < useCaseList.length; i++) {
				let useCase = { ...useCaseList[i] };
				// if (useCase.stepinput.S.indexOf("stages") !== -1) {
				retData.push(
					<li className={i === activeUsecaseIndex ? 'active' : ''} key={`usecase-${i}`} onClick={() => this.handleSelectUseCase(i)}>
						<span>{useCase.usecasename}</span>
					</li>
				);
				// }
			}
		}
		return retData;
	};

	// validateJsonData(str: any) {
	// 	try {
	// 		JSON.parse(str);
	// 	} catch (e) {
	// 		return false;
	// 	}
	// 	return true;
	// }

	handleSelectUseCase = (index: any) => {
		let { usecase } = this.state
		const { useCaseList } = this.state
		if (index >= 0) {
			if (useCaseList[index]?.stepinput) {
				let parseUserData = useCaseList[index].stepinput
				usecase.name = parseUserData.name
				this.setState({ activeUsecaseIndex: index, stages: parseUserData.stages, usecase })
			}
		} else if (index === -1) {
			this.resetState()
		}
	}

	render() {
		const errorData = this.validateForm(this.state.isSubmitted);
		const { stages, activeIndex, usecase, userList, isAlertOpen, message, severity } = this.state;
		return (
			<div className="project-over-view-container">
				<div className="project-over-view-section">
					<div className="fliter-container">
						<div className="row">
							<div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
								<div className="heading">Procurement Workflow management</div>
							</div>
							<div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-xs-12">
								<div className="fliter-right-content">
									<div className="image">
										<img src={downloadIcon} alt="" />
									</div>
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
									<Link
										to={prefixRoute(ROUTES.ProjectWise)}
										className="btn-primary pro-overview-btn"
									>
										<i className="fas fa-chevron-left" /> Back
									</Link>
								</div>
							</div>
						</div>
					</div>
					<div className="project-over-view-inner-content">
						<div className="project-over-view-left-content">
							<div className="sidebar">
								<ul>{this.displayUseCaseList()}</ul>
							</div>
						</div>
						<div className="project-over-view-right-content">
							<div className="create-new-usecase">
								<div className="basic-details">
									<h4>Basic Details</h4>
									<div className="input-group">
										<label>Usecase Name</label>
										<input
											className="form-control name-usecase"
											type="text"
											name="name"
											value={usecase.name}
											placeholder="name of usecase"
											onChange={(e: any) => this.handleStateChange(e)}
										/>
									</div>
									{errorData && errorData.name && <span>{errorData.name.message}</span>}
									<div className="input-group">
										<label>Usecase Description</label>
										<textarea
											className="form-control"
											rows={3}
											name="description"
											value={usecase.description}
											placeholder="name of usecase"
											onChange={(e: any) => this.handleStateChange(e)}
										/>
									</div>
									{errorData && errorData.description && <span>{errorData.description.message}</span>}
									<div className="input-group menu-dropdown">
										<label>Assign To</label>
										<select
											name="assignTo"
											className="assign"
											onChange={(e: any) => this.handleStateChange(e)}
											value={usecase.assignTo}
										>
											<option value="">--select--</option>
											{userList &&
												userList.length > 0 &&
												userList.map((users: any, j: any) => {
													return <option value={users.id}>{users.name}</option>;
												})}
										</select>
									</div>
									{errorData && errorData.assignTo && <span>{errorData.assignTo.message}</span>}
								</div>
								<div className="workflow-detail">
									<h4>Workflow Stage Detail</h4>
								</div>
								{errorData &&
									errorData.stageDetail && <span className="error">{errorData.stageDetail.message}</span>}
								{stages &&
									stages.length > 0 &&
									stages.map((val: any, i: any) => {
										return (
											<div className="add-workflow-list" key={`stage-${i}`}>
												<span>{i + 1}</span>
												<div className="workflow-type">
													<input
														className="form-control"
														type="text"
														name="name"
														readOnly
														placeholder="Enter your workflow type"
														value={val.name}
														onChange={(e) => this.handleStageDetail(e, i)}
													/>
												</div>
												<div className="workflow-details-content">
													<div className="workflow-dropdown">
														<label>Assign To</label>
														<select
															name="assignedTo"
															className="assign"
															value={val.assignedTo}
															onChange={(e) => this.handleStageDetail(e, i)}
														>
															<option value="">--select--</option>
															{userList &&
																userList.length > 0 &&
																userList.map((users: any, j: any) => {
																	return (
																		<option value={users.id}>{users.name}</option>
																	);
																})}
														</select>
													</div>
													<div className="description">
														<label>Description</label>
														<input
															className="form-control"
															name="description"
															placeholder="describe task and checklist to be followed at this stage"
															value={val.description}
															onChange={(e) => this.handleStageDetail(e, i)}
														/>
													</div>
												</div>
												{/*  */}
												<button className="add-stage-btn" onClick={(e) => this.addDetails(i)}>
													<div className="d-inline-block">
														{/* <i className="fa fa-plus" aria-hidden="true" /> */}
													</div>Open Stage{' '}
												</button>

												{this.state.activeIndex === i && (
													<div className="requirement-details">
														<div className="requirement-inner-content">
															{val.details &&
																val.details.length > 0 && (
																	<h4 className="heading">
																		Requirement Sub-Stage details
																	</h4>
																)}
															{val.details &&
																val.details.length > 0 && (
																	<table>
																		<thead>
																			<tr>
																				<th />
																				<th>Assign to</th>
																				<th>Start Date</th>
																				<th>End Date</th>
																				<th>Comments</th>
																			</tr>
																		</thead>
																		<tbody>
																			{val.details.map(({ // name,
																				assignto, startDate, endDate, comments }: any, index: any) => (
																				<tr key={`stageDetail-${i}-${index}`}>
																					<td className="user-name">
																						<div className="add-stage-name">
																							<input
																								type="text"
																								className="form-control"
																								name="subStageName"
																								readOnly
																								value={
																									stages[activeIndex]
																										.details[index]
																										.subStageName
																								}
																								onChange={(e) =>
																									this.handleSubStageName(
																										index,
																										e
																									)}
																							/>
																						</div>
																					</td>
																					<td>
																						<select
																							name="assignto"
																							id="assignto"
																							value={assignto}
																							onChange={(e) =>
																								this.handleSubStageData(
																									e,
																									i,
																									index
																								)}
																						>
																							<option value="">
																								--select--
																							</option>
																							{userList &&
																								userList.length > 0 &&
																								userList.map(
																									(
																										users: any,
																										j: any
																									) => {
																										return (
																											<option
																												value={
																													users.id
																												}
																											>
																												{users.name}
																											</option>
																										);
																									}
																								)}
																						</select>
																					</td>
																					<td className="start-date">
																						<input
																							type="date"
																							className="form-control"
																							name="startDate"
																							value={startDate}
																							placeholder="Select"
																							onChange={(e) =>
																								this.handleSubStageData(
																									e,
																									i,
																									index
																								)}
																						/>
																					</td>
																					<td className="start-date end-date">
																						<input
																							type="date"
																							className="form-control"
																							name="endDate"
																							placeholder="Select"
																							onChange={(e) =>
																								this.handleSubStageData(
																									e,
																									i,
																									index
																								)}
																							value={endDate}
																						/>
																					</td>
																					<td className="comment-box">
																						<input
																							type="comments"
																							className="form-control"
																							name="comments"
																							placeholder="Select"
																							onChange={(e) =>
																								this.handleSubStageData(
																									e,
																									i,
																									index
																								)}
																							value={comments}
																						/>
																					</td>
																					{/* <td
																							className="remove-btn"
																							onClick={() => {
																								this.removeSubString(
																									i,
																									index
																								);
																							}}
																						>
																							<i
																								className="fa fa-times"
																								aria-hidden="true"
																							/>
																						</td> */}
																				</tr>
																			))}
																		</tbody>
																	</table>
																)}
														</div>
													</div>
												)}
											</div>
										);
									})}
								{stages &&
									stages.length > 0 && (
										<div className="basic-details-btn">
											<button className="btn btn-primary" onClick={this.submitWorkflow}>
												Save
											</button>
										</div>
									)}
							</div>
						</div>
					</div>
				</div>
				<AlertMessage
					handleCloseAlert={this.handleCloseAlert}
					open={isAlertOpen}
					severity={severity}
					msg={message}
				/>
			</div>
		);
	}
}
