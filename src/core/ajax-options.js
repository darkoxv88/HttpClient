export function AjaxOptions() { }

AjaxOptions.prototype = {
  async: true,
  timeout: 60,
  responseType: 'json',
  withCredentials: false,
  params: null
}

AjaxOptions.defineTimeout = function(value, min) {
  if (typeof(value) !== 'number') {
    return 60;
  }

  if (value < 0) {
    return 60;
  }

  if (value < min) {
    return min;
  }

  return value;
}

AjaxOptions.defineResponseType = function(type) {
  if (typeof(type) !== 'string') {
    return 'text';
  }

  if (type === '') {
    return '';
  }

  type = type.toLowerCase();

  switch (type) {
    case 'arraybuffer': {
      return type;
    }

    case 'blob': {
      return type;
    }

    case 'document': {
      return type;
    }

    case 'json': {
      return type;
    }

    case 'ms-stream': {
      return type;
    }

    default: {
      return 'text';
    }
  }
}
