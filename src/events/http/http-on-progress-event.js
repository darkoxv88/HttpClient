export function HttpOnProgressEvent(type, processed, total, partialText) {
  this.type = type;
  Object.freeze(this.type);

  this.processed = processed;
  Object.freeze(this.processed);

  this.total = total;
  Object.freeze(this.total);

  this.partialText = partialText;
  Object.freeze(this.partialText);
}

HttpOnProgressEvent.prototype = { }
