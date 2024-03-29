import { noop } from "../utility/noop.js";

export function ErrorInterceptor(callback) {
  if (typeof(callback) !== 'function') {
    callback = noop;
  }

  this._callback = callback;
}

ErrorInterceptor.prototype = { 
  emit: function(value) {
    try
    {
      this._callback(value);
    }
    catch(err)
    {
      console.error(err);
    }
  },
}

ErrorInterceptor.instance = new ErrorInterceptor(noop);

ErrorInterceptor.setInterceptor = function(interceptor) {
  ErrorInterceptor.instance = new ErrorInterceptor(interceptor);
}

ErrorInterceptor.intercept = function(value) {
  ErrorInterceptor.instance.emit(value);

  return value;
}
