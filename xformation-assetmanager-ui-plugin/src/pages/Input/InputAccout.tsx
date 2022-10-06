// import { Checkbox } from '@material-ui/core';
// import * as React from 'react';
// import { Modal, ModalBody, ModalHeader } from 'reactstrap';
// import { config } from '../../config';
// import { CommonService } from '../_common/common';
// import { CustomTextbox } from '../../Components/CustomTextbox';
// // import AlertMessage from './../../components/AlertMessage';
// let nodeIdMap = new Map();
// export class InputAccount extends React.Component<any, any> {
//     steps: any;
//     constructor(props: any) {
//         super(props);
//         this.state = {
//             isAlertOpen: false,
//             message: null,
//             severity: null,
//             modal: false,
//             isSubmitted: false,
//             inputType: "",
//             global: "",
//             node: "",
//             title: "",
//             bindAddress: "",
//             port: "",
//             reciveBufferSize: "",
//             noOfWorkerthreads: "",
//             tlsCertFile: "",
//             tlsPrivateKeyFile: "",
//             enableTls: "",
//             tlsKeyPassword: "",
//             tlsClientAuthentication: "",
//             tlsClientAuthTrustedCerts: "",
//             tcpKeepAlive: "",
//             nullFramedelimiter: "",
//             overrideSource: "",
//             DecompressedSize: "",
//             maximumMessage: "",
//         };
//     }
//     async componentDidMount() {
//         // this.getAllNodesInCluster();
//         // this.setState({
//         //     isApiCalled: true
//         // });
//     }

//     getAllNodesInCluster = async () => {
//         var requestOptions = await CommonService.requestOptionsForGetRequest();
//         await fetch(config.GET_ALL_NODES_IN_CLUSTER, requestOptions)
//             .then(response => response.text())
//             .then(result => {
//                 var clusterNodes = JSON.parse(result);
//                 console.log("cluster nodes ::  : ", clusterNodes);
//                 for (let node in clusterNodes) {
//                     var uiNameForNode = node.split("-")[0] + " / " + clusterNodes[node].hostname;
//                     nodeIdMap.set(node, uiNameForNode);
//                 }
//                 console.log("node id map :: ", nodeIdMap)
//             }
//             ).catch(error => console.log('error', error));
//     }

//     createNodeOptions = () => {
//         let retData: any = [];
//         nodeIdMap.forEach((value: any, key: any) => {
//             retData.push(<option value={key}>{nodeIdMap.get(key)}</option>);
//         })
//         return retData;
//     }
//     onStateChange = (e: any) => {
//         const { name, value } = e.target;
//         this.setState({
//             [name]: value
//         })
//     }
//     checkboxChange = (e: any) => {
//         let isState = e.target.checked;
//         let name = e.target.name;
//         console.log("state : ", isState)
//         console.log("Name : ", name);
//         this.setState({
//             [name]: isState
//         })
//     }
//     toggle = async (selectedEnviornment: any) => {
//         this.setState({
//             modal: !this.state.modal,
//             EnviornmentName: selectedEnviornment.name,
//             enviornmentId: selectedEnviornment.id
//         });
//     }
//     handleClose = () => {
//         this.setState({
//             modal: false,
//         });
//     }
//     onChangeSelectBox = (e: any) => {
//         this.setState({
//             inputType: e.target.value,
//         });
//     }

//     saveInput = async (event: any) => {
//         event.preventDefault();
//         this.setState({
//             isSubmitted: true,
//         });
//         const errorData = this.validate(true);
//         if (errorData?.title.isValid) {
//             const { inputType, global, node, title, bindAddress, port, reciveBufferSize, noOfWorkerthreads, tlsCertFile, tlsPrivateKeyFile, enableTls, tlsKeyPassword, tlsClientAuthentication, tlsClientAuthTrustedCerts,
//                 tcpKeepAlive, nullFramedelimiter, overrideSource, DecompressedSize, maximumMessage, } = this.state;
//             var configurations = {

//                 "inputType": inputType,
//                 "global": global,
//                 "node": node,
//                 "title": title,
//                 "bindAddress": bindAddress,
//                 "port": port,
//                 "reciveBufferSize": reciveBufferSize,
//                 "noOfWorkerthreads": noOfWorkerthreads,
//                 "tlsCertFile": tlsCertFile,
//                 "tlsPrivateKeyFile": tlsPrivateKeyFile,
//                 "enableTls": enableTls,
//                 "tlsKeyPassword": tlsKeyPassword,
//                 "tlsClientAuthentication": tlsClientAuthentication,
//                 "tlsClientAuthTrustedCerts": tlsClientAuthTrustedCerts,
//                 "tcpKeepAlive": tcpKeepAlive,
//                 "nullFramedelimiter": nullFramedelimiter,
//                 "overrideSource": overrideSource,
//                 "DecompressedSize": DecompressedSize,
//                 "maximumMessage": maximumMessage,

