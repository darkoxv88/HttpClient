import { tryCatch } from "../utility/try-catch.js";

export function ErrorInterceptor(callback) {
  if (typeof(callback) !== 'function') {
    callback = function() { };
  }

  this._callback = tryCatch(callback, function(err) { });
  Object.freeze(this._callback);
}

ErrorInterceptor.prototype = { 
  _callback: null,

  proc: function(value) {
    this._callback(value);
  },
}

ErrorInterceptor.instance = new ErrorInterceptor(function() { });

ErrorInterceptor.setInterceptor = function(interceptor) {
  ErrorInterceptor.instance = new ErrorInterceptor(function() { });
}

ErrorInterceptor.intercept = function(value) {
  ErrorInterceptor.instance.proc(value);

  return value;
}
