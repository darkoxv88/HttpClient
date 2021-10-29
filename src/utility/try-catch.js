export function tryCatch(func, onError) {
  if (typeof func !== 'function') {
    return function() { }
  }

  return function() {
    try 
    {
      return func.apply(this, arguments);
    } 
    catch (e) 
    {
      if (typeof onError === 'function') {
        return onError(e);
      };

      return null;
    }
  }
}
