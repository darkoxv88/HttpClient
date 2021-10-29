import { isProduction } from "../environment";

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

  Object.freeze(this._headers);
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
  chieldRoot['headers'] = new ResponseHeaders(xhr);
  Object.freeze(chieldRoot['headers']);

  chieldRoot['status'] = status;
  Object.freeze(chieldRoot['status']);

  chieldRoot['ok'] = (chieldRoot['status'] >= 200 && chieldRoot['status'] < 300);
  Object.freeze(chieldRoot['ok']);

  chieldRoot['statusText'] = xhr.statusText || 'Unknown Error';
  Object.freeze(chieldRoot['statusText']);
}
