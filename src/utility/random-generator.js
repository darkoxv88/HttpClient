export function randomStringIdGenerator(length) {
  if (typeof(length) !== 'number') {
    return '';
  }

  if (length < 1) {
    return '';
  }

  var charPool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  var str = '';

  for (var i = 0; i < length; i++) {
    str += charPool.charAt(Math.floor(Math.random() * charPool.length));
  }

  return str;
}
