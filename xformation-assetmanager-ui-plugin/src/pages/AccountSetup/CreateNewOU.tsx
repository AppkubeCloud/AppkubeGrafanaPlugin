import * as React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { RestService } from '../_service/RestService';
import { configFun } from '../../config';

export class CreateNewOU extends React.Component<any, any> {
	steps: any;
	config: any;
	constructor(props: any) {
		super(props);
		this.state = {
			modal: false,
			collapsed: [],
			ouname: '',
			isSubmitted: false
		};
		this.config = configFun(props.meta.jsonData.apiUrl, props.meta.jsonData.mainProductUrl, props.meta.jsonData.grafanaUrl);
	}

	toggle = async (selectedOrganizational: any) => {
		this.setState({
			modal: !this.state.modal,
			OrganizationalName: selectedOrganizational.name,
			OrganizationalId: selectedOrganizational.id
		});
	};

	handleClose = () => {
		this.setState({
			modal: false
		});
	};

	collapseExpand = (index: any) => {
		const { collapsed } = this.state;
		collapsed[index] = !collapsed[index];
		this.setState({
			collapsed
		});
	};

	handlestateChange = (e: any) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	validate = (submitted: any) => {
		const validObj = {
			isValid: true,
			message: ''
		};
		let isValid = true;
		const retData = {
			ouName: validObj,
			isValid
		};
		if (submitted) {
			const { ouname } = this.state;
			if (!ouname) {
				retData.ouName = {
					isValid: false,
					message: 'Name is required'
				};
				isValid = false;
			}
		}
		retData.isValid = isValid;
		return retData;
	};

	createOu = (event: any) => {
		event.preventDefault();
		this.setState({
			isSubmitted: true
		});
		const errorData = this.validate(true);
		if (errorData.isValid) {
			const { ouname } = this.state;
			const { organizationList } = this.props;
			// if (organizationList.length > 0) {
			const id = organizationList.id;
			RestService.add(`${this.config.ADD_ORGANIZATION_UNIT}/${id}/${ouname}`, {}).then((resp: any) => {
				this.props.refresh();
				this.setState({
					modal: false
				});
			});
			// }
		}
	};

	renderOrganizations = (organizationList: any) => {
		const { collapsed } = this.state;
		const retData = [];

		if (organizationList === null || organizationList === undefined) {
			return;
		}
		const units = organizationList.organizationalUnitList;
		const unitsJSX = [];
		if (units) {
			for (let j = 0; j < units.length; j++) {
				unitsJSX.push(<li key={`unit-0`}>{units[j].name}</li>);
			}
		}

		retData.push(
			<li key={`org-0`}>
				<div className="text">
					<div
						onClick={() => this.collapseExpand(0)}
						className={`${collapsed[0] ? 'caret-down' : 'caret-right'}`}
					/>
					{organizationList.name}
				</div>
				{collapsed[0] && <ul className="show">{unitsJSX}</ul>}
			</li>
		);
		// }
		return retData;
	};

	render() {
		const { modal, ouname, isSubmitted } = this.state;
		const { organizationList } = this.props;
		const errorData = this.validate(isSubmitted);
		return (
			<Modal isOpen={modal} toggle={this.toggle} className="modal-container assetmanager-modal-container">
				<ModalHeader toggle={this.toggle}>Create New Organizational Unit </ModalHeader>
				<ModalBody style={{ height: 'calc(62vh - 50px)', overflowY: 'auto', overflowX: 'hidden' }}>
					<div className="row">
						<div className="col-lg-12 col-md-12 col-sm-12">
							<div className="form-group">
								<label htmlFor="Name">Name</label>
								<input
									type="text"
									id="name"
									name="ouname"
									value={ouname}
									className="input-group-text"
									onChange={this.handlestateChange}
									placeholder="Name of OU"
								/>
							</div>
							<span>{errorData.ouName.message}</span>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12 col-md-12 col-sm-12">
							<div className="form-group">
								<label htmlFor="Select">Select the Account or OU below</label>
								<div className="collapse-contents">
									<ul>{organizationList !== null && this.renderOrganizations(organizationList)}</ul>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12 col-md-12 col-sm-12">
							<div className="d-block text-right p-t-20 contact-popup-buttons">
								<button className="asset-blue-button m-b-0" onClick={this.handleClose}>
									Cancel
								</button>
								<button className="asset-blue-button m-r-0 m-b-0" onClick={this.createOu}>
									Create
								</button>
							</div>
						</div>
					</div>
				</ModalBody>
			</Modal>
		);
	}
}
