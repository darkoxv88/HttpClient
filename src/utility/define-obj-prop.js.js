export function defineObjProp(ref, key, getter, setter) {
  var def = ({
    enumerable: true
  });

  if (typeof(getter) === 'function') {
    def['get'] = getter;
  }

  if (typeof(setter) === 'function') {
    def['set'] = setter;
  }

  Object.defineProperty(ref, key, def);
}
