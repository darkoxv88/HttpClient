import { defineObjProp } from "./../../utility/define-obj-prop.js";
import { noop } from "./../../utility/noop";
import { handleRespBody } from "../../helpers/handle-resp-body.js";
import { baseHttpResponse } from "../base-http-response.js";

export function HttpErrorResponseEvent(err, xhr, responseTxpe, status, url) {
  baseHttpResponse(this, xhr, status);

  this._timeStamp = err.timeStamp;
  defineObjProp(this, 'timeStamp', function() { return this._timeStamp }, noop);

  this._url = url;
  defineObjProp(this, 'url', function() { return this._url }, noop);

  this._name = 'HttpErrorResponse';
  defineObjProp(this, 'name', function() { return this._name }, noop);

  this._error = (typeof(xhr.response) === 'undefined') ? xhr.responseText : xhr.response;
  this._error = handleRespBody(this._error, responseTxpe);
  this._error = this._error ? this._error : err;
  defineObjProp(this, 'error', function() { return this._error }, noop);
}

HttpErrorResponseEvent.prototype = { }
