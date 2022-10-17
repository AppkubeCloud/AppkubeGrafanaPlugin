import * as React from 'react';
import { CreateNewOU } from './CreateNewOU';

export class Ou extends React.Component<any, any> {
	createNewOURef: any;
	constructor(props: any) {
		super(props);
		this.state = {
			collapsed: [],
			selectedData: []
		};
		this.createNewOURef = React.createRef();
	}

	collapseExpand = (index: any) => {
		const { collapsed } = this.state;
		collapsed[index] = !collapsed[index];
		this.setState({
			collapsed
		});
	};

	onClickCreateNewOU = (CreateNewOU: any) => {
		this.createNewOURef.current.toggle(CreateNewOU);
	};

	selectUnit = (id: any, unitId: any) => {
		this.setState({
			selectedData: [ id, unitId ]
		});
	};

	renderOrganizations = (organizationList: any) => {
		const { collapsed, selectedData } = this.state;
		const retData = [];
		const units = organizationList.organizationalUnitList;
		const unitsJSX = [];
		if (units) {
			for (let j = 0; j < units.length; j++) {
				unitsJSX.push(
					<li
						onClick={() => this.selectUnit(organizationList.id, units[j].id)}
						className={`${selectedData[1] === units[j].id ? 'selected' : ''}`}
						key={`unit-${j}`}
					>
						{units[j].name}
					</li>
				);
			}
		}

		retData.push(
			<li key={`org-0`}>
				<div className="text">
					<div
						onClick={() => this.collapseExpand(0)}
						className={`${collapsed[0] ? 'caret-down' : 'caret-right'}`}
					/>
					<label
						onClick={() => this.selectUnit(organizationList.id, '')}
						className={`${selectedData[0] === organizationList.id ? 'selected' : ''}`}
					>
						{organizationList.name}
					</label>
				</div>
				{collapsed[0] && <ul className="show">{unitsJSX}</ul>}
			</li>
		);
		return retData;
	};

	refresh = () => {
		this.props.getOrganizationList();
	};

	getSelection = () => {
		return this.state.selectedData;
	};

	render() {
		const { organizationList } = this.props;
		return (
			<div className="d-inline-block width-100 account-setup-tab-contents">
				<div className="contents">
					<div className="sub-heading">
						<strong>Select Organizational Unit to Associate with Cloud Account Or Create new</strong>
					</div>
					<p>
						Select the OU from below or{' '}
						<strong>
							<a onClick={this.onClickCreateNewOU}>create new OU</a>
						</strong>
					</p>
					<div className="collapse-contents">
						<ul>{organizationList !== null && this.renderOrganizations(organizationList)}</ul>
					</div>
				</div>
				<CreateNewOU ref={this.createNewOURef} organizationList={organizationList} refresh={this.refresh} />
			</div>
		);
	}
}