//             };
//             var data = {
//                 "title": title,
//                 "type": inputType,
//                 "global": global,
//                 "configuration": configurations,
//                 "node": node,
//             };
//             var raw = JSON.stringify(data);

//             console.log("Data : ", raw)
//             let urlJson = JSON.parse(JSON.stringify(config.INPUT_URL));
//             let url = urlJson[this.state.inputType];
//             console.log("Selected URL : ", url);
//             var requestOptions = CommonService.requestOptionsForPostRequest(raw);
//             fetch(url, requestOptions)
//                 .then(response => response.text())
//                 .then(result => {
//                     console.log("result :", result);
//                     if (result != null) {
//                         this.setState({
//                             severity: config.SEVERITY_SUCCESS,
//                             message: config.TCP_INPUT_ADDED_SUCESS,
//                             isAlertOpen: true,
//                         });
//                     } else {
//                         this.setState({
//                             severity: config.SEVERITY_ERROR,
//                             message: config.TCP_INPUT_ADDED_ERROR,
//                             isAlertOpen: true,
//                         });
//                     }
//                 })
//                 .catch(error => {
//                     this.setState({
//                         severity: config.SEVERITY_ERROR,
//                         message: config.TCP_INPUT_ADDED_ERROR,
//                         isAlertOpen: true,
//                     });
//                     console.log('error', error)
//                 });
//         }

//     }
//     validate = (isSubmitted: any) => {
//         const validObj = {
//             isValid: true,
//             message: ""
//         };
//         const retData = {
//             node: validObj,
//             title: validObj,
//         };
//         if (isSubmitted) {
//             const { node, title, global } = this.state;
//             if (!global) {
//                 if (!node) {
//                     retData.title = {
//                         isValid: false,
//                         message: "Please  select node"
//                     }
//                 }
//             }
//             if (!title) {
//                 retData.title = {
//                     isValid: false,
//                     message: "Please enter title"
//                 }
//             }
//             return retData;
//         }

//     }
//     handleCloseAlert = (e: any) => {
//         this.setState({
//             isAlertOpen: false,
//         })
//     }

//     render() {
//         const { modal, isSubmitted, inputType, global, node, title, bindAddress, port, reciveBufferSize, noOfWorkerthreads, tlsCertFile, tlsPrivateKeyFile, enableTls, tlsKeyPassword, tlsClientAuthentication, tlsClientAuthTrustedCerts,
//             tcpKeepAlive, nullFramedelimiter, overrideSource, DecompressedSize, maximumMessage, } = this.state;
//         const errorData = this.validate(isSubmitted);
//         const state = this.state;
//         return (
//             <Modal isOpen={modal} toggle={this.toggle} className="modal-container servicdesk-modal-container">
//                 {/* <AlertMessage handleCloseAlert={this.handleCloseAlert} open={state.isAlertOpen} severity={state.severity} msg={state.message}></AlertMessage> */}
//                 <ModalHeader toggle={this.toggle}>Lounch new Input  </ModalHeader>

//                 <ModalBody style={{ height: 'calc(60vh - 50px)', overflowY: 'auto', overflowX: "hidden" }}>
//                     <label htmlFor="description"> Enviornment Name : </label> <span>{this.state.EnviornmentName}</span>
//                     <div className="row">
//                         <div className="col-lg-12 col-md-12 col-sm-12">
//                             <div className="form-group">
//                                 <label htmlFor="description">Type</label>
//                                 <select className="input-group-text" name="inputType" value={state.inputType} onChange={this.onChangeSelectBox}>
//                                     <option>Select Input Type</option>
//                                     <option key="KPI_INPUT" value="KPI_INPUT">KPI</option>
//                                     <option key="LOG_INPUT" value="LOG_INPUT">LOG</option>
//                                     <option key="CAMPLIANCE_INPUT" value="CAMPLIANCE_INPUT">CAMPLIANCE</option>
//                                     <option key="NATIVEDS_INPUT" value="NATIVEDS_INPUT">NATIVEDS</option>
//                                 </select>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="d-block width-100 stream-popup-container">
//                         <div className="row">
//                             <div className="col-lg-12 col-md-12 col-sm-12">
//                                 <div className="form-group">
//                                     <input type="checkbox" id="global" name="global" value={global} onChange={this.checkboxChange} /> Global
//                                     <div className="col-lg-12 col-md-12 col-sm-12">
//                                         <span>Should this input start on all nodes</span>
//                                     </div>
//                                 </div>

