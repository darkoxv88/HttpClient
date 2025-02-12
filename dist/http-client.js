/**
  * 
	* @author Darko Petrovic
  * @Link Facebook: https://www.facebook.com/WitchkingOfAngmarr
  * @Link GitHub: https://github.com/darkoxv88
  * 
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.


exports:

  window.HttpClient;

**/

(function() {
"use strict";

;// CONCATENATED MODULE: ./src/refs/root.js
var root = typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : ({ });

function getRoot() {
  return root;
}

function toRoot(exports) {
  if (typeof(exports) !== 'object' || !exports) {
    return;
  }

  Object.keys(exports).forEach((item) => {
    root[item] = exports[item];
  });
}

;// CONCATENATED MODULE: ./src/utility/enum-value.js
function enumValue(ref, key, value) {
  Object.defineProperty(ref, key, { enumerable: true, get: function() { return value; } });
  Object.freeze(ref[key]);
}

;// CONCATENATED MODULE: ./src/enums/http-status-codes-enum.js
function getUpperCasePositions(inputString) {
  var positions = [];

  for (var i = 0; i < inputString.length; i++) {
    if(inputString[i].match(/[A-Z]/) != null) {
      positions.push(i);
    }
  }

  return positions;
}

function defineCode(target, text, code) {
  enumValue(target, text, code);

  var positions = getUpperCasePositions(text);
  for (var i = 0; i < positions.length; i++) {
    if(i === 0) {
      continue;
    }

    var pos = positions[i] + (i - 1);

    text = text.slice(0, pos) + ' ' + text.slice(pos);
  }
  
  enumValue(target, code, text);
}

function HttpStatusCode() {
  defineCode(this, 'Continue', 100);
  defineCode(this, 'SwitchingProtocols', 101);
  defineCode(this, 'Processing', 102);
  defineCode(this, 'EarlyHints', 103);
  defineCode(this, 'Ok', 200);
  defineCode(this, 'Created', 201);
  defineCode(this, 'Accepted', 202);
  defineCode(this, 'NonAuthoritativeInformation', 203);
  defineCode(this, 'NoContent', 204);
  defineCode(this, 'ResetContent', 205);
  defineCode(this, 'PartialContent', 206);
  defineCode(this, 'MultiStatus', 207);
  defineCode(this, 'AlreadyReported', 208);
  defineCode(this, 'ImUsed', 226);
  defineCode(this, 'MultipleChoices', 300);
  defineCode(this, 'MovedPermanently', 301);
  defineCode(this, 'Found', 302);
  defineCode(this, 'SeeOther', 303);
  defineCode(this, 'NotModified', 304);
  defineCode(this, 'UseProxy', 305);
  defineCode(this, 'Unused', 306);
  defineCode(this, 'TemporaryRedirect', 307);
  defineCode(this, 'PermanentRedirect', 308);
  defineCode(this, 'BadRequest', 400);
  defineCode(this, 'Unauthorized', 401);
  defineCode(this, 'PaymentRequired', 402);
  defineCode(this, 'Forbidden', 403);
  defineCode(this, 'NotFound', 404);
  defineCode(this, 'MethodNotAllowed', 405);
  defineCode(this, 'NotAcceptable', 406);
  defineCode(this, 'ProxyAuthenticationRequired', 407);
  defineCode(this, 'RequestTimeout', 408);
  defineCode(this, 'Conflict', 409);
  defineCode(this, 'Gone', 410);
  defineCode(this, 'LengthRequired', 411);
  defineCode(this, 'PreconditionFailed', 412);
  defineCode(this, 'PayloadTooLarge', 413);
  defineCode(this, 'UriTooLong', 414);
  defineCode(this, 'UnsupportedMediaType', 415);
  defineCode(this, 'RangeNotSatisfiable', 416);
  defineCode(this, 'ExpectationFailed', 417);
  defineCode(this, 'ImATeapot', 418);
  defineCode(this, 'MisdirectedRequest', 421);
  defineCode(this, 'UnprocessableEntity', 422);
  defineCode(this, 'Locked', 423);
  defineCode(this, 'FailedDependency', 424);
  defineCode(this, 'TooEarly', 425);
  defineCode(this, 'UpgradeRequired', 426);
  defineCode(this, 'PreconditionRequired', 428);
  defineCode(this, 'TooManyRequests', 429);
  defineCode(this, 'RequestHeaderFieldsTooLarge', 431);
  defineCode(this, 'UnavailableForLegalReasons', 451);
  defineCode(this, 'InternalServerError', 500);
  defineCode(this, 'NotImplemented', 501);
  defineCode(this, 'BadGateway', 502);
  defineCode(this, 'ServiceUnavailable', 503);
  defineCode(this, 'GatewayTimeout', 504);
  defineCode(this, 'HttpVersionNotSupported', 505);
  defineCode(this, 'VariantAlsoNegotiates', 506);
  defineCode(this, 'InsufficientStorage', 507);
  defineCode(this, 'LoopDetected', 508);
  defineCode(this, 'NotExtended', 510);
  defineCode(this, 'NetworkAuthenticationRequired', 511);
}

HttpStatusCode.prototype = { };

var httpStatusCodesEnum = new HttpStatusCode();

Object.freeze(httpStatusCodesEnum);

;// CONCATENATED MODULE: ./src/helpers/xhr-body-type-checks.js
function isArrayBuffer(value) {
  return (value ? true : false) && (value instanceof ArrayBuffer);
}

function isBlob(value) {
  return (value ? true : false) && (value instanceof Blob);
}

function isFormData(value) {
  return (value ? true : false) && (value instanceof FormData);
}

function isUrlSearchParams(value) {
  return (value ? true : false) && (value instanceof URLSearchParams);
}

;// CONCATENATED MODULE: ./src/utility/safe-uri.js
function safeUriEncode(value) {
  try 
  {
    return encodeURIComponent(value);
  }
  catch (err)
  {
    return '';
  }
}

function safeUriDecode(value) {
  try 
  {
    return decodeURIComponent(value)
  }
  catch (err)
  {
    return '';
  }
}

;// CONCATENATED MODULE: ./src/core/ajax-params.js
function isParamValid(value) {
  if (Array.isArray(value) || typeof(value) === 'string' || typeof(value) === 'number' || typeof(value) === 'boolean') {
    return true;
  }

  return false;
}

function paramParser(rawParams) {
  var map = new Map();

  if (typeof(rawParams) !== 'string') {
    rawParams = '';
  }

  if (rawParams.length > 0) {
    var params = rawParams.replace(/^\?/, '').split('&');

    params.forEach(function(param) {
      var eqIndex = param.indexOf('=');

      var decoded = null;

      if (eqIndex == -1)
      {
        decoded = [safeUriDecode(param), '']
      }
      else
      {
        decoded = [safeUriDecode(param.slice(0, eqIndex)), safeUriDecode(param.slice(eqIndex + 1))];
      }

      var list = map.get(decoded[0]) || ([ ]);

      list.push(decoded[1]);

      map.set(decoded[0], list);
    });
  }

  return map;
}

function AjaxParams(params) {
  var map = null;

  if (params instanceof AjaxParams) {
    this._map = params.cloneParamsMap();

    return;
  }

  switch (typeof(params)) {
    case 'string': {
      map = paramParser(params);

      break;
    }

    case 'object': {
      map = new Map();

      if (!params) {
        params = ({ });
      }

      Object.keys(params).forEach(function(key) {
        if (!isParamValid(params[key])) {
          return;
        }

        map.set(
          key, Array.isArray(params[key]) ? params[key] : [params[key]]
        );
      });

      break;
    }

    default: {
      map = new Map();

      break;
    }
  }

  this._map = map;
}

AjaxParams.prototype = {
  has: function(key) {
    if (typeof(key) !== 'string') {
      return false;
    }

    return this._map.has(key);
  },

  keys: function() {
    return Array.from(this._map.keys());
  },

  get: function(key) {
    if (typeof(key) !== 'string') {
      return null;
    }

    var res = this._map.get(key);
    return res ? res[0] : null;
  },

  getAll: function(key) {
    if (typeof(key) !== 'string') {
      return null;
    }

    return this._map.get(key) || null;
  },

  cloneParamsMap: function() {
    var self = this;
    var out = new Map();

    this.keys().forEach(function(key) {
      out.set(key, self._map.get(key));
    });

    return out;
  },

  append: function(key, value) {
    if (typeof(key) !== 'string') {
      return null;
    }

    if (!isParamValid(value)) {
      return;
    }

    Array.isArray(this._map.get(key)) ? (this._map.get(key).push(value)) : (this._map.set(key,[value]));
  },

  deleteByKey: function(key) {
    if (typeof(key) !== 'string') {
      return null;
    }
    
    this._map.delete(key);
  },

  toString: function() {
    var self = this;

    return this.keys().map(function(key) {
      return self._map.get(key).map(function(value) { 
        return safeUriEncode(key) + '=' + safeUriEncode(value); 
      }).join('&');
    })
    .filter(function(param) { 
      return (param !== '');
    })
    .join('&');
  },

  getQueryString: function() {
    var out = this.toString();

    return out ? ('?' + out) : '';
  }
}

;// CONCATENATED MODULE: ./src/core/ajax-headers.js
function AjaxHeaders(headers) {
  if (typeof(headers) !== 'object' || !headers) {
    headers = ({ });
  }

  if (headers instanceof AjaxHeaders) {
    headers = headers.cloneHeadersMap();
  }

  this._headers = headers;

  if (this._headers instanceof Map) {
    return;
  }

  var map = new Map();

  try 
  {
    for (var _item in this._headers) {
      if (Array.isArray(this._headers[_item])) {
        map.set(_item, this._headers[_item]);

        continue;
      }
      
      if (typeof(this._headers[_item]) !== 'string') {
        continue;
      }

      map.set(
        _item, [this._headers[_item]]
      );
    }
  }
  catch (err)
  {
    console.log(err);
  }

  this._headers = null;
  this._headers = map;
}

AjaxHeaders.prototype = {
  keys: function() {
    return Array.from(this._headers.keys());
  },

  iterate: function(callback) {
    var self = this;

    this.keys().forEach(function(key) {
      self._headers.get(key).forEach(function(value) {
        callback(key, value);
      });
    });
  },

  getHeader: function(key) {
    if (typeof(key) !== 'string') {
      return '';
    }
    
    return this._headers.get(key)[0];
  },

  getHeaders: function(key) {
    if (typeof(key) !== 'string') {
      return '';
    }
    
    return this._headers.get(key);
  },

  getHeadersMap: function() {
    return this._headers;
  },

  cloneHeadersMap: function() {
    var self = this;
    var out = new Map();

    this.keys().forEach(function(key) {
      out.set(key, self._headers.get(key));
    });

    return out;
  },

  clone: function() {
    return new AjaxHeaders(this);
  },

  set: function(key, value) {
    if (typeof(key) !== 'string' || !key) {
      return;
    }

    if (typeof(value) !== 'string' || !value) {
      return;
    }

    if (!(Array.isArray(this._headers.get(key)))) {
      this._headers.set(key, []);
    }

    this._headers.get(key).push(value);
  },

  delete: function(key) {
    this._headers.delete(key);
  },

  detectContentTypeHeader: function(body) {
    if (!(Array.isArray(this._headers.get('Accept')))) {
      this.set('Accept', 'application/json, text/plain, */*');
    }
    
    if (Array.isArray(this._headers.get('Content-Type'))) {
      return;
    }

    if (body === null) {
      return;
    }

    if (isFormData(body)) {
      return;
    }

    if (isBlob(body)) {
      var check = body.type || null;

      if (check) {
        this.set('Content-Type', check);
      }

      return;
    }

    if (isArrayBuffer(body)) {
      return;
    }

    if (typeof(body) === 'string') {
      this.set('Content-Type', 'text/plain');

      return;
    }
    
    if (body instanceof AjaxParams) {
      this.set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');

      return;
    }

    if (typeof(body) === 'object' || typeof(body) === 'number' || typeof(body) === 'boolean') {
      this.set('Content-Type', 'application/json');
      
      return;
    }
  }
}

;// CONCATENATED MODULE: ./src/utility/noop.js
function noop() { }

;// CONCATENATED MODULE: ./src/utility/callback.js
function Callback(fn) {
  if (typeof(fn) !== 'function') {
    fn = noop;
  }

  this._fn = fn;
}

Callback.prototype = {
  emit: function(v1, v2, v3) {
    try
    {
      this._fn(v1, v2, v3);
    }
    catch(err)
    {
      console.error(err);
    }
  },
}

;// CONCATENATED MODULE: ./src/utility/define-obj-prop.js.js
function defineObjProp(ref, key, getter, setter) {
  var def = ({
    enumerable: true
  });

  if (typeof(getter) === 'function') {
    def['get'] = getter;
  }

  if (typeof(setter) === 'function') {
    def['set'] = setter;
  }

  Object.defineProperty(ref, key, def);
}

;// CONCATENATED MODULE: ./src/utility/try-catch.js
function tryCatch(func, onError) {
  if (typeof func !== 'function') {
    return noop;
  }

  return function() {
    try 
    {
      return func.apply(this, arguments);
    } 
    catch (e) 
    {
      if (typeof onError === 'function') {
        return onError(e);
      };

      return null;
    }
  }
}

;// CONCATENATED MODULE: ./src/helpers/observer.js
function catchedError(err) {
  console.error(err);
}

function asAsync(proc) {
  setTimeout(proc, 1);
}

var EventEmitter = function() {
  this.listeners = [];
}

EventEmitter.prototype = {
  addListener: function(fn) {
    this.listeners.push(tryCatch(fn, catchedError));
  },

  emit: function(value) {
    while (this.listeners.length > 0) {
      var listener = this.listeners.shift();

      listener(value);
    }
  }
}

var const_PENDING = 0;
var const_FULFILLED = 1;
var const_REJECTED = 2;

var Observer = function(executor) {
  var state = const_PENDING;
  var value = undefined;
  var error = undefined;
  var onFulfilledEmitter = new EventEmitter();
  var onRejectedEmitter = new EventEmitter();
  var onFinallyEmitter = new EventEmitter();

  var _resolve = function(value) {
    if (state !== const_PENDING) {
      return;
    } 

    state = const_FULFILLED;
    value = value;
    onFulfilledEmitter.emit(value);
    onFinallyEmitter.emit(undefined);
  }
  var resolve = function(value) {
    _resolve(value);
  }

  var _reject = function(err) {
    if (state !== const_PENDING) {
      return;
    }

    state = const_REJECTED;
    error = err;
    onRejectedEmitter.emit(error);
    onFinallyEmitter.emit(undefined);
  }
  var reject = function(err) {
    _reject(err);
  }

  this.unsubscribe = function() {
    if (state === const_PENDING) {
      _resolve = noop;
      _reject = noop;
    } 
  }

  this.then = function(onFulfilled, onRejected, onFinally) {
    onFulfilledEmitter.addListener(onFulfilled);

    if (state === const_FULFILLED) {
      onFulfilledEmitter.emit(value);
    }

    return this.catch(onRejected, onFinally);
  }

  this.catch = function(onRejected, onFinally) {
    onRejectedEmitter.addListener(onRejected);

    if (state === const_REJECTED) {
      onRejectedEmitter.emit(error);
    }

    return this.finally(onFinally);
  }

  this.finally = function(onFinally) {
    onFinallyEmitter.addListener(onFinally);

    if (state !== const_PENDING) {
      onFinallyEmitter.emit(undefined);
    }

    return this;
  }

  executor = tryCatch(executor, reject);

  asAsync(function() {
    executor(resolve, reject);
  });
}

Observer.prototype = { 
  toPromise: function() {
    if (typeof(getRoot()['Promise']) === 'function') {
      var self = this;

      return (new Promise(function(res, rej) {
        self.then(res, rej);
      }));
    }

    return this;
  }
}

Observer.for = function(observable) {
  return new Observer(observable);
}

;// CONCATENATED MODULE: ./src/helpers/response-headers.js
function ResponseHeaders(xhr) {
  this._headers = ({ });

  if (!xhr) {
    return;
  }

  try
  {
    xhr.getAllResponseHeaders().split('\r\n').reduce(
      function(result, current) {
        var spl = current.split(': ');

        if (!spl[0] || !spl[1]) {
          return result;
        }

        result[spl[0]] = spl[1];

        return result;
      }, 
      this._headers
    );
  }
  catch (err) 
  {
    console.error(err);
  }
}

ResponseHeaders.prototype = { 
  has: function(key) {
    if (typeof(key) !== 'string') {
      return null;
    }

    return this._headers[key] ? true : false;
  },

  get: function(key) {
    if (typeof(key) !== 'string') {
      return null;
    }

    return this._headers[key];
  },
}

;// CONCATENATED MODULE: ./src/core/interceptors.js
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

var requestInterceptor = new Interceptor();

requestInterceptor.intercept = function(data, request) {
  this.cb.emit(data, function(executor) {
    if (typeof(executor) !== 'function') {
      return;
    }

    request = function() {
      return (Observer["for"](function(res, rej) {
        executor(
          function() { res(createResolvedResponse.apply({ }, [data.url].concat(Array.from(arguments)))); },
          function() { rej(createRejectedResponse.apply({ }, [data.url].concat(Array.from(arguments)))); }
        );
      }));
    }
  });

  return request();
}

var errorInterceptor = new Interceptor();

var responseInterceptor = new Interceptor();

;// CONCATENATED MODULE: ./src/utility/once.js
function once(onFirstCall, onMultipleCalls) {
  var hasBeenCalled = false;

  return function() {
    if (hasBeenCalled) {
      if (typeof(onMultipleCalls) === 'function') {
        return onMultipleCalls.apply(this, arguments);;
      }

      return;
    }

    hasBeenCalled = true;

    if (typeof(onFirstCall) === 'function') {
      return onFirstCall.apply(this, arguments);
    }
  }
}

;// CONCATENATED MODULE: ./src/utility/safe-json.js
function safeJsonStringify(value) {
  try
  {    
    return JSON.stringify(value);
  }
  catch (err)
  {
    console.error(err);
    
    return '';
  }
}

;// CONCATENATED MODULE: ./src/helpers/xhr-get-response-url.js
function getResponseUrl(xhr) {
  try
  {
    if (('responseURL' in xhr) && xhr.responseURL) {
      return xhr.responseURL;
    }
  
    if ((/^X-Request-URL:/m).test(xhr.getAllResponseHeaders())) {
      return xhr.getResponseHeader('X-Request-URL');
    }
  
    return '';
  }
  catch (err)
  {
    return '';
  }
}

;// CONCATENATED MODULE: ./src/enums/ajax-states-enum.js
function AjaxStates() {
  enumValue(this, 'Unknown', 0);
  enumValue(this, 'Opened', 1);
  enumValue(this, 'Pending', 2);
  enumValue(this, 'Aborted', 3);
  enumValue(this, 'Rejected', 4);
  enumValue(this, 'Fulfilled', 5);
}

AjaxStates.prototype = { };

var AjaxStatesEnum = new AjaxStates();

Object.freeze(AjaxStatesEnum);

;// CONCATENATED MODULE: ./src/helpers/remove-xssi.js
var XSSI_prefixRegEx = /^\)\]\}',?\n/;

