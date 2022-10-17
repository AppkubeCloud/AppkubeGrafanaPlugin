import * as React from 'react';
import AssetOverViewReusableComp from '../../../components/AssetOverViewCommonComponent'
export class AssetView extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			// usecaseStageList: {
			// 	name: 'ipsa',
			// 	description: 'Recusandae libero eveniet ducimus.',
			// 	assignTo: 'string',
			// 	id: 3,
			// 	useCase: {},
			// 	stages: [
			// 		{
			// 			checkList: [
			// 				{ label: 'string', id: 3 },
			// 				{ label: 'string', id: 10 },
			// 				{ label: 'string', id: 6 },
			// 				{ label: 'string', id: 6 },
			// 				{ label: 'string', id: 1 }
			// 			],
			// 			steps: [
			// 				{ label: 'et', description: 'string', link: 'https://waino.org', status: 'string', id: 7 },
			// 				{ label: 'eum', description: 'string', link: 'https://noemi.org', status: 'string', id: 7 }
			// 			],
			// 			name: 'quaerat',
			// 			assignedTo: 'string',
			// 			description: 'string',
			// 			id: 7,
			// 			status: 'string'
			// 		},
			// 		{
			// 			checkList: [
			// 				{ label: 'string', id: 6 },
			// 				{ label: 'string', id: 7 },
			// 				{ label: 'string', id: 9 },
			// 				{ label: 'string', id: 8 },
			// 				{ label: 'string', id: 8 }
			// 			],
			// 			steps: [
			// 				{
			// 					label: 'dolores',
			// 					description: 'string',
			// 					link: 'http://camron.com',
			// 					status: 'string',
			// 					id: 9
			// 				},
			// 				{
			// 					label: 'voluptatem',
			// 					description: 'string',
			// 					link: 'https://nicholaus.biz',
			// 					status: 'string',
			// 					id: 7
			// 				}
			// 			],
			// 			name: 'qui',
			// 			assignedTo: 'string',
			// 			description: 'string',
			// 			id: 8,
			// 			status: 'string'
			// 		},
			// 		{
			// 			checkList: [
			// 				{ label: 'string', id: 2 },
			// 				{ label: 'string', id: 7 },
			// 				{ label: 'string', id: 4 },
			// 				{ label: 'string', id: 1 },
			// 				{ label: 'string', id: 2 }
			// 			],
			// 			steps: [
			// 				{
			// 					label: 'corporis',
			// 					description: 'string',
			// 					link: 'http://hershel.com',
			// 					status: 'string',
			// 					id: 6
			// 				},
			// 				{
			// 					label: 'dolorum',
			// 					description: 'string',
			// 					link: 'http://elisabeth.net',
			// 					status: 'string',
			// 					id: 5
			// 				}
			// 			],
			// 			name: 'omnis',
			// 			assignedTo: 'string',
			// 			description: 'string',
			// 			id: 5,
			// 			status: 'string'
			// 		},
			// 		{
			// 			checkList: [
			// 				{ label: 'string', id: 7 },
			// 				{ label: 'string', id: 6 },
			// 				{ label: 'string', id: 4 },
			// 				{ label: 'string', id: 7 },
			// 				{ label: 'string', id: 4 }
			// 			],
			// 			steps: [
			// 				{
			// 					label: 'error',
			// 					description: 'string',
			// 					link: 'https://triston.us',
			// 					status: 'string',
			// 					id: 8
			// 				},
			// 				{
			// 					label: 'aspernatur',
			// 					description: 'string',
			// 					link: 'http://blanca.us',
			// 					status: 'string',
			// 					id: 2
			// 				}
			// 			],
			// 			name: 'veritatis',
			// 			assignedTo: 'string',
			// 			description: 'string',
			// 			id: 6,
			// 			status: 'string'
			// 		},
			// 		{
			// 			checkList: [
			// 				{ label: 'string', id: 5 },
			// 				{ label: 'string', id: 3 },
			// 				{ label: 'string', id: 7 },
			// 				{ label: 'string', id: 10 },
			// 				{ label: 'string', id: 6 }
			// 			],
			// 			steps: [
			// 				{ label: 'aut', description: 'string', link: 'https://audie.us', status: 'string', id: 1 },
			// 				{
			// 					label: 'provident',
			// 					description: 'string',
			// 					link: 'http://gavin.biz',
			// 					status: 'string',
			// 					id: 3
			// 				}
			// 			],
			// 			name: 'nostrum',
			// 			assignedTo: 'string',
			// 			description: 'string',
			// 			id: 8,
			// 			status: 'string'
			// 		},
			// 		{
			// 			checkList: [
			// 				{ label: 'string', id: 5 },
			// 				{ label: 'string', id: 9 },
			// 				{ label: 'string', id: 4 },
			// 				{ label: 'string', id: 8 },
			// 				{ label: 'string', id: 7 }
			// 			],
			// 			steps: [
			// 				{
			// 					label: 'qui',
			// 					description: 'string',
			// 					link: 'http://candida.us',
			// 					status: 'string',
			// 					id: 10
			// 				},
			// 				{
			// 					label: 'in',
			// 					description: 'string',
			// 					link: 'https://antonette.info',
			// 					status: 'string',
			// 					id: 8
			// 				}
			// 			],
			// 			name: 'non',
			// 			assignedTo: 'string',
			// 			description: 'string',
			// 			id: 4,
			// 			status: 'string'
			// 		}
			// 	]
			// },
			useCase: {},
			matrixView: false,
			usecaseStageList: [],
		};
	}

	setUseCaseData = (data: any) => {
		if (data?.stepinput?.stages?.length && data.stepinput.stages.length > 0) {
			this.setState({
				useCase: data,
				usecaseStageList: data.stepinput.stages
			});
		}
	};

	toggleMatrixView = () => {
		this.setState({ matrixView: !this.state.matrixView })
	}
	render() {
		const { useCase, matrixView } = this.state
		let AssetOverViewPropsData={
			usecasename:useCase.usecaseName,
			usecaseStageList:this.state.usecaseStageList,
			matrixView:matrixView,
		}
		return (
			<>
				<div className={`receive-rfq-content assets-inner-content ${!matrixView ? "" : "matrix-view-content"}`}>
					{!matrixView && <div className="line">
						<span className="line1" />
						<span className="line2" />
						<span className="line3" />
					</div>}
					<div className="row">
						<AssetOverViewReusableComp AssetOverViewPropsData={{...AssetOverViewPropsData}} 	toggleMatrixView={this.toggleMatrixView} />
					</div>
				</div>
			</>
		);
	}
}
