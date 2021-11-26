import { isProduction } from "../environment";

import { defineObjProp } from "./../utility/define-obj-prop.js";

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

    return !!(this._headers[key]);
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
  defineObjProp(chieldRoot, 'headers', function() { return this._headers }, function() { });

  chieldRoot._status = status;
  defineObjProp(chieldRoot, 'status', function() { return this._status }, function() { });

  chieldRoot._ok = (chieldRoot.status >= 200 && chieldRoot.status < 300);
  defineObjProp(chieldRoot, 'ok', function() { return this._ok }, function() { });

  chieldRoot._statusText = xhr.statusText || 'Unknown Error';
  defineObjProp(chieldRoot, 'statusText', function() { return this._statusText }, function() { });
}