function removeXSSI(str) {
  return str.replace(XSSI_prefixRegEx, '');
}

;// CONCATENATED MODULE: ./src/helpers/handle-resp-body.js
function handleRespBody(body, respType) {
  switch (respType) {
    case 'arraybuffer': {
      if (!(body) || !(body instanceof ArrayBuffer)) {
        console.warn('Response type "arraybuffer" expects the respons to be ArrayBuffer.');
      }

      break;
    }

    case 'blob': {
      if (!(body) || !(body instanceof Blob)) {
        console.warn('Response type "blob" expects the respons to be Blob.');
      }

      break;
    }

    case 'text': {
      if (!(body) || typeof(body) !== 'string') {
        console.warn('Response type "text" expects the respons to be string.');
      }

      break;
    }

    case 'json': {
      if (!(body) || typeof(body) !== 'string') {
        body = null;

        break;
      }

      try
      {
        body = removeXSSI(body);

        body = JSON.parse(body);
      }
      catch (err)
      {
        console.error('Could not parse the given response => ', err);

        body = null;
      }

      break;
    }

  }

  return body;
}

;// CONCATENATED MODULE: ./src/events/base-http-response.js
function baseHttpResponse(chieldRoot, xhr, status) {
  chieldRoot._headers = new ResponseHeaders(xhr);
  defineObjProp(chieldRoot, 'headers', function() { return this._headers }, noop);

  chieldRoot._status = status;
  defineObjProp(chieldRoot, 'status', function() { return this._status }, noop);

  chieldRoot._ok = (chieldRoot.status >= 200 && chieldRoot.status < 300);
  defineObjProp(chieldRoot, 'ok', function() { return this._ok }, noop);

  chieldRoot._statusText = xhr.statusText || (chieldRoot._ok ? 'Unknown Status' : 'Unknown Error');
  defineObjProp(chieldRoot, 'statusText', function() { return this._statusText }, noop);
}