//                             </div>
//                         </div>
//                         {
//                             global == false &&
//                             <div className="row">
//                                 <div className="col-lg-12 col-md-12 col-sm-12">
//                                     <div className="form-group">
//                                         <label htmlFor="description">Node</label>
//                                         <select className="input-group-text" name="node" value={node} onChange={this.onStateChange}>
//                                             <option>Select Node</option>
//                                             {this.createNodeOptions()}
//                                         </select>
//                                         <span style={{ color: "red" }}>{errorData?.node.message}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         }

//                         <div className="row">
//                             <div className="col-lg-6 col-md-6 col-sm-12">
//                                 <div className="form-group">
//                                     <label htmlFor="title">Title</label>
//                                     <input type="text" id="title" name="title" value={title} onChange={this.onStateChange} className="input-group-text" placeholder="A description name of stream" />
//                                     <span>Select a name of your new input that describes it.</span>
//                                     <span style={{ color: "red" }}>{errorData?.title.message}</span>
//                                 </div>
//                             </div>
//                             <div className="col-lg-6 col-md-6 col-sm-12">
//                                 <div className="form-group">
//                                     <label htmlFor="title">Bind address</label>
//                                     <input type="text" id="bindAddress" name="bindAddress" value={bindAddress} onChange={this.onStateChange} className="input-group-text" placeholder="A description name of stream" />
//                                     <span>Address to listen on. For example 0.0.0.0 or 127.0.0.1</span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row">
//                             <div className="col-lg-6 col-md-6 col-sm-12">
//                                 <div className="form-group">
//                                     <label htmlFor="title">Port</label>
//                                     <input type="text" id="port" name="port" value={port} onChange={this.onStateChange} className="input-group-text" placeholder="A description name of stream" />
//                                     <span>Port to listen on.</span>
//                                 </div>
//                             </div>
//                             <div className="col-lg-6 col-md-6 col-sm-12">
//                                 <div className="form-group">
//                                     <label htmlFor="title">Receive Buffer Size   &nbsp;<sub>(optional)</sub></label>
//                                     <input type="text" id="reciveBufferSize" name="reciveBufferSize" value={reciveBufferSize} onChange={this.onStateChange} className="input-group-text" placeholder="A description name of stream" />
//                                     <span>The size in bytes of the reciveBufferSize of nework connections to this input.</span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row">
//                             <div className="col-lg-6 col-md-6 col-sm-12">
//                                 <div className="form-group">
//                                     <label htmlFor="title">No. of worker threads &nbsp;<sub>(optional)</sub></label>
//                                     <input type="text" id="noOfWorkerthreads" name="noOfWorkerthreads" value={noOfWorkerthreads} onChange={this.onStateChange} className="input-group-text" placeholder="A description name of stream" />
//                                     <span>Number of worker threads processing network connections network connections for this input.</span>
//                                 </div>
//                             </div>
//                             <div className="col-lg-6 col-md-6 col-sm-12">
//                                 <div className="form-group">
//                                     <label htmlFor="title">TLS cert file  &nbsp;<sub>(optional)</sub></label>
//                                     <input type="text" id="tlsCertFile" name="tlsCertFile" value={tlsCertFile} onChange={this.onStateChange} className="input-group-text" placeholder="A description name of stream" />
//                                     <span>path of the TLS certificate file.</span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row">
//                             <div className="col-lg-6 col-md-6 col-sm-12">
//                                 <div className="form-group">
//                                     <label htmlFor="title"> TLS private key file &nbsp;<sub>(optional)</sub></label>
//                                     <input type="text" id="tlsPrivateKeyFile" name="tlsPrivateKeyFile" value={tlsPrivateKeyFile} onChange={this.onStateChange} className="input-group-text" placeholder="A description name of stream" />
//                                     <span>path of the TLS private key file.</span>
//                                 </div>
//                             </div>
//                             <div className="col-lg-6 col-md-6 col-sm-12">
//                                 <div className="form-group">
//                                     <input type="checkbox" id="enableTls" name="enableTls" value={enableTls} onChange={this.checkboxChange} /> Enable TLS
//                                     <div className="col-lg-6 col-md-6 col-sm-12">
//                                         <span>Accept TLS connections</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row">
//                             <div className="col-lg-6 col-md-6 col-sm-12">
//                                 <div className="form-group">
//                                     <label htmlFor="title"> TLS key password &nbsp;<sub>(optional)</sub></label>
//                                     <input type="text" id="tlsKeyPassword" name="tlsKeyPassword" value={tlsKeyPassword} onChange={this.onStateChange} className="input-group-text" placeholder="A description name of stream" />
//                                     <span>The password for the encrypted key file.</span>
//                                 </div>
//                             </div>
//                             <div className="col-lg-6 col-md-6 col-sm-12">
//                                 <div className="form-group">
//                                     <label htmlFor="index">TLS client authentication &nbsp;<sub>(optional)</sub></label>
//                                     <select className="input-group-text" name="tlsClientAuthentication" value={tlsClientAuthentication} onChange={this.onStateChange}>
//                                         <option>Select TLS client authentication</option>
//                                         <option value="disable">disable</option>
//                                         <option value="optional">optional</option>
//                                         <option value="required">required</option>
//                                     </select>
//                                     <span>Whether client need to authentication themselves in TLS connections</span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row">
//                             <div className="col-lg-6 col-md-6 col-sm-12">
//                                 <div className="form-group">
//                                     <label htmlFor="title"> TLS Client Auth Trusted Certs &nbsp;<sub>(optional)</sub></label>
//                                     <input type="text" id="tlsClientAuthTrustedCerts" name="tlsClientAuthTrustedCerts" value={tlsClientAuthTrustedCerts} onChange={this.onStateChange} className="input-group-text" placeholder="A description name of stream" />
//                                     <span>TLS Client Auth Trusted Certs (File or Directory).</span>
//                                 </div>
//                             </div>
//                             <div className="col-lg-6 col-md-6 col-sm-12">
//                                 <div className="form-group">
//                                     <input type="checkbox" name="tcpKeepAlive" onChange={this.checkboxChange} value={tcpKeepAlive} id="RemoveMessages" /> &nbsp;TCP keepalive
//                                     <div className="col-lg-8 col-md-8 col-sm-12">
//                                         <span>Enable TCP keep alive packets</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row">
//                             <div className="col-lg-6 col-md-6 col-sm-12">
//                                 <div className="form-group">
//                                     <input type="checkbox" name="nullFramedelimiter" onChange={this.checkboxChange} value={nullFramedelimiter} id="nullFramedelimiter" /> &nbsp;Null frame delimiter?
//                                     <div className="col-lg-10 col-md-10 col-sm-12">
//                                         <span>Use null byte as frame delimiter? Otherwise newline delimiter is used.</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row">
//                             <div className="col-lg-6 col-md-6 col-sm-12">
//                                 <div className="form-group">
//                                     <label htmlFor="title"> Override Source  &nbsp;<sub>(optional)</sub></label>
//                                     <input type="text" id="overrideSource" name="overrideSource" value={overrideSource} onChange={this.onStateChange} className="input-group-text" placeholder="A description name of stream" />
//                                     <span>The source is a hostname derived from the received packet by default.Set this if you want to override it with a custom string.</span>
//                                 </div>
//                             </div>
//                             <div className="col-lg-6 col-md-6 col-sm-12">
//                                 <div className="form-group">
//                                     <label htmlFor="title"> Decompressed size limit   &nbsp;<sub>(optional)</sub></label>
//                                     <input type="text" id="DecompressedSize" name="DecompressedSize" value={DecompressedSize} onChange={this.onStateChange} className="input-group-text" placeholder="A description name of stream" />
//                                     <span>The maximum number of bytes after decompressin.</span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row">
//                             <div className="col-lg-6 col-md-6 col-sm-12">
//                                 <div className="form-group">
//                                     <label htmlFor="title">  Maximum message size  &nbsp;<sub>(optional)</sub></label>
//                                     <input type="text" id="maximumMessage" name="maximumMessage" value={maximumMessage} onChange={this.onStateChange} className="input-group-text" placeholder="A description name of stream" />
//                                     <span> The maximum length of a message.</span>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="row">
//                             <div className="col-lg-12 col-md-12 col-sm-12">
//                                 <div className="d-block text-right p-t-20 contact-popup-buttons">
//                                     <button className="cancel m-r-0" onClick={this.handleClose}>Cancel</button>
//                                     <button className="save" onClick={this.saveInput} >Save</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </ModalBody>
//             </Modal>
//         );
//     }
// }