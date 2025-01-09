import { Callback } from "./../utility/callback";
import { defineObjProp } from "./../utility/define-obj-prop.js";
import { once } from "../utility/once.js";
import { safeJsonStringify } from "./../utility/safe-json.js";
import { Observer } from "../helpers/observer.js";
import { isArrayBuffer, isBlob, isFormData, isUrlSearchParams } from "./../helpers/xhr-body-type-checks";
import { getResponseUrl } from "./../helpers/xhr-get-response-url";
import { AjaxStatesEnum } from "../enums/ajax-states-enum.js";
import { HttpErrorResponseEvent } from "./../events/http/http-error-response-event.js";
import { HttpOnProgressEvent } from "../events/http/http-on-progress-event.js";
import { HttpResponseEvent } from "../events/http/http-response-event.js";
import { AjaxHeaders } from "./ajax-headers.js";
import { AjaxOptions } from "./ajax-options.js";
import { AjaxParams } from "./ajax-params";
import { errorInterceptor, responseInterceptor } from "./interceptors.js";

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

  var self = this;
  
  this._xhr.onprogress = function(ev) {
    if (self._body !== null && self._body !== undefined && self._xhr.upload) {
      var lTotal = undefined;

      if (ev.lengthComputable) {
        lTotal = ev.total;
      }

      self._onUpload.emit(new HttpOnProgressEvent('UploadProgress', ev.loaded, lTotal, ''));
    }

    var lTotal = undefined;
    var lResponseText = '';

    if (ev.lengthComputable) {
      lTotal = ev.total;
    }

    if (self._options.responseType === 'text' && !!(self._xhr.responseText)) {
      lResponseText = self._xhr.responseText;
    }

    self._onDownload.emit(new HttpOnProgressEvent('DownloadProgress', ev.loaded, lTotal, lResponseText));
  }

  this.request = once(
    function() {
      self._subscription = Observer.for(function(resolve, reject) {
        self._xhr.open(self._type, self._url + self.params.getQueryString(), true);

        self._xhr.timeout = (AjaxOptions.defineTimeout(self._options.timeout));
        self._xhr.withCredentials = (self._options.withCredentials ? true : false);

        self._headers.detectContentTypeHeader(self._body);

        self._headers.iterate(function(key, value) {
          self._xhr.setRequestHeader(key, value);
        });

        var __onLoad__ = function(ev) {
          self._state = AjaxStatesEnum.Fulfilled;

          var __status = self._xhr.status || 0;
          __status = (__status === 1223) ? 204 : __status;

          if (__status === 0) {
            __status = !!((typeof(self._xhr.response) === 'undefined') ? self._xhr.responseText : self._xhr.response) ? 200 : 0;
          }

          if (__status >= 200 && __status < 300) 
          {
            try
            {
              resolve(responseInterceptor.intercept(new HttpResponseEvent(
                ev, self._xhr, self._options.responseType, __status, (getResponseUrl(self._xhr) || self._url)
              )));
            }
            catch(err)
            {
              reject(err);
            }
          } 
          else 
          {
            reject(errorInterceptor.intercept(new HttpErrorResponseEvent(
              ev, self._xhr, self._options.responseType, __status, (getResponseUrl(self._xhr) || self._url)
            )));
          }
        }

        var __onError__ = function(ev) {
          self._state = AjaxStatesEnum.Rejected;

          var __status = self._xhr.status || 0;

          reject(errorInterceptor.intercept(new HttpErrorResponseEvent(
            ev, self._xhr, self._options.responseType, __status, (getResponseUrl(self._xhr) || self._url)
          )));
        }

        self._xhr.onload = __onLoad__;
        self._xhr.ontimeout = __onError__;
        self._xhr.onabort = __onError__;
        self._xhr.onerror = __onError__;

        self._state = AjaxStatesEnum.Pending;

        setTimeout(
          function() {
            self._xhr.send(serializeRequestBody(self._body));
          },
          AjaxOptions.defineDelay(self._options.delay)
        );
      });

      return self._subscription;
    },
    function() {
      return self._subscription;
    }
  );
}

Ajax.prototype = {

  _state: AjaxStatesEnum.Unknown,

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