;// CONCATENATED MODULE: ./src/events/http/http-error-response-event.js
function HttpErrorResponseEvent(err, xhr, responseType, status, url) {
  baseHttpResponse(this, xhr, status);

  this._timeStamp = err.timeStamp;
  defineObjProp(this, 'timeStamp', function() { return this._timeStamp }, noop);

  this._url = url;
  defineObjProp(this, 'url', function() { return this._url }, noop);

  this._name = 'HttpErrorResponse';
  defineObjProp(this, 'name', function() { return this._name }, noop);

  switch(responseType){
    case 'json': {
      break;
    }

    default: {
      responseType = 'text';
      break;
    }
  }

  this._error = (typeof(xhr.response) === 'undefined') ? xhr.responseText : xhr.response;
  this._error = handleRespBody(this._error, responseType);
  this._error = this._error ? this._error : err;
  defineObjProp(this, 'error', function() { return this._error }, noop);
}

HttpErrorResponseEvent.prototype = { }

;// CONCATENATED MODULE: ./src/events/http/http-on-progress-event.js
function HttpOnProgressEvent(type, processed, total, partialText) {
  this.type = type;
  Object.freeze(this.type);

  this.processed = processed;
  Object.freeze(this.processed);

  this.total = total;
  Object.freeze(this.total);

  this.partialText = partialText;
  Object.freeze(this.partialText);
}

