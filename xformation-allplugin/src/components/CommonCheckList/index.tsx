
import React from 'react';

class CommanCheckList extends React.Component<any, any>{
constructor(props:any){
super(props)
this.state={}
}

render(){
    const { usecaseData, activeStage, handleStateChangeCheckList, disabledEditForm } = this.props;
    
    return(
        <React.Fragment>
            {usecaseData && usecaseData?.stepinput?.stages[activeStage]?.workflowCheckList?.length>0 ?
 usecaseData.stepinput.stages[activeStage].workflowCheckList.map((row:any,index:any)=>
 <React.Fragment key={`${index}checkbox${activeStage}`} >
 <div className="requirement-data">
        <input
            type="checkbox"
            checked={row.checked}
            readOnly={disabledEditForm}
            onChange={(e) =>handleStateChangeCheckList(e, index)}
        />
        <span>{row.label}</span>
    </div>
    </React.Fragment >
    ):(<React.Fragment
    ></React.Fragment>)}
    </React.Fragment>

    )
}
}
export default CommanCheckList

// displayCheckList = () => {
  
//     let retData = [];
//     if (usecaseData && usecaseData.length > 0) {
//         const workflowDetail: any = usecaseData[activeStage].workflowCheckList;
//         if (workflowDetail && workflowDetail.length > 0) {
//             for (let i = 0; i < workflowDetail.length; i++) {
//                 let row = workflowDetail[i];
//                 retData.push(
//                     <div key={`${i}checkbox${activeStage}`} className="requirement-data">
//                         <input
//                             type="checkbox"
//                             checked={row.checked}
//                             onChange={(e) => this.handleStateChangeCheckList(e, i)}
//                         />
//                         <span>{row.label}</span>
//                     </div>
//                 );
//             }
//         }
//     }
//     return retData;
// };