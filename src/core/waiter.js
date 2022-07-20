import { isES6 } from "../utility/is-es6";
import { getPromiseConstructor } from "../helpers/promise-factory";

var lWaiter = function (thisArg, _arguments, P, generator) {
  function adopt(value) { 
    return value instanceof P ? value : new P(function(resolve) { 
      resolve(value); 
    }); 
  }

  return new P(function(resolve, reject) {
    function fulfilled(value) { 
      try 
      { 
        step(generator.next(value)); 
      } 
      catch (e) 
      { 
        reject(e); 
      } 
    }

    function rejected(value) { 
      try 
      { 
        step(generator["throw"](value)); 
      } 
      catch (e) 
      { 
        reject(e); 
      } 
    }

    function step(result) { 
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); 
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

export function waiter(thisArg, generator) {
  try
  {
    if (isES6() === false) {
      return;
    }

    if (generator.constructor.name !== 'GeneratorFunction') {
      return;
    }

    thisArg = (typeof(thisArg) === 'object') ? thisArg : null;
    
    lWaiter(thisArg, undefined, getPromiseConstructor(), generator);
  }
  catch(err)
  {
    return;
  }
}