HttpOnProgressEvent.prototype = { }

;// CONCATENATED MODULE: ./src/events/http/http-response-event.js
function HttpResponseEvent(ev, xhr, responseTxpe, status, url) {
  baseHttpResponse(this, xhr, status);

  this._timeStamp = ev.timeStamp;
  defineObjProp(this, 'timeStamp', function() { return this._timeStamp }, noop);

  this._url = url;
  defineObjProp(this, 'url', function() { return this._url }, noop);

  this._name = 'HttpResponse';
  defineObjProp(this, 'name', function() { return this._name }, noop);

  this._body = (typeof(xhr.response) === 'undefined') ? xhr.responseText : xhr.response;
  this._body = handleRespBody(this._body, responseTxpe);
  defineObjProp(this, 'body', function() { return this._body }, noop);
}

;// CONCATENATED MODULE: ./src/core/ajax-options.js
function ajax_options_AjaxOptions() { }

ajax_options_AjaxOptions.prototype = {
  timeout: 60,
  responseType: '',
  withCredentials: false,
  params: null,
  delay: 0,
}

ajax_options_AjaxOptions.defineDelay = function(value) {
  if (typeof(value) !== 'number') {
    return 0;
  }

  if (value < 0) {
    return 0;
  }

  return value * 1000;
}

