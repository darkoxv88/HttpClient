export function AjaxOptions() { }

AjaxOptions.prototype = {
  timeout: 60,
  responseType: '',
  withCredentials: false,
  params: null,
  delay: 0,
}

AjaxOptions.defineDelay = function(value) {
  if (typeof(value) !== 'number') {
    return 0;
  }

  if (value < 0) {
    return 0;
  }

  return value * 1000;
}

AjaxOptions.defineTimeout = function(value) {
  if (typeof(value) !== 'number') {
    return 60000;
  }

  if (value < 0) {
    return 60000;
  }

  return value * 1000;
}

AjaxOptions.defineResponseType = function(type) {
  if (typeof(type) !== 'string' || !type) {
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

    case 'text': {
      return type;
    }

    default: {
      return '';
    }
  }
}
