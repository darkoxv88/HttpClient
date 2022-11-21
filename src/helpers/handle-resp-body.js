import { removeXSSI } from "./remove-xssi";

export function handleRespBody(body, respType) {
  switch (respType) {
    case 'arraybuffer': {
      if (!(body) || !(body instanceof ArrayBuffer)) {
        console.warn('Response type "arraybuffer" expects the respons to be ArrayBuffer.');
      }

      break;
    }

    case 'blob': {
      if (!(body) || !(body instanceof Blob)) {
        console.warn('Response type "blob" expects the respons to be Blob.');
      }

      break;
    }

    case 'text': {
      if (!(body) || typeof(body) !== 'string') {
        console.warn('Response type "text" expects the respons to be string.');
      }

      break;
    }

    case 'json': {
      if (!(body) || typeof(body) !== 'string') {
        body = null;

        break;
      }

      try
      {
        body = removeXSSI(body);

        body = JSON.parse(body);
      }
      catch (err)
      {
        console.error('Could not parse the given response => ', err);

        body = null;
      }

      break;
    }

  }

  return body;
}
