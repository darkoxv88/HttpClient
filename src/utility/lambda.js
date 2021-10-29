export function lambda(func, root) {
  if (typeof func !== 'function' || typeof root !== 'object') {
    return function() { }
  }

  return function() {
    return func.apply(root, arguments);
  }
}
