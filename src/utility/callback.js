import { noop } from "./noop"

export function Callback(fn) {
  if (typeof(fn) !== 'function') {
    fn = noop;
  }

  this._fn = fn;
}

Callback.prototype = {
  emit: function(v1, v2, v3) {
    try
    {
      this._fn(v1, v2, v3);
    }
    catch(err)
    {
      console.error(err);
    }
  },
}
