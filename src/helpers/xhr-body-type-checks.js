export function isArrayBuffer(value) {
  return (value ? true : false) && (value instanceof ArrayBuffer);
}

export function isBlob(value) {
  return (value ? true : false) && (value instanceof Blob);
}

export function isFormData(value) {
  return (value ? true : false) && (value instanceof FormData);
}

export function isUrlSearchParams(value) {
  return (value ? true : false) && (value instanceof URLSearchParams);
}
