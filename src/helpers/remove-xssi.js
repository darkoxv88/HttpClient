var XSSI_prefixRegEx = /^\)\]\}',?\n/;

export function removeXSSI(str) {
  return str.replace(XSSI_prefixRegEx, '');
}
