import { isArrayBuffer, isBlob, isFormData } from "../helpers/xhr-body-type-checks";
import { AjaxParams } from "./ajax-params";

export function AjaxHeaders(headers) {
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

  setHeader: function(key, value) {
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

  detectContentTypeHeader: function(body) {
    if (!(Array.isArray(this._headers.get('Accept')))) {
      this.setHeader('Accept', 'application/json, text/plain, */*');
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
        this.setHeader('Content-Type', check);
      }

      return;
    }

    if (isArrayBuffer(body)) {
      return;
    }

    if (typeof(body) === 'string') {
      this.setHeader('Content-Type', 'text/plain');

      return;
    }
    
    if (body instanceof AjaxParams) {
      this.setHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');

      return;
    }

    if (typeof(body) === 'object' || typeof(body) === 'number' || typeof(body) === 'boolean') {
      this.setHeader('Content-Type', 'application/json');
      
      return;
    }
  }
}
