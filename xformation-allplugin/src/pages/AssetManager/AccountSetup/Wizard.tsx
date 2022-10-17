import * as React from "react";

export class Wizard extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentStep: 0,
    };
  }

  onClickStepButton = (activeStep: any) => {
    this.setState({
      currentStep: activeStep,
    });
  };

  setActiveStep = (step: any) => {
    this.setState({
      currentStep: step,
    });
  };

  createStepLine = () => {
    const { steps } = this.props;
    const { currentStep } = this.state;
    const retData = [];
    if (steps && steps.length > 0) {
      const totalSteps = steps.length;
      for (let i = 0; i < totalSteps; i++) {
        const step = steps[i];
        retData.push(
          <div
            className={`wizard-step-button ${
              currentStep === i ? "active" : ""
            }`}
            onClick={(e) => this.onClickStepButton(i)}
          >
            {step.name}
          </div>
        );
      }
    }
    return retData;
  };

  createStepContainer = () => {
    const { steps } = this.props;
    const { currentStep } = this.state;
    const retData = [];
    if (steps && steps.length > 0) {
      const totalSteps = steps.length;
      for (let i = 0; i < totalSteps; i++) {
        const step = steps[i];
        retData.push(
          <div
            className={`wizard-step-component ${
              currentStep === i ? "" : "d-none"
            }`}
          >
            {step.component()}
          </div>
        );
      }
    }
    return retData;
  };

  render() {
    const { currentStep } = this.state;
    const { steps } = this.props;
    return (
      <div className="account-setup-container">
        <div className="heading">New AWS Account Setup</div>
        <div className="wizard-step-line-container">
          {this.createStepLine()}
        </div>
        <div className="wizard-step-component-container">
          {this.createStepContainer()}
          <div className="d-block text-right next">
            {currentStep < steps.length - 1 && (
              <button
                onClick={(e) => this.onClickStepButton(currentStep - 1)}
                className="asset-blue-button m-b-0"
              >
                Previous
              </button>
            )}
            {currentStep >= steps.length + 1 && (
              <button className="asset-blue-button m-b-0">Previous</button>
            )}
            {currentStep < steps.length - 1 && (
              <button
                onClick={(e) => this.onClickStepButton(currentStep + 1)}
                className="asset-blue-button m-r-0 m-b-0"
              >
                Next
              </button>
            )}
            {currentStep >= steps.length - 1 && (
              <button
                onClick={this.props.submitPage}
                className="asset-blue-button m-r-0 m-b-0"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
