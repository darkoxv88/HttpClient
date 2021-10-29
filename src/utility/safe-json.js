export function safeJsonParse(value) {
  try
  {
    if (typeof(value) !== 'string') {
      return null;
    }
    
    return JSON.parse(value);
  }
  catch (err)
  {
    return null;
  }
}

export function safeJsonStringify(value) {
  try
  {    
    return JSON.stringify(value);
  }
  catch (err)
  {
    return '';
  }
}
