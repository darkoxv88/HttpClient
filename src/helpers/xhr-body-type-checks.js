export function isArrayBuffer(value) {
  return !!(value) && (value instanceof ArrayBuffer);
}

export function isBlob(value) {
  return !!(value) && (value instanceof Blob);
}

export function isFormData(value) {
  return !!(value) && (value instanceof FormData);
}

export function isUrlSearchParams(value) {
  return !!(value) && (value instanceof URLSearchParams);
}
