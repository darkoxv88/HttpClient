export function enumValue(ref, key, value) {
  Object.defineProperty(ref, key, { enumerable: true, get: function() { return value; } });
  Object.freeze(ref[key]);
}
