import { httpStatusCodesEnum } from "./enums/http-status-codes-enum";

import { AjaxHeaders } from "./core/ajax-headers";
import { AjaxParams } from "./core/ajax-params";
import { requestInterceptor, errorInterceptor, responseInterceptor } from "./core/interceptors";
import { Ajax } from "./core/ajax";
import { JSONP } from "./core/jsonp";

export function HTTP() { }

HTTP.prototype = { }

HTTP.setRequestInterceptor = function(interceptor) {
  requestInterceptor.setInterceptor(interceptor);
}

HTTP.setErrorInterceptor = function(interceptor) {
  errorInterceptor.setInterceptor(interceptor);
}

HTTP.setResponseInterceptor = function(interceptor) {
  responseInterceptor.setInterceptor(interceptor);
}

HTTP.fetch = function(url, responseType) {
  if (typeof(responseType) !== 'string') {
    responseType = 'json';
  }

  return (new Ajax('GET', url, null, null, { responseType: responseType }))
    .request()
    .toPromise();
}

HTTP.get = function(url, headers, options) {
  return new Ajax('GET', url, null, headers, options);
}

HTTP.delete = function(url, headers, options) {
  return new Ajax('DELETE', url, null, headers, options);
}

HTTP.head = function(url, headers, options) {
  return new Ajax('HEAD', url, null, headers, options);
}

HTTP.post = function(url, body, headers, options) {
  return new Ajax('POST', url, body, headers, options);
}

HTTP.put = function(url, body, headers, options) {
  return new Ajax('PUT', url, body, headers, options);
}

HTTP.patch = function(url, body, headers, options) {
  return new Ajax('PATCH', url, body, headers, options);
}

HTTP.options = function(url, body, headers, options) {
  return new Ajax('OPTIONS', url, body, headers, options);
}

HTTP.jsonp = function(url, options, callbackParamName, callbackName) {
  return new JSONP(url, options, callbackParamName, callbackName);
}

HTTP.AjaxHeaders = AjaxHeaders;

HTTP.createRequestHeaders = function(headers) {
  return new AjaxHeaders(headers);
}

HTTP.createRequestOptions = function() {
  return new AjaxOptions();
}

HTTP.AjaxParams = AjaxParams;

HTTP.createRequestParams = function(params) {
  return new AjaxParams(params)
}

HTTP.httpStatusCodes = httpStatusCodesEnum;

HTTP.version = function() {
  return '1.2.4';
}
