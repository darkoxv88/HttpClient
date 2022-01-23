import { defineObjProp } from "./../../utility/define-obj-prop.js";
import { noop } from "./../../utility/noop";
import { removeXSSI } from "../../helpers/remove-xssi.js";
import { baseHttpResponse } from "../base-http-response.js";

export function HttpResponseEvent(ev, xhr, status, url) {
  baseHttpResponse(this, xhr, status);

  this._timeStamp = ev.timeStamp;
  defineObjProp(this, 'timeStamp', function() { return this._timeStamp }, noop);

  this._url = url;
  defineObjProp(this, 'url', function() { return this._url }, noop);

  this._name = 'HttpResponse';
  defineObjProp(this, 'name', function() { return this._name }, noop);

  this._body = (typeof(xhr.response) === 'undefined') ? xhr.responseText : xhr.response;

  switch (xhr.responseType) {
    case 'arraybuffer': {
      if (!(this._body) || !(body instanceof ArrayBuffer)) {
        console.warn('Response type "arraybuffer" expects the respons to be ArrayBuffer.');
      }

      break;
    }

    case 'blob': {
      if (!(this._body) || !(this._body instanceof Blob)) {
        console.warn('Response type "blob" expects the respons to be Blob.');
      }

      break;
    }

    case 'text': {
      if (!(this._body) || typeof(this._body) !== 'string') {
        console.warn('Response type "text" expects the respons to be string.');
      }

      break;
    }

    case 'json': {
      if (!(this._body) || typeof(this._body) !== 'string') {
        console.warn('Response type "json" expects the respons to be string.');

        break;
      }

      this._body = removeXSSI(this._body);

      try
      {
        this._body = JSON.parse(this._body);
      }
      catch (err)
      {
        console.error('Could not parse the given response.');
        console.error(err);
      }

      break;
    }

    default: {
      break;
    }
  }

  defineObjProp(this, 'body', function() { return this._body }, noop);
}
