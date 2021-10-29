export function safeUriEncode(value) {
  try 
  {
    return encodeURIComponent(value);
  }
  catch (err)
  {
    return '';
  }
}

export function safeUriDecode(value) {
  try 
  {
    return decodeURIComponent(value)
  }
  catch (err)
  {
    return null;
  }

}
