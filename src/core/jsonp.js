import { getRoot } from "../refs/root";
import { once } from "../utility/once.js";
import { randomStringIdGenerator } from "../utility/random-generator";
import { Observer } from "../helpers/observer.js";
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

  var self = this;

  this.request = once(
    function() {
      self._subscription = Observer.for(function(resolve, reject) {
        self.params.deleteByKey(callbackParamName);
        self.params.append(callbackParamName, getCallbackName(self._index));

        self._script.src = self._url + '?' + self.params.toString();
        self._script.type = 'text/javascript';
        self._script.async = true;

        var __constFinalize__ = function() {
          detachCallback(self._index);

          if (self._script) {
            self._script.parentNode ? self._script.parentNode.removeChild(self._script) : null;
          }

          removeIndex(self._index);
        }

        attachCallback(self._index, function(data) {
          if (self._timer) {
            clearTimeout(self._timer);
          }

          resolve(data);
        });

        self._script.onload = function() {
          __constFinalize__();
        }

        self._script.onerror = function(ev) {  
          if (self._timer) {
            clearTimeout(self._timer);
          }

          __constFinalize__();

          reject(ev);
        }

        setTimeout(
          function() {
            createTarget().append(self._script);

            self._timer = setTimeout(
              function() { 
                __constFinalize__();
    
                reject(new Error('JSONP request canceled.'));
              }, 
              AjaxOptions.defineTimeout(options.timeout)
            );
          },
          AjaxOptions.defineDelay(options.delay)
        );

          return;
      });

      return this._subscription;
    },
    function() {
      return self._subscription;
    }
  );
}

JSONP.prototype = { }
