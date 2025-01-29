import { Callback } from "../utility/callback.js";
import { defineObjProp } from "../utility/define-obj-prop.js.js";
import { noop } from "../utility/noop.js";
import { Observer } from "../helpers/observer.js";

import { httpStatusCodesEnum } from "../enums/http-status-codes-enum.js";

import { ResponseHeaders } from "../helpers/response-headers.js";

function Interceptor() {
  this.cb = new Callback();
}

Interceptor.prototype = { 
  setInterceptor: function(fn) {
    this.cb = new Callback(fn);
  },

  intercept: function(value) {
    this.cb.emit(value);

    return value;
  }
}

function createBaseResponse(self, ok, eventName, unknownStatusText, url, status) {
  var headers = new ResponseHeaders();
  defineObjProp(self, 'headers', function() { return headers }, noop);

  if (typeof(status) !== 'number') {
    status = 0;
  }
  defineObjProp(self, 'status', function() { return status }, noop);

  defineObjProp(self, 'url', function() { return url }, noop);
  defineObjProp(self, 'ok', function() { return ok }, noop);
  defineObjProp(self, 'name', function() { return eventName }, noop);

  var timeStamp = Date.now();
  defineObjProp(self, 'timeStamp', function() { return timeStamp }, noop);

  var statusText = httpStatusCodesEnum[status];
  if (!statusText) {
    statusText = unknownStatusText;
  }
  defineObjProp(self, 'statusText', function() { return statusText }, noop);
}

function createResolvedResponse(url, status, data) {
  var out = ({});
  createBaseResponse(out, true, 'HttpResponse', 'Unknown Status', url, status);
  defineObjProp(out, 'body', function() { return data }, noop);
  return out;
}

function createRejectedResponse(url, status, data) {
  var out = ({});
  createBaseResponse(out, false, 'HttpErrorResponse', 'Unknown Error', url, status);
  defineObjProp(out, 'error', function() { return data }, noop);
  return out;
}

export var requestInterceptor = new Interceptor();

requestInterceptor.intercept = function(data, defaultRequest) {
  this.cb.emit(data, function(executor) {
    if (typeof(executor) !== 'function') {
      return;
    }

    defaultRequest = function() {
      
      return (new Observer(function(res, rej) {
        executor(
          function() { res(createResolvedResponse.apply(new Object(), [data.url].concat(Array.from(arguments)))); },
          function() { rej(createRejectedResponse.apply(new Object(), [data.url].concat(Array.from(arguments)))); }
        );
      }));
    }
  });

  return defaultRequest();
}

export var errorInterceptor = new Interceptor();

export var responseInterceptor = new Interceptor();
