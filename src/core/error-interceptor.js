import { tryCatch } from "../utility/try-catch.js";
import { noop } from "../utility/noop.js";

export function ErrorInterceptor(callback) {
  if (typeof(callback) !== 'function') {
    callback = noop;
  }

  this._callback = tryCatch(callback, function(err) { });
}

ErrorInterceptor.prototype = { 
  _callback: null,

  proc: function(value) {
    this._callback(value);
  },
}

ErrorInterceptor.instance = new ErrorInterceptor(noop);

ErrorInterceptor.setInterceptor = function(interceptor) {
  ErrorInterceptor.instance = new ErrorInterceptor(noop);
}

ErrorInterceptor.intercept = function(value) {
  ErrorInterceptor.instance.proc(value);

  return value;
}
