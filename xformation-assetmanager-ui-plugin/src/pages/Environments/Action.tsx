import * as React from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { configFun } from '../../config';
import { RestService } from '../_service/RestService';
import AlertMessage from '../../components/AlertMessage';
import { PLUGIN_BASE_URL } from '../../constants';

export class Action extends React.Component<any, any> {
  InputAccountRef: any;
  config: any;
  constructor(props: any) {
    super(props);
    this.state = {
      isAlertOpen: false,
      message: null,
      severity: null,
      isSubmitted: false,
      openCreateMenu: false,
      detailObj: this.props.detail,
      modal: false,
      dataSource: "",
      awsRegionList: this.props.regionList,
      dsName: "",
      dsAccessKey: "",
      dsSecretKey: "",
      dsRegion: "",
      grafanaResponse: "",
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

  onClickAddInput = (e: any, selectedEnviornment: any) => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  toggle = async () => {
    this.setState({
      modal: !this.state.modal,
    });
    this.clearData();
  };

  onChangeDataSource = (e: any) => {
    this.setState({
      dataSource: e.target.value,
    });
  };

  createAwsDropDown(awsRegionList: any) {
    let retData = [];
    if (awsRegionList) {
      for (let i = 0; i < awsRegionList.length; i++) {
        retData.push(
          <option key={awsRegionList[i]} value={awsRegionList[i]}>
            {awsRegionList[i]}
          </option>
        );
      }
    }
    return retData;
  }

  onChange = (e: any) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  validate = (isSubmitted: any) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    const retData = {
      dsName: validObj,
      dsAccessKey: validObj,
      dsSecretKey: validObj,
      dsRegion: validObj,
    };
    if (isSubmitted) {
      const { dsName, dsAccessKey, dsSecretKey, dsRegion } = this.state;
      if (!dsName) {
        retData.dsName = {
          isValid: false,
          message: "Please enter datasource name",
        };
      }
      if (!dsAccessKey) {
        retData.dsAccessKey = {
          isValid: false,
          message: "Please enter datasource access key id",
        };
      }
      if (!dsSecretKey) {
        retData.dsSecretKey = {
          isValid: false,
          message: "Please enter datasource secret access key",
        };
      }
      if (!dsRegion) {
        retData.dsRegion = {
          isValid: false,
          message: "Please select aws default region",
        };
      }
    }
    return retData;
  };

  addDataSource = async (e: any) => {
    this.setState({
      isSubmitted: true,
    });

    const errorData = this.validate(true);
    if (
      errorData?.dsName.isValid === false ||
      errorData?.dsAccessKey.isValid === false ||
      errorData?.dsSecretKey.isValid === false ||
      errorData?.dsRegion.isValid === false
    ) {
      return;
    }
    await this.addDataSourceInGrafana(e);
    const { grafanaResponse } = this.state;
    console.log("grafanaResponse: ", grafanaResponse);
    if (grafanaResponse.message !== "Datasource added") {
      console.log("ERROR in grafana");
      this.setState({
        isAlertOpen: true,
        message: grafanaResponse.message,
        severity: 'error',
      });
    } else {
      await this.addDataSourceInAssetService(e);
      this.setState({
        isAlertOpen: true,
        message: grafanaResponse.message,
        severity: 'success',
      });
    }

    this.setState({
      isSubmitted: false,
    });
  };

  addDataSourceInAssetService = async (e: any) => {
    const { grafanaResponse, detailObj, dataSource, dsName } = this.state;
    // console.log('Grafana ds resp: ', grafanaResponse);
    let inp = {
      accountId: detailObj.accountId,
      tenantId: detailObj.tenantId,
      type: dataSource,
      inputSource: "GRAFANA DATASOURCE",
      inputSourceId: grafanaResponse.uid,
      name: dsName,
      description: "GRAFANA DATASOURCE - " + dsName,
      status: "DEACTIVE",
    };
    await RestService.add(`${this.config.ADD_INPUT}`, inp).then((response: any) => {
      console.log("Enable input response : ", response);
    });
  };

  addDataSourceInGrafana = async (e: any) => {
    e.preventDefault();
    this.setState({
      isSubmitted: true,
    });
    // const errorData = this.validate(true);
    // if(errorData?.dsName.isValid === false || errorData?.dsAccessKey.isValid === false
    //     || errorData?.dsSecretKey.isValid === false || errorData?.dsRegion.isValid === false){
    //     // console.log('Validation error ', errorData);
    //     return;
    // }
    // console.log('validation pass');

    const {
      dataSource,
      dsName,
      dsAccessKey,
      dsSecretKey,
      dsRegion,
      detailObj,
    } = this.state;
    // console.log('detailObj : ',detailObj);
    let ds = {
      name: dsName,
      type: dataSource,
      access: "proxy",
      basicAuth: false,
      withCredentials: false,
      isDefault: false,
      jsonData: {
        authType: "keys",
        defaultRegion: dsRegion,
      },
      secureJsonData: {
        accessKey: dsAccessKey,
        secretKey: dsSecretKey,
      },
      accountId: detailObj.accountId,
      tenantId: detailObj.tenantId,
    };
    var json = JSON.stringify(ds);
    var reqOpt = RestService.postOptionWithAuthentication(json);
    // console.log('Add datasource options : ', reqOpt);
    await fetch(this.config.ADD_DATASOURCE_IN_GRAFANA, reqOpt)
      .then((response) => response.json())
      .then((result) => {
        // console.log("Add datasource in grafana. Response status : ",result)
        this.setState({
          grafanaResponse: result,
        });
        // if(result.message === 'Datasource added') {
        //     this.setState({
        //         isAlertOpen: true,
        //         message: result.message,
        //         severity: this.config.SEVERITY_SUCCESS,

        //     })
        // }else{
        //     this.setState({
        //         isAlertOpen: true,
        //         message: result.message,
        //         severity: this.config.SEVERITY_ERROR,

        //     })
        // }
      })
      .catch((error) => {
        console.log("Add satasource in grafana failed. Error", error);
      });
    this.setState({
      isSubmitted: false,
    });
  };

  clearData = () => {
    this.setState({
      dataSource: "",
      dsName: "",
      dsAccessKey: "",
      dsSecretKey: "",
      dsRegion: "",
      isSubmitted: false,
    });
  };

  handleCloseAlert = (e: any) => {
    this.setState({
      isAlertOpen: false,
      message: "",
      severity: "",
    });
  };

  render() {
    const {
      openCreateMenu,
      detailObj,
      modal,
      dataSource,
      awsRegionList,
      isSubmitted,
      isAlertOpen,
      severity,
      message,
    } = this.state;
    const errorData = this.validate(isSubmitted);
    return (
      <div className="col-lg-4 col-md-4 col-sm-12 text-right">
        <Modal
          isOpen={modal}
          toggle={this.toggle}
          className="modal-container assetmanager-modal-container"
        >
          <AlertMessage
            handleCloseAlert={this.handleCloseAlert}
            open={isAlertOpen}
            severity={severity}
            msg={message}
          ></AlertMessage>

          <ModalHeader toggle={this.toggle}>Add New Input</ModalHeader>
          <ModalBody
            style={{
              height: "calc(60vh - 50px)",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="description">Data Source</label>
                  <select
                    className="input-group-text"
                    name="inputType"
                    value={dataSource}
                    onChange={this.onChangeDataSource}
                  >
                    <option key="" value="">
                      Select Data Source
                    </option>
                    <option key="cloudwatch" value="cloudwatch">
                      AWS CloudWatch
                    </option>
                  </select>
                </div>
              </div>
            </div>
            {this.state.dataSource === "cloudwatch" && (
              <div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="description">Name</label>
                      <input
                        type="text"
                        name="dsName"
                        id="dsName"
                        onChange={this.onChange}
                        maxLength={255}
                        className="input-group-text"
                        placeholder="DataSource Name"
                      />
                      <span style={{ color: "red" }}>
                        {errorData?.dsName.message}
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="description">Access Key Id</label>
                      <input
                        type="text"
                        name="dsAccessKey"
                        id="dsAccessKey"
                        onChange={this.onChange}
                        maxLength={255}
                        className="input-group-text"
                        placeholder="Access Key Id"
                      />
                      <span style={{ color: "red" }}>
                        {errorData?.dsAccessKey.message}
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="description">Secret Access Key</label>
                      <input
                        type="text"
                        name="dsSecretKey"
                        id="dsSecretKey"
                        onChange={this.onChange}
                        maxLength={255}
                        className="input-group-text"
                        placeholder="Secret Access Key"
                      />
                      <span style={{ color: "red" }}>
                        {errorData?.dsSecretKey.message}
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="description">Default Region</label>
                      <select
                        className="input-group-text"
                        name="dsRegion"
                        id="dsRegion"
                        onChange={this.onChange}
                      >
                        <option key="" value="">
                          Select AWS Region
                        </option>
                        {this.createAwsDropDown(awsRegionList)}
                      </select>
                      <span style={{ color: "red" }}>
                        {errorData?.dsRegion.message}
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group text-center">
                      <button
                        className="asset-blue-button m-r-1"
                        onClick={this.addDataSource}
                      >
                        Save
                      </button>
                      <button
                        className="asset-blue-button m-l-1"
                        onClick={this.toggle}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </ModalBody>
        </Modal>

        {/* <Rbac parentName={this.config.PARENT_NAME} childName="commancomponent-createbuttoncomponent-createbtn"> */}
        <a className="fa fa-ellipsis-h" onClick={this.onClickOpenSubLink}></a>
        {/* </Rbac> */}

        {openCreateMenu == true && (
          <>
            <div
              className="open-create-menu"
              style={{ right: "-30px", top: "20px" }}
            >
              {/* <Rbac  childName="commancomponent-createbuttoncomponent-companytbtn"> */}
              <Link to='' onClick={(e) => this.onClickAddInput(e, detailObj)}>
                Add New DataSource
              </Link>
              {/* </Rbac> */}
              {/* <Rbac parentName={this.config.PARENT_NAME} childName="commancomponent-createbuttoncomponent-agentbtn"> */}
              <Link
                to={`${PLUGIN_BASE_URL}/amazon-services?asset_id=${detailObj.id
                  }&org_id=${detailObj.organization ? detailObj.organization.id : null
                  }`}
              >
                Add Compliancies
              </Link>
              {/* </Rbac> */}
              <Link
                to=""
              // to={`${PLUGIN_BASE_URL}/amazon-services?asset_id=${
              //   detailObj.id
              // }&org_id=${
              //   detailObj.organization ? detailObj.organization.id : null
              // }`}
              >
                Associate to OU
              </Link>
              {/* </Rbac> */}
              <Link
                to=""
              // to={`${PLUGIN_BASE_URL}/amazon-services?asset_id=${
              //   detailObj.id
              // }&org_id=${
              //   detailObj.organization ? detailObj.organization.id : null
              // }`}
              >
                Add New VPC
              </Link>
              {/* </Rbac> */}
              <Link
                to=""
              // to={`${PLUGIN_BASE_URL}/amazon-services?asset_id=${
              //   detailObj.id
              // }&org_id=${
              //   detailObj.organization ? detailObj.organization.id : null
              // }`}
              >
                Add New Product
              </Link>
            </div>
            <div className="open-create-menu-close" onClick={this.onClickOpenSubLink}></div>
          </>
        )}
        {/* <InputAccount ref={this.InputAccountRef} />         */}
      </div>
    );
  }
}
