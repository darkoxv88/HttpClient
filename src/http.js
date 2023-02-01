import { HttpStatusCodeEnum } from "./enums/http-status-code-enum";

import { AjaxHeaders } from "./core/ajax-headers";
import { AjaxOptions } from "./core/ajax-options";
import { AjaxParams } from "./core/ajax-params";
import { Ajax } from "./core/ajax";
import { JSONP } from "./core/jsonp";

export function HTTP() { }

HTTP.prototype = { }

HTTP.setErrorInterceptor = function(interceptor) {
  Ajax.setErrorInterceptor(interceptor);
}

HTTP.get = function(url, headers, options) {
  return Ajax.get(url, headers, options);
}

HTTP.delete = function(url, headers, options) {
  return Ajax.delete(url, headers, options);
}

HTTP.head = function(url, headers, options) {
  return Ajax.head(url, headers, options);
}

HTTP.post = function(url, body, headers, options) {
  return Ajax.post(url, body, headers, options);
}

HTTP.put = function(url, body, headers, options) {
  return Ajax.put(url, body, headers, options);
}

HTTP.patch = function(url, body, headers, options) {
  return Ajax.patch(url, body, headers, options);
}

HTTP.options = function(url, body, headers, options) {
  return Ajax.options(url, body, headers, options);
}

HTTP.jsonp = function(url, options, callbackParamName, callbackName) {
  return new JSONP(url, options, callbackParamName, callbackName);
}

HTTP.AjaxHeaders = AjaxHeaders;

HTTP.createRequestHeaders = function(headers) {
  return new AjaxHeaders(headers);
}

HTTP.AjaxOptions = AjaxOptions;

HTTP.createRequestOptions = function() {
  return new AjaxOptions();
}

HTTP.createRequestParams = function(params) {
  return new AjaxParams(params)
}

HTTP.HttpStatusCode = HttpStatusCodeEnum;
