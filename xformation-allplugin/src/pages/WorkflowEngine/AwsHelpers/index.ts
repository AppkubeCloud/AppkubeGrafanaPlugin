import React from 'react';
import { configFun } from '../../../config';
const AWS = require('aws-sdk');
const StepFunctions = require('aws-sdk/clients/stepfunctions');

export class AwsHelper extends React.Component<any, any> {
  config: any;
  credentials: any;
  dynamoDB: any;
  stepFunctions: any;
  lambda: any;
  constructor(props: any) {
    super(props);
    this.config = configFun(props.meta.jsonData.accessKey, props.meta.jsonData.secretKey, props.meta.jsonData.region);
    this.credentials = {
      region: this.config.REGION,
      accessKeyId: this.config.ACCESS_KEY_ID,
      secretAccessKey: this.config.SECRET_KEY,
    };
    this.dynamoDB = new AWS.DynamoDB(this.credentials);
    this.stepFunctions = new StepFunctions(this.credentials);
    this.lambda = new AWS.Lambda(this.credentials);
  }

  gettingMachineDef = (machineArn: any, onDone: any, onError: any) => {
    const params = {
      stateMachineArn: machineArn,
    };
    this.stepFunctions.describeStateMachine(params, function (err: any, data: any) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        onError(err);
      } else {
        onDone(JSON.parse(data.definition).States);
      }
    });
  };
  // second table name =usecase_arn
  usecaseInputToDynamoDb(useCaseName: any, stepInput: any, onDone: any) {
    var paramsForDb = {
      TableName: 'usecase_input',
      Item: {
        usecaseName: { S: useCaseName },
        stepInput: { S: stepInput },
      },
    };

    this.dynamoDB.putItem(paramsForDb, function (err: any, data: any) {
      if (err) {
        console.error('Unable to write data: ', JSON.stringify(err, null, 2));
      } else {
        console.log('Put Input succeeded');
        onDone('Workflow Updated Successfully');
      }
    });
  }

  getUsecaseInputData(useCaseName: any, onDone: any, onError: any) {
    var pgParams = {
      FunctionName: 'stepFunction_with_psql_get_input' /* required */,
    };

    this.lambda.invoke(pgParams, function (err: any, data: any) {
      if (err) console.log(err, err.stack);
      else {
        // an error occurred
        onError(err);
        // console.log("Got usecase inputlist", data.Payload);

        JSON.parse(data.Payload).forEach((e: any) => {
          if (e.usecasename) {
            let usecase = {
              stepinput: e.stepinput,
              usecaseName: e.usecasename,
            };
            if (usecase.usecaseName == useCaseName) {
              onDone(usecase);
            }
          } else if (e.usecaseName) {
            onDone(e);
          }
          // if (e.usecasename === useCaseName) {
          //   onDone(e);
          //   // ;
          // }
          // });
        }); // successful response
      }
    });
  }

  // getUsecaseInputData(useCaseName: any, onDone: any, onError: any) {
  //   var params = {
  //     TableName: 'usecase_input',
  //   };
  //   this.dynamoDB.scan(params, function (err: any, data: any) {
  //     if (err) console.log(err, err.stack);
  //     else {
  //       // an error occurred
  //       console.log('Got usecase inputlist', data.Items);
  //       data.Items.forEach((e: any) => {
  //         if (e.usecaseName.S === useCaseName) {
  //           onDone(e);
  //         } else {
  //           onError(e.err);
  //         }
  //       });
  //     }
  //   });
  // }

  // getUsecaseList = (onDone: any, onError: any) => {
  //   var params = {
  //     TableName: 'usecase_input',
  //   };
  //   this.dynamoDB.scan(params, (err: any, data: any) => {
  //     console.log(data);
  //     if (err) {
  //       onError(err);
  //     } else {
  //       onDone(data.Items);
  //     }
  //   });
  // };

  getUsecaseList(onDone: any, onError: any) {
    var pgParams = {
      FunctionName: 'stepFunction_with_psql_get_input' /* required */,
    };

    this.lambda.invoke(pgParams, function (err: any, data: any) {
      if (err) {
        onError(err);
        console.log(err, err.stack);
      } else {
        // an error occurred
        onDone(JSON.parse(data.Payload));
      }
      // JSON.parse(data.Payload).forEach(e:any => {
      //     if (e.usecasename === useCaseName) {
      //         setStepInput(JSON.stringify(e.stepinput));
      //     }

      //         if (err) console.log(err, err.stack); // an error occurred
      //         else {
      //             console.log("Got usecase inputlist", data.Payload);
      // console.log(data)
      //             // JSON.parse(data.Payload).forEach(e:any => {
      //             //     if (e.usecasename === useCaseName) {
      //             //         setStepInput(JSON.stringify(e.stepinput));
      //             //     }

      //             // });

      //         };           // successful response
    });
  }

  //  getUsecaseList( onDone: any, onError: any) {

  //     var pgParams = {
  //         FunctionName: 'stepFunction_with_psql_get_usecase', /* required */
  //     };
  // console.log("get data ")
  //     this.lambda.invoke(pgParams, function (err:any, data:any) {
  //         if(err) {
  //           onError(err);
  //           console.log(err, err.stack);} // an error occurred
  //         else {
  //           console.log(data)
  //           onDone(JSON.parse(data));
  //             console.log("usecaselist", data.Payload)

  //         };           // successful response
  //     });

  // }

  updateUsecaseWholeData(usecaseData: any, onError: any, onDone: any) {
    console.log(usecaseData);
    let inputForpg = {
      stepInput: usecaseData,
      usecaseName: usecaseData.usecaseName,
    };

    var pgParams1 = {
      FunctionName: 'stepFunction_with_psql_usecase_whole_update' /* required */,
      Payload: JSON.stringify(inputForpg),
    };
    this.lambda.invoke(pgParams1, (err: any, data: any) => {
      if (err) {
        onError(err);
      } // an error occurred
      else {
        data.message = 'Update Usecase Success';
        onDone(data);
      } // successful response
    });
  }

  getExecutionHistory = (executionArn: any, onDone: any, onError: any) => {
    this.stepFunctions.getExecutionHistory({ executionArn }, function (err: any, data: any) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        onError(err);
      } else {
        const executedStateArray: any = [];
        data.events.forEach((e: any) => {
          if (e.type === 'TaskStateEntered' || e.type === 'PassStateEntered') {
            executedStateArray.push(e.stateEnteredEventDetails.name);
          }
        });
        onDone(executedStateArray);
      } // successful response
    });
  };

  executeStateMachine(executionData: any, onDone: any) {
    // delete params.usecaseName;
    const params = {
      stateMachineArn: executionData.stateMachineArn,
      input: '[]',
    };
    this.stepFunctions.startExecution(params, (err: any, data: any) => {
      if (err) {
        console.log(err);
        // const response = {
        // 	statusCode: 500,
        // 	body: JSON.stringify({
        // 		message: 'There was an error'
        // 	})
        // };
      } else {
        // usecaseArnToDynamoDb(data.executionArn);
        this.usecaseArnToDb(data.executionArn, executionData.usecaseName, () => {
          this.addJsonOnExecution(executionData.usecaseName, executionData.input, onDone);
        });
        // const response = {
        // 	statusCode: 200,
        // 	body: JSON.stringify({
        // 		message: 'Step function worked'
        // 	})
        // };
        // gettingExecutionHistory(data.executionArn);
      }
    });
  }
  usecaseArnToDb(executionArn: any, usecaseName: any, onDone: any) {
    let inputForpg = {
      executionArn: executionArn,
      usecaseName: usecaseName,
    };

    var pgParams = {
      FunctionName: 'stepFunction_with_psql' /* required */,
      Payload: JSON.stringify(inputForpg),
    };

    this.lambda.invoke(pgParams, function (err: any, data: any) {
      if (err) {
        console.log(err, err.stack); // an error occurred
      } else {
        // console.log('from pg', data); // successful response
        onDone();
      }
    });

    // var pgParams1 = {

    //     FunctionName: 'stepFunction_with_psql_usecase_input', /* required */
    //     Payload: JSON.stringify(inputForpg)

    // };

    // this.lambda.invoke(pgParams1, function (err:any, data:any) {
    //     if (err) console.log(err, err.stack); // an error occurred
    //     else console.log("from pg sql", data);           // successful response
    // });
  }

  updateStageToDB(params: any, onError: any, onDone: any) {
    if (params.usecaseName == '') {
      console.log('Please, give an usecase name');
    } else {
      let inputForpg = {
        stepInput: params.stepinput,
        usecaseName: params.usecaseName,
      };
      var pgParams1 = {
        FunctionName: 'stepFunction_with_psql_usecase_input' /* required */,
        Payload: JSON.stringify(inputForpg),
      };
      this.lambda.invoke(pgParams1, function (err: any, data: any) {
        if (err) {
          onError(err);
          console.error(err, err.stack);
        }
        // an error occurred
        else {
          data.message = 'Update Usecase Stage Successful';
          onDone(data);
          // console.log('from pg', data)
        } // successful response
      });

      // getUsecaseInputData();
    }
  }

  addJsonOnExecution(usecaseName: any, stepInput: any, onDone: any) {
    let inputForpg = {
      stepInput: stepInput,
      usecaseName: usecaseName,
    };
    var pgParams1 = {
      FunctionName: 'stepFunction_with_psql_usecase_input' /* required */,
      Payload: JSON.stringify(inputForpg),
    };
    this.lambda.invoke(pgParams1, function (err: any, data: any) {
      let message = 'Workflow Created Successfully';
      if (err) {
        console.log(err, err.stack); // an error occurred
      } else {
        data.message = message;
        console.log('from pg', data); // successful response
        onDone(data);
      }
    });
  }

  // updateStageToDB(params: any, onError: any, onDone: any) {
  //   // let inputForpg = {
  //   //   stepInput: JSON.parse(singleStepInput),
  //   //   usecaseName: useCaseName
  //   // };
  //   var pgParams1 = {
  //     FunctionName: 'stepFunction_with_psql_usecase_input' /* required */,
  //     Payload: JSON.stringify(params),
  //   };

  //   this.lambda.invoke(pgParams1, function (err: any, data: any) {
  //     if (err) {
  //       console.log(err, err.stack); // an error occurred
  //       onError(err);
  //     } else {
  //       console.log(data);
  //       onDone && onDone(data);
  //     }
  //   });
  // }
}
