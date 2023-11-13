import { getRoot } from "./../refs/root";
import { lambda } from "./../utility/lambda";
import { tryCatch } from "./../utility/try-catch";

function catchedError(err) {
  console.error(err);
}

function asAsync(proc) {
  setTimeout(proc, 1);
}

var PromiseEventEmitter = function() {
  this.listeners = [];
}

PromiseEventEmitter.prototype = {
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

var state = Symbol("promiseState");
var value = Symbol("promiseValue");
var error = Symbol("promiseError");
var onFulfilledEmitter = Symbol("promiseOnFulfilled");
var onRejectedEmitter = Symbol("promiseOnRejected");
var onFinallyEmitter = Symbol("promiseOnFinally");

var LocalPromise = function(executor) {
  this[state] = const_PENDING;
  this[value] = undefined;
  this[error] = undefined;
  this[onFulfilledEmitter] = new PromiseEventEmitter();
  this[onRejectedEmitter] = new PromiseEventEmitter();
  this[onFinallyEmitter] = new PromiseEventEmitter();

  var resolve = lambda(this, function(value) {
    if (this[state] !== const_PENDING) {
      return;
    } 

    this[state] = const_FULFILLED;
    this[value] = value;
    this[onFulfilledEmitter].emit(this[value]);
    this[onFinallyEmitter].emit(undefined);
  });

  var reject = lambda(this, function(err) {
    if (this[state] !== const_PENDING) {
      return;
    }

    this[state] = const_REJECTED;
    this[error] = err;
    this[onRejectedEmitter].emit(this[error]);
    this[onFinallyEmitter].emit(undefined);
  });

  var executor = tryCatch(executor, reject);

  asAsync(
    lambda(this, function() {
      executor(resolve, reject);
    })
  );
}

LocalPromise.prototype = {
  then: function(onFulfilled, onRejected, onFinally) {
    this[onFulfilledEmitter].addListener(onFulfilled);

    if (this[state] === const_FULFILLED) {
      this[onFulfilledEmitter].emit(this[value]);
    }

    return this.catch(onRejected, onFinally);
  },

  catch: function(onRejected, onFinally) {
    this[onRejectedEmitter].addListener(onRejected);

    if (this[state] === const_REJECTED) {
      this[onRejectedEmitter].emit(this[error]);
    }

    return this.finally(onFinally);
  },

  finally: function(onFinally) {
    this[onFinallyEmitter].addListener(onFinally);

    if (this[state] !== const_PENDING) {
      this[onFinallyEmitter].emit(undefined);
    }
  },
}

if (typeof(getRoot()['Promise']) === 'function') {
  LocalPromise = getRoot()['Promise'];
}

export function promiseFactory(executor) {
  return new LocalPromise(executor);
}
