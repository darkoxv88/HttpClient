import { defineObjProp } from "./../utility/define-obj-prop.js";
import { lambda } from "./../utility/lambda";
import { once } from "../utility/once.js";
import { safeJsonStringify } from "./../utility/safe-json.js";

import { promiseFactory } from "./../helpers/promise-factory";
import { isArrayBuffer, isBlob, isFormData, isUrlSearchParams } from "./../helpers/xhr-body-type-checks";
import { xhrFactory } from "./../helpers/xhr-factory";
import { getResponseUrl } from "./../helpers/xhr-get-response-url";

import { AjaxStatesEnum } from "../enums/ajax-states-enum.js";

import { HttpErrorResponseEvent } from "./../events/http/http-error-response-event.js";
import { HttpOnProgressEvent } from "../events/http/http-on-progress-event.js";
import { HttpResponseEvent } from "../events/http/http-response-event.js";

import { AjaxHeaders } from "./ajax-headers.js";
import { AjaxOptions } from "./ajax-options.js";
import { AjaxParams } from "./ajax-params";
import { ErrorInterceptor } from "./error-interceptor.js";
import { getAllowNoneAsyncCalls } from "./settings";

function serializeRequestBody(body) {
  if (body === null || body === undefined) {
    return null;
  }

  if (isArrayBuffer(body) || isBlob(body) || isFormData(body) || isUrlSearchParams(body) || typeof(body) === 'string') {
    return body;
  }

  if (typeof(body) === 'object' || typeof(body) === 'boolean' || Array.isArray(body)) {
    return safeJsonStringify(body);
  }
  
  if (typeof(body.toString) === 'function') {
    return body.toString();
  }
}

export function Ajax(type, url, body, reqBody, headers, options) {
  reqBody ? (this._body = body) : (this._body = null);

  this._headers = new AjaxHeaders(headers);

  if (typeof(options) !== 'object' || !options) {
    options = new AjaxOptions();
  }

  options.async = !!(options.async);

  this.params = new AjaxParams(options.params);

  this._type = type;
  defineObjProp(this, 'type', function() { return this._type }, function() { });

  this._url = url;
  this._isAsync = getAllowNoneAsyncCalls() ? options.async : true

  this._xhr = xhrFactory();

  this._state = AjaxStatesEnum.Opened;
  defineObjProp(this, 'state', function() { return this._state }, function() { });

  options.responseType = this._xhr.responseType = AjaxOptions.defineResponseType(options.responseType);

  this._onUpload = null;
  this._onDownload = null;
  this._xhr.onprogress = lambda(this, function(ev) {
    if (typeof(this._onUpload) === 'function' && this._body !== null && this._body !== undefined && this._xhr.upload) {
      var lTotal = undefined;

      if (ev.lengthComputable) {
        lTotal = ev.total;
      }

      this._onUpload(new HttpOnProgressEvent('DownloadProgress', ev.loaded, lTotal, ''));
    }

    if (typeof(this._onDownload) === 'function') {
      var lTotal = undefined;
      var lResponseText = '';

      if (ev.lengthComputable) {
        lTotal = ev.total;
      }

      if (options.responseType === 'text' && !!(this._xhr.responseText)) {
        lResponseText = this._xhr.responseText;
      }

      this._onDownload(new HttpOnProgressEvent('DownloadProgress', ev.loaded, lTotal, lResponseText));
    }
  });

  this.toPromise = once(
    lambda(this, function(onFulfilled, onRejected, onFinally) {
      this._promise = promiseFactory(
        lambda(this, function(resolve, reject) {
          if (this._state !== AjaxStatesEnum.Opened) {
            return;
          }

          if (!this._isAsync) {
            console.warn('Performing a synchronous request');
          }

          this._xhr.open(
            this._type, 
            this._url + '?' + this.params.toString(), 
            this._isAsync
          );

          this._state = AjaxStatesEnum.Pending;

          this._xhr.timeout = (AjaxOptions.defineTimeout(options.timeout) * 1000);
          this._xhr.withCredentials = !!(options.withCredentials);

          this._headers.detectContentTypeHeader(this._body);

          this._headers.iterate(lambda(this, function(key, value) {
            this._xhr.setRequestHeader(key, value);
          }));

          this._xhr.onload = lambda(this, function(ev) {
            this._state = AjaxStatesEnum.Fulfilled;

            var __status = this._xhr.status || 0;
            __status = (__status === 1223) ? 204 : __status;
            if (__status === 0) {
              __status = !!((typeof(this._xhr.response) === 'undefined') ? this._xhr.responseText : this._xhr.response) ? 200 : 0;
            }

            if (__status >= 200 && __status < 300) 
            {
              try
              {
                resolve(new HttpResponseEvent(ev, this._xhr, __status, (getResponseUrl(this._xhr) || this._url)));
              }
              catch(err)
              {
                reject(err);
              }
            } 
            else 
            {
              reject(ErrorInterceptor.intercept(new HttpErrorResponseEvent(
                ev, this._xhr, __status, (getResponseUrl(this._xhr) || this._url)
              )));
            }

          });

          var __onError__ = lambda(this, function(ev) {
            this._state = AjaxStatesEnum.Rejected;

            var __status = this._xhr.status || 0;

            reject(ErrorInterceptor.intercept(new HttpErrorResponseEvent(
              ev, this._xhr, __status, (getResponseUrl(this._xhr) || this._url)
            )));
          });

          this._xhr.ontimeout = __onError__;
          this._xhr.onabort = __onError__;
          this._xhr.onerror = __onError__;

          this._xhr.send(serializeRequestBody(this._body));

          this._body = null;
        })
      )
      .then(onFulfilled, onRejected)
      .finally(onFinally);

      return this._promise;
    }),
    lambda(this, function() {
      return this._promise;
    })
  );

  this.subscribe = function(onFulfilled, onRejected) {
    this.toPromise(onFulfilled, onRejected);
  };
}

