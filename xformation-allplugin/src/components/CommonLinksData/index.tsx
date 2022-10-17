import React from 'react';

export class LinkData extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {};

    }
    render() {
        const { usecaseData, activeStage, disabledEditForm, handleStateChange, updateStep } = this.props
        const workflowDetail = usecaseData?.stepinput?.stages[activeStage];
        return (
            <React.Fragment>
                {workflowDetail?.details.length > 0 ?
                    workflowDetail.details.map((val: any, indx: any) => {
                        return (
                            <React.Fragment key={`usecase-${indx}-${activeStage}`}>
                                <div  className="api-code">
                                    <div className="heading">
                                        <h5>{val.subStageName}</h5>
                                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                                    </div>
                                    {val?.data?.length > 0 && val.data.map((link: any, index: any) => {
                                        return (
                                            <React.Fragment key={`${index}_${link}`}>
                                            <div className="api-content">
                                                <label>{link.label}:</label>
                                                <input
                                                    type="text"
                                                    name="link"
                                                    readOnly={disabledEditForm}
                                                    value={link.link}
                                                    onChange={(e) => handleStateChange(e, indx, index)}
                                                />
                                                <button
                                                    onClick={() => updateStep(usecaseData)}
                                                    className="btn btn-primary code-update-btn"
                                                    disabled={disabledEditForm}
                                                >
                                                    Update
                                                </button>
                                            </div>
                                            </React.Fragment>
                                        )
                                    })}
                                </div>
                            </React.Fragment>
                        )

                    }) :
                    (<React.Fragment></React.Fragment>)
                }
            </React.Fragment>
        );
    }
}

export default LinkData;
