import * as React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { CustomTextbox } from '../../components/CustomTextbox';
import AlertMessage from '../../components/AlertMessage';

export class OrganisationUnit extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      organisationunitName: null,
      organizatioName: null,
      isApiCalled: false,
      modal: false,
      folderArray: [],
      checkedFolder: [],
      isAlertOpen: false,
      message: null,
      severity: null,
      isSubmitted: false,
    };
    this.handleCloseAlert = this.handleCloseAlert.bind(this);
  }

  async componentDidMount() {
    this.setState({
      isApiCalled: true,
    });
  }
  toggle = async (selectedorganization: any) => {
    this.setState({
      modal: !this.state.modal,
      organizatioName: selectedorganization,
    });
    console.log("Organizatio name: ", selectedorganization);
  };
  saveOrganisationunit = async (e: any) => {
    e.preventDefault();
    this.setState({
      isSubmitted: true,
    });
    const errorData = this.validate(true);
    console.log("Error Data : ", errorData);
    if (!errorData.organizatioName.isValid) {
      return;
    }
    if (!errorData.organisationunitName.isValid) {
      return;
    } else {
      this.setState({
        isSubmitted: false,
      });
    }
  };

  validate = (isSubmitted: any) => {
    const validObj = {
      isValid: true,
      message: "",
    };
    const retData = {
      organizatioName: validObj,
      organisationunitName: validObj,
    };
    if (isSubmitted) {
      const { organizatioName, organisationunitName } = this.state;
      console.log("Organisation name: ", organizatioName);
      console.log("Organisation unit name: ", organisationunitName);
      if (!organizatioName) {
        retData.organizatioName = {
          isValid: false,
          message:
            "Organisation is required. Please create organization before adding any organizational unit under it",
        };
      }
      if (!organisationunitName) {
        retData.organisationunitName = {
          isValid: false,
          message: " Organisationunit is required",
        };
      }
    }
    return retData;
  };
  handleClose = () => {
    this.setState({
      modal: false,
    });
  };

  setLink = (link: any) => {
    this.setState({
      link,
    });
  };
  HandleClose = () => {
    this.setState({
      modal: false,
    });
  };
  handleCloseAlert = (e: any) => {
    this.setState({
      isAlertOpen: false,
    });
  };
  handleStateChange = (e: any) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  onClickFilterType = (e: any) => {
    const Type = e.target.value;
    console.log("Selected  type :: ", Type);
    this.setState({
      Type: Type,
    });
  };
  render() {
    const { isSubmitted } = this.state;
    const state = this.state;
    const errorData = this.validate(isSubmitted);
    return (
      <Modal
        isOpen={state.modal}
        toggle={this.toggle}
        className="modal-container servicdesk-modal-container"
      >
        <AlertMessage
          handleCloseAlert={this.handleCloseAlert}
          open={state.isAlertOpen}
          severity={state.severity}
          msg={state.message}
        ></AlertMessage>
        <button className="close-btn" onClick={this.handleClose}>
          X
        </button>
        <ModalBody
          style={{
            height: "calc(45vh - 50px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <div className="d-block width-100 contact-popup-container">
            <div className="d-block p-b-20 heading">
              <div className="d-block width-100">
                <h4 className="d-block">
                  <i className="fa fa-building"></i> Organisation Unit
                </h4>
              </div>
              <label htmlFor="  organisationName">Organisation Name:</label>{" "}
              <span>{this.state.organizatioName}</span>
              <span style={{ color: "red" }}>
                {errorData.organizatioName.isValid}
                {errorData.organizatioName.message}
              </span>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="organisationunitName"> Name:</label>
                  <CustomTextbox
                    containerClass="form-group-inner"
                    inputClass="form-control"
                    maxLength={255}
                    htmlFor="organisationunitName"
                    id="organisationunitName"
                    placeholder="Enter  Organisation Unit Name"
                    name="organisationunitName"
                    value={state.organisationunitName}
                    onChange={this.handleStateChange}
                    isValid={errorData.organisationunitName.isValid}
                    message={errorData.organisationunitName.message}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="d-block text-center p-t-20 contact-popup-buttons">
                  <button className="cancel" onClick={this.handleClose}>
                    Cancel
                  </button>
                  <button className="save" onClick={this.saveOrganisationunit}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}
