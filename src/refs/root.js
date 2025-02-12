var root = typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : ({ });

export function getRoot() {
  return root;
}

export function toRoot(exports) {
  if (typeof(exports) !== 'object' || !exports) {
    return;
  }

  Object.keys(exports).forEach((item) => {
    root[item] = exports[item];
  });
}
