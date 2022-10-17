import * as React from 'react';
import { Link } from 'react-router-dom';
import { configFun } from '../../../config';
// import { RestService } from '../_service/RestService';
// import Rbac from '../../components/Rbac';
// import { InputAccount } from '../Input/InputAccout';

export class CreateButtonInput extends React.Component<any, any> {
  InputAccountRef: any;
  config: any;
  constructor(props: any) {
    super(props);
    this.state = {
      openCreateMenu: false,
      detailObj: this.props.detail,
    };
    this.InputAccountRef = React.createRef();
    this.config = configFun(props.meta.jsonData.apiUrl, props.meta.jsonData.mainProductUrl, props.meta.jsonData.grafanaUrl);
  }

  onClickOpenSubLink = () => {
    let menu = !this.state.openCreateMenu;
    this.setState({
      openCreateMenu: menu,
    });
  };

  // onClickInputAccount = () => {
  //     this.InputAccountRef.current.toggle();
  // }
  onClickInputAccount = (e: any, selectedEnviornment: any) => {
    this.InputAccountRef.current.toggle(selectedEnviornment);
  };

  render() {
    const { openCreateMenu, detailObj } = this.state;
    console.log('CreateButtonInput: ', detailObj);
    return (
      <div className="col-lg-4 col-md-4 col-sm-12 text-right">
        {/* <Rbac parentName={config.PARENT_NAME} childName="commancomponent-createbuttoncomponent-createbtn"> */}
        <a className="fa fa-ellipsis-h" onClick={this.onClickOpenSubLink}></a>
        {/* </Rbac> */}

        {openCreateMenu == true && (
          <div className="text-center open-create-menu" style={{ right: '-62px', top: '15px' }}>
            {/* <Rbac  childName="commancomponent-createbuttoncomponent-companytbtn"> */}
            <a onClick={(e) => this.onClickInputAccount(e, detailObj.environment.name)}> Add Input </a>
            {/* </Rbac> */}
            {/* <Rbac parentName={config.PARENT_NAME} childName="commancomponent-createbuttoncomponent-agentbtn"> */}
            <Link
              to={`${this.config.basePath}/amazonservices?asset_id=${detailObj.id}&org_id=${
                detailObj.organization ? detailObj.organization.id : null
              }`}
            >
              Details
            </Link>
            {/* </Rbac> */}
          </div>
        )}
        {/* <InputAccount ref={this.InputAccountRef} />         */}
      </div>
    );
  }
}
