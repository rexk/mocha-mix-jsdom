// Set browser globals,
// This file needs to required before any react component is rendered
var jsdom = require('jsdom').jsdom;
var keys = [];
var isPrepared = false;

/**
 * prepareJsDom creates empty document using jsdom
 *
 * @see https://github.com/tmpvar/jsdom#how-it-works
 * @param {jsdom.Config}    options    options object for jsdom
 */
function prepareJsdom(options) {
  if (isPrepared) {
    return;
  }
  var jsdomOptions = options;
  var document = jsdom('<!DOCTYPE html><html><head></head><body></body></html>', jsdomOptions);
  var window = document.defaultView;
  global.window = window;
  for (var key in window) {
    if (key in global) {
      continue;
    }
    keys.push(key);
    global[key] = window[key];
  }
  isPrepared = true;
};

/**
 *
 * removes all global keys assigned to emulate DOM environment.
 */
function tearDownJsdom() {
  keys.forEach(function (key) {
    delete global[key];
  });
  keys = [];
  isPrepared = false;
  delete global.window;
};

module.exports = function JsdomPlugin(options) {
  // Expose jsdom
  prepareJsdom(options);
  return function noop() {};
};

module.exports.prepareJsdom = prepareJsdom;
module.exports.tearDownJsdom = tearDownJsdom;
