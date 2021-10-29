import { getRoot } from "./../refs/root";

import { lambda } from "./../utility/lambda";
import { tryCatch } from "./../utility/try-catch";

var localPromise = function(executor) {
  this._executor = tryCatch(executor);
  this._value = undefined;
  this._onFulfilled = tryCatch(null);
  this._onRejected = tryCatch(null);
  this._onFinally = tryCatch(null);
  this._state = 'PENDING';

  this._executor(
    lambda(function(value) {
      this._state = 'FULFILLED';
      this._value = value;
      this._onFulfilled(this._value);
      this._onFinally(this._value);
    }, this),
    lambda(function(value) {
      this._state = 'REJECTED';
      this._value = value;
      this._onRejected(this._value);
      this._onFinally(this._value);
    }, this)
  );
}

localPromise.prototype = {
  then: function(onFulfilled, onRejected) {
    this._onFulfilled = tryCatch(onFulfilled);
    this._onRejected = tryCatch(onRejected);

    if (this._state === 'FULFILLED') {
      this._onFulfilled(this._value);
    }

    if (this._state === 'REJECTED') {
      this._onRejected(this._value);
    }

    return this;
  },
  catch: function(onRejected) {
    this._onRejected = tryCatch(onRejected);

    if (this._state === 'REJECTED') {
      this._onRejected(this._value);
    }

    return this;
  },
  finally: function(onFinally) {
    this._onFinally = tryCatch(onFinally);

    if (this._state !== 'PENDING') {
      this._onFinally();
    }

    return this;
  },
}

if (typeof(getRoot()['Promise']) === 'function') {
  localPromise = getRoot()['Promise'];
}

export function promiseFactory(executor) {
  return new localPromise(executor);
}
