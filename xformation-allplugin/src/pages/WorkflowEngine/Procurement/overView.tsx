import * as React from 'react';
// import { Breadcrumbs } from '../Breadcrumbs';
import 'react-circular-progressbar/dist/styles.css';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { Link } from 'react-router-dom';
import 'simplebar/dist/simplebar.min.css';
import { AwsHelper } from '../AwsHelpers';

export class OverView extends React.Component<any, any> {
	createStreamRef: any;
	newStreamRef: any;
	manageOutputRef: any;
	allEventRef: any;
	awsHelper: any;
	constructor(props: any) {
		super(props);
		this.state = {
			tcpInputs: [],
			openCreateMenu: false,
			streamTableData: [],
			indexSets: [],
			useCase: {}
		};
		this.awsHelper = new AwsHelper({ meta: props.meta });
	}

	setUseCaseData = (data: any) => {
		if (data && data.stepinput && data.stepinput) {
			this.setState({
				useCase: data
			})
		}
	}

	checkValuesValidation = (value: any) => {
		let valuesPresent: any = 0
		let retdata:any;
		if (value.length <= 0) {
			retdata=<React.Fragment />
		} else if (value.length > 0) {
			for (let i = 0; i < value.length; i++) {
				let obj = value[i]
				let res: any = 0
				for (const objKey of Object.keys(obj)) {

					if (obj[objKey]) {
						res++
					}

				}
				if (Object.keys(obj).length === res) {
					valuesPresent++
				}
			}
		}
		if (valuesPresent === value.length) {
			retdata=<i className="fa fa-check green" aria-hidden="true" ></i>
		}
		else if( valuesPresent>0 && valuesPresent< value.length){
			retdata=<i className="fa fa-check orange" aria-hidden="true" ></i>
		}
		else{
			retdata=<i className="fa fa-check blue" aria-hidden="true" ></i>
		}
		return retdata;
	}

	render() {
		const { useCase } = this.state;
		return (
			<>
				<div className="project-wise-status">
					<div className="project-wise-table">
						<div className="table">
							<div className="thead">
								<div className="th">Usecase</div>
								{useCase?.stepinput?.stages && useCase.stepinput.stages.length > 0 &&
									useCase.stepinput.stages.map(({ name }: any, index: any) =>
										(<div className="th" key={`${name}${index}`}>{name}</div>))}

							</div>
							<div className="tbody">
								<div className="tr">
									<div className="td">{useCase?.usecaseName ? useCase.usecaseName : ''}</div>
									{useCase?.stepinput?.stages && useCase.stepinput.stages.length > 0 &&
										useCase.stepinput.stages.map(({ name, workflowCheckList}: any, index: any) =>
											(<div className="td" key={`${name}${index}`}>{this.checkValuesValidation(workflowCheckList)}</div>))}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="overview-inner-content">
					<div className="row">
						<div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
							<div className="overview-left-content">
								<div className="assigned-content">
									<label>Assigned To </label>
									<div className="assigned-box">
										<div className="user-datails">
											<div className="user-image">
												<img src="https://www.pinoytechnoguide.com/wp-content/uploads/2021/10/vivo-X70-sample-picture-person-portrait-mode.jpg" alt="image" />
											</div>
											<div className="user-text">
												<strong>Angela Moss</strong>
												<p>Project Manager</p>
											</div>
										</div>
										<div className="user-content">
											<p><strong>Current Task - User Document</strong></p>
											<span>Total Task - 10</span>
										</div>
									</div>
								</div>
								<div className="assigned-content">
									<label>Details</label>
									<div className="assigned-box">
										<ul>
											<li><label>Assigned date</label><span>20/05/2022</span></li>
											<li><label>Planned start date</label><span>27/05/2022</span></li>
											<li><label>Actual start date</label><span>27/05/2022</span></li>
											<li><label>Deviation</label><span>0 Days</span></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-xs-12">
							<div className="overview-right-content">
								<div className="overview-heading">
									<div className="heading-left">
										<button type="button" className="btn btn-primary detailed-btn">View Detailed Log</button>
									</div>
									<div className="heading-right">
										<label>Sort By&#58;</label>  <Link to={""}>Most Recent </Link>
									</div>
								</div>
								<div className="overview-right-inner-content">
									<SimpleBar style={{ maxHeight: 380 }}>
										<ul>
											<li>
												<p><strong>Task Created</strong> Day 1</p>
												<span>Created by Zakir on 25 Feb 2021 at 03.00PM</span>
											</li>
											<li>
												<p><strong>Task Assigned</strong></p>
												<span>Assigned by Zakir to Ganesh on 25 Feb 2021 at 03.01PM</span>
											</li>
											<li>
												<p><strong>Dashboard Details</strong> Day 1</p>
												<span>Filled in by Ganesh on 25 Feb 2021 at 04.00PM</span>
											</li>
											<li>
												<p><strong>Create Edit Dashboard</strong> Day 1</p>
												<span>Ganesh Started working on creating dashboard on 25 Feb 2021 at 04.15PM</span>
											</li>
											<li>
												<p><strong>Import Dashboard</strong> Day 1</p>
												<span>create by Zakir 25 Feb 2021 at 03.01 PM</span>
											</li>
											<li>
												<p><strong>Import Dashboard</strong> Day 1</p>
												<span>create by Zakir 25 Feb 2021 at 03.01 PM</span>
											</li>
											<li>
												<p><strong>Import Dashboard</strong> Day 1</p>
												<span>create by Zakir 25 Feb 2021 at 03.01 PM</span>
											</li>
											<li>
												<p><strong>Import Dashboard</strong> Day 1</p>
												<span>create by Zakir 25 Feb 2021 at 03.01 PM</span>
											</li>
											<li>
												<p><strong>Import Dashboard</strong> Day 1</p>
												<span>create by Zakir 25 Feb 2021 at 03.01 PM</span>
											</li>
											<li>
												<p><strong>Import Dashboard</strong> Day 1</p>
												<span>create by Zakir 25 Feb 2021 at 03.01 PM</span>
											</li>
											<li>
												<p><strong>Import Dashboard</strong> Day 1</p>
												<span>create by Zakir 25 Feb 2021 at 03.01 PM</span>
											</li>
											<li>
												<p><strong>Import Dashboard</strong> Day 1</p>
												<span>create by Zakir 25 Feb 2021 at 03.01 PM</span>
											</li>
											<li>
												<p><strong>Import Dashboard</strong> Day 1</p>
												<span>create by Zakir 25 Feb 2021 at 03.01 PM</span>
											</li>
										</ul>
									</SimpleBar>
								</div>
							</div>
						</div>
						<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<div className="updates-comments-section">
								<label>Updates and Comments</label>
								<div className="update-content-box">
									<div className="search-bar">
										<input type="text" className="control-form" placeholder='Add new comment here' />
									</div>
									<div className="user-comments-content">
										<div className="user-image">
											<img src="https://www.pinoytechnoguide.com/wp-content/uploads/2021/10/vivo-X70-sample-picture-person-portrait-mode.jpg" alt="image" />
										</div>
										<div className="user-comments-text">
											<div className="user-name">
												<p><Link to="">Angela Moss</Link>  Added a comment - 30 minutes ago</p>
											</div>
											<div className="user-text">
												<p>Code is developed and updated in GitHub</p>
											</div>
											<div className="user-coment">
												<label>comment</label> <Link to=''> Like</Link>
											</div>

										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}
