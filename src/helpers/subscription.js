import { getRoot } from "../refs/root";
import { tryCatch } from "../utility/try-catch";

function catchedError(err) {
  console.error(err);
}

function asAsync(proc) {
  setTimeout(proc, 1);
}

var EventEmitter = function() {
  this.listeners = [];
}

EventEmitter.prototype = {
  addListener: function(fn) {
    this.listeners.push(tryCatch(fn, catchedError));
  },

  emit: function(value) {
    while (this.listeners.length > 0) {
      var listener = this.listeners.shift();

      listener(value);
    }
  }
}

var const_PENDING = 0;
var const_FULFILLED = 1;
var const_REJECTED = 2;

export var Subscription = function(executor) {
  var state = const_PENDING;
  var value = undefined;
  var error = undefined;
  var onFulfilledEmitter = new EventEmitter();
  var onRejectedEmitter = new EventEmitter();
  var onFinallyEmitter = new EventEmitter();

  var resolve = function(value) {
    if (state !== const_PENDING) {
      return;
    } 

    state = const_FULFILLED;
    value = value;
    onFulfilledEmitter.emit(value);
    onFinallyEmitter.emit(undefined);
  }

  var reject = function(err) {
    if (state !== const_PENDING) {
      return;
    }

    state = const_REJECTED;
    error = err;
    onRejectedEmitter.emit(error);
    onFinallyEmitter.emit(undefined);
  }

  this.then = function(onFulfilled, onRejected, onFinally) {
    onFulfilledEmitter.addListener(onFulfilled);

    if (state === const_FULFILLED) {
      onFulfilledEmitter.emit(value);
    }

    return this.catch(onRejected, onFinally);
  }

  this.catch = function(onRejected, onFinally) {
    onRejectedEmitter.addListener(onRejected);

    if (state === const_REJECTED) {
      onRejectedEmitter.emit(error);
    }

    return this.finally(onFinally);
  }

  this.finally = function(onFinally) {
    onFinallyEmitter.addListener(onFinally);

    if (state !== const_PENDING) {
      onFinallyEmitter.emit(undefined);
    }

    return this;
  }

  var executor = tryCatch(executor, reject);

  asAsync(function() {
    executor(resolve, reject);
  });
}

Subscription.prototype = { 
  toPromise: function() {
    if (typeof(getRoot()['Promise']) === 'function') {
      var self = this;

      return (new Promise(function(res, rej) {
        self.then(res, rej);
      }));
    }

    return this;
  }
}

Subscription.from = function(executor) {
  return new Subscription(executor);
}
