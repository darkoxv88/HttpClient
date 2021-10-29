export function HttpOnProgressEvent(type, loaded, total, partialText) {
  this.type = type;
  Object.freeze(this.type);

  this.loaded = loaded;
  Object.freeze(this.loaded);

  this.total = total;
  Object.freeze(this.total);

  this.partialText = partialText;
  Object.freeze(this.partialText);
}

HttpOnProgressEvent.prototype = { }
