import { Callback } from "./../utility/callback";
import { defineObjProp } from "./../utility/define-obj-prop.js";
import { lambda } from "./../utility/lambda";
import { once } from "../utility/once.js";
import { safeJsonStringify } from "./../utility/safe-json.js";
import { promiseFactory } from "./../helpers/promise-factory";
import { isArrayBuffer, isBlob, isFormData, isUrlSearchParams } from "./../helpers/xhr-body-type-checks";
import { getResponseUrl } from "./../helpers/xhr-get-response-url";
import { AjaxStatesEnum } from "../enums/ajax-states-enum.js";
import { HttpErrorResponseEvent } from "./../events/http/http-error-response-event.js";
import { HttpOnProgressEvent } from "../events/http/http-on-progress-event.js";
import { HttpResponseEvent } from "../events/http/http-response-event.js";
import { AjaxHeaders } from "./ajax-headers.js";
import { AjaxOptions } from "./ajax-options.js";
import { AjaxParams } from "./ajax-params";
import { ErrorInterceptor } from "./error-interceptor.js";

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

export function Ajax(type, url, body, headers, options) {
  this._state = AjaxStatesEnum.Opened;
  defineObjProp(this, 'state', function() { return this._state }, function() { });

  this._type = type;
  defineObjProp(this, 'type', function() { return this._type }, function() { });

  this._url = (typeof(url) !== 'string' || !url) ? '' : url;
  this._body = body;

  if (typeof(options) !== 'object' || !options) {
    options = new AjaxOptions();
  }
  
  this._options = options;

  this._headers = new AjaxHeaders(headers);
  this.params = new AjaxParams(this._options.params);
  this._xhr = new XMLHttpRequest();

  this._options.responseType = AjaxOptions.defineResponseType(this._options.responseType);
  this._xhr.responseType = AjaxOptions.overrideResponseType(this._options.responseType);

  this._onUpload = new Callback();
  this._onDownload = new Callback();
  
  this._xhr.onprogress = lambda(this, function(ev) {
    if (this._body !== null && this._body !== undefined && this._xhr.upload) {
      var lTotal = undefined;

      if (ev.lengthComputable) {
        lTotal = ev.total;
      }

      this._onUpload.emit(new HttpOnProgressEvent('UploadProgress', ev.loaded, lTotal, ''));
    }

    var lTotal = undefined;
    var lResponseText = '';

    if (ev.lengthComputable) {
      lTotal = ev.total;
    }

    if (this._options.responseType === 'text' && !!(this._xhr.responseText)) {
      lResponseText = this._xhr.responseText;
    }

    this._onDownload.emit(new HttpOnProgressEvent('DownloadProgress', ev.loaded, lTotal, lResponseText));
  });

  this.fetch = once(
    lambda(this, function() {
      this._promise = promiseFactory(
        lambda(this, function(resolve, reject) {
          this._xhr.open(this._type, this._url + this.params.getQueryString(), true);

          this._xhr.timeout = (AjaxOptions.defineTimeout(this._options.timeout));
          this._xhr.withCredentials = (this._options.withCredentials ? true : false);

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
                resolve(new HttpResponseEvent(ev, this._xhr, this._options.responseType, __status, (getResponseUrl(this._xhr) || this._url)));
              }
              catch(err)
              {
                reject(err);
              }
            } 
            else 
            {
              reject(ErrorInterceptor.intercept(new HttpErrorResponseEvent(
                ev, this._xhr, this._options.responseType, __status, (getResponseUrl(this._xhr) || this._url)
              )));
            }

          });

          var __onError__ = lambda(this, function(ev) {
            this._state = AjaxStatesEnum.Rejected;

            var __status = this._xhr.status || 0;

            reject(ErrorInterceptor.intercept(new HttpErrorResponseEvent(
              ev, this._xhr, this._options.responseType, __status, (getResponseUrl(this._xhr) || this._url)
            )));
          });

          this._xhr.ontimeout = __onError__;
          this._xhr.onabort = __onError__;
          this._xhr.onerror = __onError__;

          this._state = AjaxStatesEnum.Pending;

          setTimeout(
            lambda(this, function() {
              this._xhr.send(serializeRequestBody(this._body));
            }),
            AjaxOptions.defineDelay(this._options.delay)
          );
        })
      );

      return this._promise;
    }),
    lambda(this, function() {
      return this._promise;
    })
  );
}

Ajax.prototype = {

  params: null,
  _options: null,
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
    this._onUpload = new Callback(onUpload);

    return this;
  },
  
  onDownload: function(onDownload) {
    this._onDownload = new Callback(onDownload);

    return this;
  },

  abort: function() {
    if (this._state === AjaxStatesEnum.Rejected || this._state === AjaxStatesEnum.Fulfilled) {
      return;
    }

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
      return this;
    }

    this._headers.setHeader(key, value);

    return this;
  },

  appendParam: function(key, value) {
    this.params.append(key, value);

    return this;
  }

}

Ajax.setErrorInterceptor = function(interceptor) {
  ErrorInterceptor.setInterceptor(interceptor);
}