ajax_options_AjaxOptions.defineTimeout = function(value) {
  if (typeof(value) !== 'number') {
    return 60000;
  }

  if (value < 0) {
    return 60000;
  }

  return value * 1000;
}

ajax_options_AjaxOptions.defineResponseType = function(type) {
  if (typeof(type) !== 'string' || !type) {
    return '';
  }

  type = type.toLowerCase();

  switch (type) {
    case 'arraybuffer': {
      return type;
    }

    case 'blob': {
      return type;
    }

    case 'document': {
      return type;
    }

    case 'json': {
      return type;
    }

    case 'ms-stream': {
      return type;
    }

    case 'text': {
      return type;
    }

    default: {
      return '';
    }
  }
}

ajax_options_AjaxOptions.overrideResponseType = function(type) {
  switch (type) {
    case 'json': {
      return 'text';
    }

    default: {
      return type;
    }
  }
}

;// CONCATENATED MODULE: ./src/core/ajax.js
function serializeRequestBody(body) {
  if (body === null || body === undefined) {
    return null;
  }

  if (isArrayBuffer(body) || isBlob(body) || isFormData(body) || isUrlSearchParams(body) || typeof(body) === 'string') {
    return body;
  }

  if (body instanceof AjaxParams) {
    return body.toString();
  }

  if (typeof(body) === 'object' || typeof(body) === 'boolean' || Array.isArray(body)) {
    return safeJsonStringify(body);
  }
  
  if (typeof(body.toString) === 'function') {
    return body.toString();
  }
}

