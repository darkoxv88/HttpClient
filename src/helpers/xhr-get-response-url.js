export function getResponseUrl(xhr) {
  try
  {
    if (('responseURL' in xhr) && xhr.responseURL) {
      return xhr.responseURL;
    }
  
    if ((/^X-Request-URL:/m).test(xhr.getAllResponseHeaders())) {
      return xhr.getResponseHeader('X-Request-URL');
    }
  
    return '';
  }
  catch (err)
  {
    return '';
  }
}