Ajax.prototype = {

  params: null,
  _body: null,
  _headers: null,
  _type: null,
  _url: '',
  _isAsync: true,
  _xhr: null,
  _state: AjaxStatesEnum.Unknown,
  _promise: null,
  _onUpload: null,
  _onDownload: null,

  onUpload: function(onUpload) {
    this._onUpload = onUpload;

    return this;
  },
  
  onDownload: function(onDownload) {
    this._onDownload = onDownload;

    return this;
  },

  abort: function() {
    this._state = AjaxStatesEnum.Aborted;
    this._xhr.onprogress = null;
    this._xhr.onload = null;
    this._xhr.onerror = null;
    this._xhr.ontimeout = null;

    if (this._xhr.readyState !== this._xhr.DONE) {
      this._xhr.abort();
    }
  },

  setHeader: function(key, value) {
    if (this._state !== AjaxStatesEnum.Opened) {
      return;
    }

    this._headers.setHeader(key, value);
  },

  appendParam: function(key, value) {
    this.params.append(key, value);
  },

  toPromise: null,
  subscribe: null,

}

Ajax.setErrorInterceptor = function(interceptor) {
  ErrorInterceptor.setInterceptor(interceptor);
}

Ajax.get = function(url, headers, options) {
  return new Ajax('GET', url, null, false, headers, options);
}

Ajax.delete = function(url, headers, options) {
  return new Ajax('DELETE', url, null, false, headers, options);
}

Ajax.head = function(url, headers, options) {
  return new Ajax('HEAD', url, null, false, headers, options);
}

Ajax.post = function(url, body, headers, options) {
  return new Ajax('POST', url, body, true, headers, options);
}

Ajax.put = function(url, body, headers, options) {
  return new Ajax('PUT', url, body, true, headers, options);
}

Ajax.patch = function(url, body, headers, options) {
  return new Ajax('PATCH', url, body, true, headers, options);
}

Ajax.options = function(url, body, headers, options) {
  return new Ajax('OPTIONS', url, body, true, headers, options);
}
