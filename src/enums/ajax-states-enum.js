import { enumValue } from "./../utility/enum-value";

function AjaxStates() {
  enumValue(this, 'Unknown', 0);
  enumValue(this, 'Opened', 1);
  enumValue(this, 'Pending', 2);
  enumValue(this, 'Aborted', 3);
  enumValue(this, 'Rejected', 4);
  enumValue(this, 'Fulfilled', 5);
}

AjaxStates.prototype = { };

export var AjaxStatesEnum = new AjaxStates();

Object.freeze(AjaxStatesEnum);
