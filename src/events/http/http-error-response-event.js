import { defineObjProp } from "./../../utility/define-obj-prop.js";

import { baseHttpResponse } from "../base-http-response.js";

export function HttpErrorResponseEvent(err, xhr, status, url) {
  baseHttpResponse(this, xhr, status);

  this._timeStamp = err.timeStamp;
  Object.freeze(this._timeStamp);
  defineObjProp(this, 'timeStamp', function() { return this._timeStamp }, function() { });

  this._url = url;
  Object.freeze(this._url);
  defineObjProp(this, 'url', function() { return this._url }, function() { });

  this._name = 'HttpErrorResponse';
  Object.freeze(this._name);
  defineObjProp(this, 'name', function() { return this._name }, function() { });
}

HttpErrorResponseEvent.prototype = { }
