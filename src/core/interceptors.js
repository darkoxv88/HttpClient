import { Callback } from "../utility/callback.js";

function Interceptor() {
  this.cb = new Callback();
}

Interceptor.prototype = { 
  setInterceptor: function(fn) {
    this.cb = new Callback(fn);
  },

  intercept: function(value) {
    this.cb.emit(value);

    return value;
  }
}

export var errorInterceptor = new Interceptor();

export var responseInterceptor = new Interceptor();
