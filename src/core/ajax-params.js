import { safeUriEncode, safeUriDecode } from "./../utility/safe-uri";

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

export function AjaxParams(params) {
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
