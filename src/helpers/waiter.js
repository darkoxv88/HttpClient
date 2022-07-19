import { getPromiseConstructor } from "./promise-factory";

function exe(fn) {
  return fn.apply(this, [ ]);
}

var _isES6 = exe(function() { 
  try
  {
    eval('function* f(x = true) {yield x;} function n() {} function e(p = n) {p();} class A {get a(){return this._a;};constructor() {this._a=true}} class B extends A { constructor(){super();if(this.a)this.b();}b() {e((k = 5) => {this._b = f().next().value;});}}; new B();');
  
    return true;
  }
  catch(err)
  {
    return false;
  }
});

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

export function isES6() {
  return _isES6;
}

export function waiter(thisArg, generator) {
  try
  {
    thisArg = (typeof(thisArg) === 'object') ? thisArg : null;

    if (generator.constructor.name !== 'GeneratorFunction') {
      return;
    }
    
    lWaiter(thisArg, undefined, getPromiseConstructor(), generator);
  }
  catch(err)
  {
    return;
  }
}
