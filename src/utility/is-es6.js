import { getRoot } from "../refs/root";

var _isES6 = false;

try
{
  getRoot().eval(
    'function* f(x = true) {yield x;} function n() {} function e(p = n) {p();} class A {get a(){return this._a;};constructor() {this._a=true}} class B extends A { constructor(){super();if(this.a)this.b();}b() {e((k = 5) => {this._b = f().next().value;});}}; new B();'
  );

  _isES6 = true;
}
catch(err)
{
  _isES6 = false;
}

export function isES6() {
  return _isES6;
}
