
export function ResponseHeaders(xhr) {
  this._headers = ({ });

  if (!xhr) {
    return;
  }

  try
  {
    xhr.getAllResponseHeaders().split('\r\n').reduce(
      function(result, current) {
        var spl = current.split(': ');

        if (!spl[0] || !spl[1]) {
          return result;
        }

        result[spl[0]] = spl[1];

        return result;
      }, 
      this._headers
    );
  }
  catch (err) 
  {
    console.error(err);
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
