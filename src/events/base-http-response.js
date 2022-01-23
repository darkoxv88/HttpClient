import { isProduction } from "../environment";
import { defineObjProp } from "./../utility/define-obj-prop.js";
import { noop } from "./../utility/noop";

function ResponseHeaders(xhr) {
  this._headers = null;

  try
  {
    this._headers = xhr.getAllResponseHeaders().split('\r\n').reduce(
      function(result, current) {
        var spl = current.split(': ');

        if (!spl[0] || !spl[1]) {
          return result;
        }

        result[spl[0]] = spl[1];

        return result;
      }, 
      ({ })
    );
  }
  catch (err) 
  {
    if (!(isProduction())) {
      console.error(err);
    }

    this._headers = ({ });
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
