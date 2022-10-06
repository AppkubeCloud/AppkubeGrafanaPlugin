import { CommonService } from '../_common/common';
import { configFun } from '../../config';
const config = configFun('', '', '');
export const RestService = {
  getData,
  add,
  getDashboardList,
  deleteObject,
  put,
  postOptionWithAuthentication,
  optionWithAuthentication,
  getDataWithAuth
};

function add(url: any, data: any) {
  const requestOptions = getRequestOptions(
    'POST',
    { 'Content-Type': 'application/json;charset=UTF-8' },
    JSON.stringify(data)
  );
  return fetch(url, requestOptions).then((response) => response.json());
}

function put(url: any, data: any) {
  const requestOptions = getRequestOptions(
    'put',
    { 'Content-Type': 'application/json;charset=UTF-8' },
    JSON.stringify(data)
  );
  return fetch(url, requestOptions).then((response) => response.json());
}

function getData(url: any, extraHeaders: any, data: any) {
  const requestOptions = getRequestOptions('GET', extraHeaders, data);
  return fetch(url, requestOptions).then((response) => response.json());
}

function getDataWithAuth(url: any, extraHeaders: any, data: any) {
  const requestOptions = getOptionWithAuthentication();
  return fetch(url, requestOptions).then((response) => response.json());
}

function getRequestOptions(type: any, extraHeaders: any, body?: any): any {
  let requestOptions: any = {};
  requestOptions = {
    method: type,
    headers: {
      ...extraHeaders,
    },
  };
  if (body) {
    requestOptions['body'] = body;
  }
  return requestOptions;
}

function deleteObject(url: any) {
  return fetch(url, {
    method: 'DELETE',
    redirect: 'follow',
  }).then((response) => response.text());
}

function getDashboardList(url: any) {
  const requestOptions = getRequestOptions('GET', {}, null);
  return fetch(url, requestOptions).then((response) => response.json());
}

function postOptionWithAuthentication(bodyData: any) {
  var myHeaders = new Headers();
  // myHeaders.append("X-Requested-By", "XMLHttpRequest");
  // myHeaders.append("Referrer-Policy", "no-referrer-when-downgrade");

  myHeaders.append('Authorization', CommonService.getBasicAuthEncodedString(config.USERID, config.PASSWORD));
  myHeaders.append('Content-Type', 'application/json');
  var requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: bodyData,
    redirect: 'follow',
  };
  return requestOptions;
}

function getOptionWithAuthentication() {
  var myHeaders = new Headers();
  // myHeaders.append("X-Requested-By", "XMLHttpRequest");
  // myHeaders.append("Referrer-Policy", "no-referrer-when-downgrade");

  myHeaders.append('Authorization', CommonService.getBasicAuthEncodedString(config.USERID, config.PASSWORD));
  myHeaders.append('Content-Type', 'application/json');
  var requestOptions: RequestInit = {
    method: 'GET',
    headers: myHeaders,
  };
  return requestOptions;
}

function optionWithAuthentication(bodyData: any, methodType: any) {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', CommonService.getBasicAuthEncodedString(config.USERID, config.PASSWORD));
  myHeaders.append('Content-Type', 'application/json');
  var requestOptions: RequestInit = {
    method: methodType,
    headers: myHeaders,
    body: bodyData,
    redirect: 'follow',
  };
  return requestOptions;
}