function Ajax(type, url, body, headers, options) {
  this._state = AjaxStatesEnum.Opened;
  defineObjProp(this, 'state', function() { return this._state }, function() { });

  this._type = type;
  defineObjProp(this, 'type', function() { return this._type }, function() { });

  this._url = (typeof(url) !== 'string' || !url) ? '' : url;
  this._body = body;

  if (typeof(options) !== 'object' || !options) {
    options = new ajax_options_AjaxOptions();
  }
  
  this._options = options;
  this._options.responseType = ajax_options_AjaxOptions.defineResponseType(this._options.responseType);

  this._headers = new AjaxHeaders(headers);
  this.params = new AjaxParams(this._options.params);
  this._xhr = new XMLHttpRequest();

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

  var request = once(
    function() {
      return Observer["for"](function(resolve, reject) {
        self._xhr.responseType = ajax_options_AjaxOptions.overrideResponseType(self._options.responseType);
        self._xhr.open(self._type, self._url + self.params.getQueryString(), true);

        self._xhr.timeout = (ajax_options_AjaxOptions.defineTimeout(self._options.timeout));
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
          ajax_options_AjaxOptions.defineDelay(self._options.delay)
        );
      });
    },
  );

  this.request = once(
    function() {
      return self._subscription = requestInterceptor.intercept(
        { 
          type: self._type,
          url: self._url,
          headers: self._headers,
          params: self.params,
          body: self._body,
        }, 
        request
      );
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

    this._headers.set(key, value);

    return this;
  },

  appendParam: function(key, value) {
    this.params.append(key, value);

    return this;
  }

}

