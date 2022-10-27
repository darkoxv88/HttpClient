export function safeJsonStringify(value) {
  try
  {    
    return JSON.stringify(value);
  }
  catch (err)
  {
    console.error(err);
    
    return '';
  }
}
