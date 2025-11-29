export function once(onFirstCall, onMultipleCalls) {
  var hasBeenCalled = false;

  return function() {
    if (hasBeenCalled) {
      if (typeof(onMultipleCalls) === 'function') {
        return onMultipleCalls.apply(this, arguments);
      }

      return;
    }

    hasBeenCalled = true;

    if (typeof(onFirstCall) === 'function') {
      return onFirstCall.apply(this, arguments);
    }
  }
}
