import { enumValue } from "../utility/enum-value";

function getUpperCasePositions(inputString) {
  var positions = [];

  for (var i = 0; i < inputString.length; i++) {
    if(inputString[i].match(/[A-Z]/) != null) {
      positions.push(i);
    }
  }

  return positions;
}

function defineCode(target, text, code) {
  enumValue(target, text, code);

  var positions = getUpperCasePositions(text);
  for (var i = 0; i < positions.length; i++) {
    if(i === 0) {
      continue;
    }

    var pos = positions[i] + (i - 1);

    text = text.slice(0, pos) + ' ' + text.slice(pos);
  }
  
  enumValue(target, code, text);
}

function HttpStatusCode() {
  defineCode(this, 'Continue', 100);
  defineCode(this, 'SwitchingProtocols', 101);
  defineCode(this, 'Processing', 102);
  defineCode(this, 'EarlyHints', 103);
  defineCode(this, 'Ok', 200);
  defineCode(this, 'Created', 201);
  defineCode(this, 'Accepted', 202);
  defineCode(this, 'NonAuthoritativeInformation', 203);
  defineCode(this, 'NoContent', 204);
  defineCode(this, 'ResetContent', 205);
  defineCode(this, 'PartialContent', 206);
  defineCode(this, 'MultiStatus', 207);
  defineCode(this, 'AlreadyReported', 208);
  defineCode(this, 'ImUsed', 226);
  defineCode(this, 'MultipleChoices', 300);
  defineCode(this, 'MovedPermanently', 301);
  defineCode(this, 'Found', 302);
  defineCode(this, 'SeeOther', 303);
  defineCode(this, 'NotModified', 304);
  defineCode(this, 'UseProxy', 305);
  defineCode(this, 'Unused', 306);
  defineCode(this, 'TemporaryRedirect', 307);
  defineCode(this, 'PermanentRedirect', 308);
  defineCode(this, 'BadRequest', 400);
  defineCode(this, 'Unauthorized', 401);
  defineCode(this, 'PaymentRequired', 402);
  defineCode(this, 'Forbidden', 403);
  defineCode(this, 'NotFound', 404);
  defineCode(this, 'MethodNotAllowed', 405);
  defineCode(this, 'NotAcceptable', 406);
  defineCode(this, 'ProxyAuthenticationRequired', 407);
  defineCode(this, 'RequestTimeout', 408);
  defineCode(this, 'Conflict', 409);
  defineCode(this, 'Gone', 410);
  defineCode(this, 'LengthRequired', 411);
  defineCode(this, 'PreconditionFailed', 412);
  defineCode(this, 'PayloadTooLarge', 413);
  defineCode(this, 'UriTooLong', 414);
  defineCode(this, 'UnsupportedMediaType', 415);
  defineCode(this, 'RangeNotSatisfiable', 416);
  defineCode(this, 'ExpectationFailed', 417);
  defineCode(this, 'ImATeapot', 418);
  defineCode(this, 'MisdirectedRequest', 421);
  defineCode(this, 'UnprocessableEntity', 422);
  defineCode(this, 'Locked', 423);
  defineCode(this, 'FailedDependency', 424);
  defineCode(this, 'TooEarly', 425);
  defineCode(this, 'UpgradeRequired', 426);
  defineCode(this, 'PreconditionRequired', 428);
  defineCode(this, 'TooManyRequests', 429);
  defineCode(this, 'RequestHeaderFieldsTooLarge', 431);
  defineCode(this, 'UnavailableForLegalReasons', 451);
  defineCode(this, 'InternalServerError', 500);
  defineCode(this, 'NotImplemented', 501);
  defineCode(this, 'BadGateway', 502);
  defineCode(this, 'ServiceUnavailable', 503);
  defineCode(this, 'GatewayTimeout', 504);
  defineCode(this, 'HttpVersionNotSupported', 505);
  defineCode(this, 'VariantAlsoNegotiates', 506);
  defineCode(this, 'InsufficientStorage', 507);
  defineCode(this, 'LoopDetected', 508);
  defineCode(this, 'NotExtended', 510);
  defineCode(this, 'NetworkAuthenticationRequired', 511);
}

HttpStatusCode.prototype = { };

export var httpStatusCodesEnum = new HttpStatusCode();

Object.freeze(httpStatusCodesEnum);
