export function lambda(root, func) {
  if (typeof root !== 'object' || !root) {
    root = ({ });
  }

  if (typeof func !== 'function') {
    return function() { }
  }

  return function() {
    return func.apply(root, arguments);
  }
}