;// CONCATENATED MODULE: ./src/utility/random-generator.js
function randomStringIdGenerator() {
  return ('xxxxyxxxyxxx').replace(/[xy]/g, function(char) {
    var rand = Math.random() * 16 | 0; 
    var out = (char == 'x') ? rand : (rand & 0x3 | 0x8);

    return out.toString(16);
  });
}

;// CONCATENATED MODULE: ./src/core/jsonp.js
var indexInUse = ({ });

function createTarget() {
  return (document.body ? document.body : document.head);
}

function generateIndex() { 
  var index = randomStringIdGenerator();

  if (indexInUse[index]) {
    return generateIndex();
  }

  indexInUse[index] = true;

  return index;
}

function removeIndex(index) {
  if (indexInUse[index]) {
    delete(indexInUse[index]);
  }
}

function getCallbackName(index) {
  return ('___jsonp_request_callback_' + index + '___');
}

function attachCallback(index, callback) {
  getRoot()['___jsonp_request_callback_' + index + '___'] = callback;
}

function detachCallback(index) {
  delete(getRoot()['___jsonp_request_callback_' + index + '___']);
}

function JSONP(url, options, callbackParamName, callbackName) {
  this._index = generateIndex();
  this._url = (typeof(url) !== 'string' || !url) ? '' : url;
  this._script = document.createElement('script');

  if (typeof(options) !== 'object' || !options) {
    options = new ajax_options_AjaxOptions();
  }

  if (typeof(callbackParamName) !== 'string' || !(callbackParamName)) {
    callbackParamName = 'callback';
  }

  if (typeof(callbackName) === 'string' && !!(callbackName)) {
    this._index = callbackName;
  }

  this.params = new AjaxParams(options.params);

  var self = this;

  this.request = once(
    function() {
      self._subscription = Observer["for"](function(resolve, reject) {
        self.params.deleteByKey(callbackParamName);
        self.params.append(callbackParamName, getCallbackName(self._index));

        self._script.src = self._url + '?' + self.params.toString();
        self._script.type = 'text/javascript';
        self._script.async = true;

        var __constFinalize__ = function() {
          detachCallback(self._index);

          if (self._script) {
            self._script.parentNode ? self._script.parentNode.removeChild(self._script) : null;
          }

          removeIndex(self._index);
        }

        attachCallback(self._index, function(data) {
          if (self._timer) {
            clearTimeout(self._timer);
          }

          resolve(data);
        });

        self._script.onload = function() {
          __constFinalize__();
        }

        self._script.onerror = function(ev) {  
          if (self._timer) {
            clearTimeout(self._timer);
          }

          __constFinalize__();

          reject(ev);
        }

        setTimeout(
          function() {
            createTarget().append(self._script);

            self._timer = setTimeout(
              function() { 
                __constFinalize__();
    
                reject(new Error('JSONP request canceled.'));
              }, 
              ajax_options_AjaxOptions.defineTimeout(options.timeout)
            );
          },
          ajax_options_AjaxOptions.defineDelay(options.delay)
        );

          return;
      });

      return this._subscription;
    },
    function() {
      return self._subscription;
    }
  );
}

JSONP.prototype = { }

;// CONCATENATED MODULE: ./src/http.js
function HTTP() { }

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
  return '1.2.2';
}

;// CONCATENATED MODULE: ./src/index.js
toRoot({ HttpClient: HTTP });

})();
