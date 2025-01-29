import { defineObjProp } from "./../utility/define-obj-prop.js";
import { noop } from "./../utility/noop";

import { ResponseHeaders } from "../helpers/response-headers.js";

export function baseHttpResponse(chieldRoot, xhr, status) {
  chieldRoot._headers = new ResponseHeaders(xhr);
  defineObjProp(chieldRoot, 'headers', function() { return this._headers }, noop);

  chieldRoot._status = status;
  defineObjProp(chieldRoot, 'status', function() { return this._status }, noop);

  chieldRoot._ok = (chieldRoot.status >= 200 && chieldRoot.status < 300);
  defineObjProp(chieldRoot, 'ok', function() { return this._ok }, noop);

  chieldRoot._statusText = xhr.statusText || (chieldRoot._ok ? 'Unknown Status' : 'Unknown Error');
  defineObjProp(chieldRoot, 'statusText', function() { return this._statusText }, noop);
}
