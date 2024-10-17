import { noop } from "./noop"

export function Callback(fn) {
  if (typeof(fn) !== 'function') {
    fn = noop;
  }

  this._fn = fn;
}

Callback.prototype = {
  emit: function(value) {
    try
    {
      this._fn(value);
    }
    catch(err)
    {
      console.error(err);
    }
  },
}
