import { defineObjProp } from "./../../utility/define-obj-prop.js";
import { noop } from "./../../utility/noop";
import { handleRespBody } from "../../helpers/handle-resp-body.js";
import { baseHttpResponse } from "../base-http-response.js";

export function HttpResponseEvent(ev, xhr, responseTxpe, status, url) {
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
