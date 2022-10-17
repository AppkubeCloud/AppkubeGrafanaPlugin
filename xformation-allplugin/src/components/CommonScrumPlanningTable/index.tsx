import React from 'react';

class CommanPlanningTable extends React.Component<any, any>{
    constructor(props: any) {
        super(props)
        this.state = {}
    }

    getUserName = (userList: any, assignto: any) => {
        let userName = ""
        for (const users of userList) {
            if (users.id == assignto) {
                userName = users.name;
            }
        }
        return userName
    }
    render() {
        const { props } = this.props;
        return (
            <React.Fragment>
                {props.usecaseData?.stepinput?.stages&& props.usecaseData.stepinput.stages.length>0?
                    props.usecaseData.stepinput.stages.map(
                        (stage: any, index: any) => {
                            return (
                                <React.Fragment key={`${index}_${stage.name}`}>
                                    <tr className="workflow-inner-table-head">
                                        <td colSpan={6} key={index}>
                                            <strong>{stage.name}</strong>
                                        </td>
                                    </tr>
                                    {
                                        stage && stage.details ? stage.details.map((step: any, index: any) => {
                                            let userName = this.getUserName(props.userList, step.assignto)
                                            return (
                                                <React.Fragment key={`${index}_workflow_inner_table`}>
                                                <tr className="workflow-inner-table">
                                                    <td><span>{step.subStageName}</span></td>
                                                    <td>{userName}</td>
                                                    <td>{step.startDate}</td>
                                                    <td>1</td>
                                                    <td>{step.endDate}</td>
                                                    <td>0</td>
                                                </tr>
                                                </React.Fragment>
                                            )
                                        }
                                        ) : <></>
                                    }

                                </React.Fragment>

                            )
                        }
                    ):<></>
                }

            </React.Fragment>
        )
    }
}

export default CommanPlanningTable;
