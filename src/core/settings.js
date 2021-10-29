var allowNoneAsync = false;

export function getAllowNoneAsyncCalls() {
  return allowNoneAsync;
}

export function setAllowNoneAsyncCalls(value) {
  allowNoneAsync = !!(value);

  if (allowNoneAsync) {
    console.warn('Synchronous calls have been allowed');
  }
}
