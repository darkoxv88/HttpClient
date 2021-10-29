export function once(onFirstCall, onMultipleCalls) {
  var lHasBeenCalled = false;

  return function() {
    if (lHasBeenCalled) {
      if (typeof(onMultipleCalls) === 'function') {
        return onMultipleCalls.apply(this, arguments);;
      }

      return;
    }

    lHasBeenCalled = true;

    if (typeof(onFirstCall) === 'function') {
      return onFirstCall.apply(this, arguments);
    }
  }
}
