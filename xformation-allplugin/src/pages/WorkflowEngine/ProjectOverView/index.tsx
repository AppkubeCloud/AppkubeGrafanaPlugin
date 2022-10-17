import * as React from 'react';
import { Link } from 'react-router-dom';
import downloadIcon from '../../../img/projectoverview/download-icon.png'
import WorkFlow from '../../../components/WorkFlowCommonComponent'
import ErrorBoundary from '../../../components/ErrorBoundary/index'
import { AwsHelper } from '../AwsHelpers';
import AssetOverViewReusableComp from '../../../components/AssetOverViewCommonComponent/index'
import { ROUTES } from '../../../constants';
import { prefixRoute } from '../../../utils/utils.routing';

export class ProjectOverView extends React.Component<any, any> {
  awsHelper: any
  constructor(props: any) {
    super(props);
    this.state = {
      selectedUseCaseData: {},
      activeStage: 0,
      stageList: [],
      activeUseCaseIndex: 0,
      disabledNavList: false,
      useCaseList: [],
      useCaseStagesLength: -1,
      toggleAssetView: false,
      matrixView: false,
      userList: [
        { name: 'John', id: '1' },
        { name: 'Smith', id: '2' },
        { name: 'Rado', id: '3' },
        { name: 'Smyten', id: '4' },
        { name: 'Oliver', id: '5' },
        { name: 'Harry', id: '6' },
        { name: 'George', id: '7' },
        { name: 'Jack', id: '8' }
      ],

    };
    this.awsHelper = new AwsHelper({ meta: props.meta });
  }
  componentDidMount() {
    this.setState({ useCaseName: this.props.match.params.id })
    this.awsHelper.getUsecaseList((useCaseList: any) => {
      useCaseList.forEach((useCase: any) => {
        if (useCase?.stepinput) {
          useCase.stepinput = useCase.stepinput;
          if (useCase?.stepinput?.stages?.length > 0) {
            this.awsHelper.getExecutionHistory(
              "arn:aws:states:us-east-1:657907747545:execution:send-to-pre-state:9bc49c92-4016-47a5-8a22-88d353e912ab",
              (items: any) => {
                const useCases = this.state.useCaseList;
                // if (useCase.stepinput.S.stages.length>0){
                useCases.push({
                  ...useCase,
                  steps: items,
                  executionArn: { S: "arn:aws:states:us-east-1:657907747545:execution:send-to-pre-state:9bc49c92-4016-47a5-8a22-88d353e912ab" }
                });
                this.setState({
                  useCaseList: useCases,

                  selectedUseCaseData: useCases[this.state.activeUseCaseIndex]

                });
                // }
              },
              (err: any) => { console.log(err) }
            );
          }
        }
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

  toggleDisabledNavList = () => {
    this.setState({ disabledNavList: !this.state.disabledNavList })
  }

  displayUseCaseList = () => {
    const { useCaseList, activeUseCaseIndex } = this.state;
    let retData = [];
    if (useCaseList && useCaseList.length > 0) {
      for (let i = 0; i < useCaseList.length; i++) {
        retData.push(
          <li className={i == activeUseCaseIndex ? "active" : ''} key={`${i}_usecase_list`} onClick={() => { !this.state.disabledNavList ? this.setUseCaseData(i) : "" }}>
            {/* <Link to="/"> */}
            <span>{useCaseList[i].usecasename}</span>
            {/* </Link> */}
          </li>
        )
      }
    }
    return retData;
  }
  setUseCaseData = (index: any) => {
    const { useCaseList } = this.state

    let data = useCaseList[index]
    if (data?.stepinput) {
      this.setState({ selectedUseCaseData: data, matrixView: false })
    }
    this.setState({ activeUseCaseIndex: index, activeStage: 0, matrixView: false })

  }
  toggleMatrixView = () => {
    this.setState({ matrixView: !this.state.matrixView })
  }
  render() {
    const { useCaseList, useCaseStagesLength, activeStage, matrixView, activeUseCaseIndex, toggleAssetView } = this.state;
    let AssetOverViewPropsData = {
      usecasename: useCaseList[activeUseCaseIndex]?.usecasename ? useCaseList[this.state.activeUseCaseIndex].usecasename : '',
      usecaseStageList: useCaseList[activeUseCaseIndex]?.stepinput?.stages ? useCaseList[this.state.activeUseCaseIndex].stepinput.stages : "",
      matrixView: matrixView
    }
    return (
      <div className="project-over-view-container">
        <div className="project-over-view-section">
          <div className="fliter-container">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
                <div className="heading">{!toggleAssetView ? `Procurement Workflow management` : `Asset OverView`}</div>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-xs-12">
                <div className="fliter-right-content">
                  <div className="plus-icon col-12">
                    <Link to={prefixRoute(ROUTES.CreateUsecase)}>
                      <i className="fa fa-plus" />
                    </Link>
                  </div>
                  <div className="image">
                    <button className='project-btn' onClick={() => { this.setState({ toggleAssetView: !toggleAssetView }) }}>
                      <img src={downloadIcon} alt="" />
                    </button>
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
                      < input
                        type={'Search for...'}
                        className="input-group-text"
                        placeholder={'Search for...'}
                      />
                    </div>
                  </div>
                  <Link to={prefixRoute(ROUTES.ProjectWise)} className="btn-primary pro-overview-btn"><i className="fas fa-chevron-left"></i> Back</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="project-over-view-inner-content">
            <div className="project-over-view-left-content">
              <div className="sidebar">
                <ul>
                  {this.displayUseCaseList()}
                </ul>
              </div>
            </div>
            {!toggleAssetView ?
              <ErrorBoundary useCaseStagesLength={useCaseStagesLength} selectedUseCaseData={this.state.selectedUseCaseData} useCaseListLength={useCaseList.length} toggleDisabledNavList={this.toggleDisabledNavList} setUseCaseData={this.setUseCaseData} activeUseCaseIndex={this.state.activeUseCaseIndex}>
                <WorkFlow activeStage={activeStage} selectedUseCaseData={this.state.selectedUseCaseData} setUseCaseData={this.setUseCaseData} activeUseCaseIndex={this.state.activeUseCaseIndex} editFormData={true} />
              </ErrorBoundary>
              :
              <div className="project-over-view-inner-content">
                <div className="project-over-view-right-content">
                  <div className={`receive-rfq-content ${!matrixView ? "" : "matrix-view-content"}`}>
                    {!matrixView && <div className="line">
                      <span className="line1" />
                      <span className="line2" />
                      <span className="line3" />
                    </div>}
                    {useCaseList[this.state.activeUseCaseIndex]?.stepinput?.stages && <div className="row">
                      <AssetOverViewReusableComp AssetOverViewPropsData={{ ...AssetOverViewPropsData }} toggleMatrixView={this.toggleMatrixView} />
                    </div>}
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}