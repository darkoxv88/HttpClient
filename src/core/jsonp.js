import { getRoot } from "../refs/root";
import { lambda } from "./../utility/lambda";
import { once } from "../utility/once.js";
import { randomStringIdGenerator } from "../utility/random-generator";
import { promiseFactory } from "./../helpers/promise-factory";
import { AjaxOptions } from "./ajax-options";
import { AjaxParams } from "./ajax-params";

var indexInUse = ({ });

function createTarget() {
  return (document.body ? document.body : document.head);
}

function generateIndex() { 
  var index = randomStringIdGenerator();

  if (indexInUse[index]) {
    return generateIndex();
  }

  indexInUse[index] = true;

  return index;
}

function removeIndex(index) {
  if (indexInUse[index]) {
    delete(indexInUse[index]);
  }
}

function getCallbackName(index) {
  return ('___jsonp_request_callback_' + index + '___');
}

function attachCallback(index, callback) {
  getRoot()['___jsonp_request_callback_' + index + '___'] = callback;
}

function detachCallback(index) {
  delete(getRoot()['___jsonp_request_callback_' + index + '___']);
}

export function JSONP(url, options, callbackParamName, callbackName) {
  this._index = generateIndex();
  this._url = (typeof(url) !== 'string' || !url) ? '' : url;
  this._script = document.createElement('script');

  if (typeof(options) !== 'object' || !options) {
    options = new AjaxOptions();
  }

  if (typeof(callbackParamName) !== 'string' || !(callbackParamName)) {
    callbackParamName = 'callback';
  }

  if (typeof(callbackName) === 'string' && !!(callbackName)) {
    this._index = callbackName;
  }

  this.params = new AjaxParams(options.params);

  this.asPromise = once(
    lambda(this, function() {
      this._promise = promiseFactory(
        lambda(this, function(resolve, reject) {
          this.params.deleteByKey(callbackParamName);
          this.params.append(callbackParamName, getCallbackName(this._index));

          this._script.src = this._url + '?' + this.params.toString();
          this._script.type = 'text/javascript';
          this._script.async = true;

          var __constFinalize__ = lambda(this, function() {
            detachCallback(this._index);

            if (this._script) {
              this._script.parentNode ? this._script.parentNode.removeChild(this._script) : null;
            }

            removeIndex(this._index);
          });

          attachCallback(this._index, lambda(this, function(data) {
            if (this._timer) {
              clearTimeout(this._timer);
            }

            __constFinalize__();

            resolve(data);
          }));

          this._script.onerror = lambda(this, function(ev) {
            if (this._timer) {
              clearTimeout(this._timer);
            }

            __constFinalize__();

            reject(ev);
          });

          setTimeout(
            lambda(this, function() {
              var target = createTarget();
              target.append(this._script);

              this._timer = setTimeout(
                lambda(this, function() { 
                  __constFinalize__();
    
                  reject(new Error('JSONP request canceled.'));
                }), 
                AjaxOptions.defineTimeout(options.timeout)
              );
            }),
            AjaxOptions.defineDelay(options.delay)
          );

          return;
        })
      );

      return this._promise;
    }),
    lambda(this, function() {
      return this._promise;
    })
  );
}

JSONP.prototype = {

  params: null,
  _index: '',
  _url: '',
  _script: null,
  _timer: null,
  _promise: null,

  fetch: function() { 
    return this.asPromise();
  },
  
}
