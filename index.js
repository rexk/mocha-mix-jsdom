// Set browser globals,
// This file needs to required before any react component is rendered
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
  var jsdom = require('jsdom').jsdom;
  var document = jsdom('<!DOCTYPE html><html><head></head><body></body></html>', jsdomOptions);
  var window = document.parentWindow || document.defaultView;
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
 * @return {[type]} [description]
 */
function tearDownJsdom() {
  keys.forEach(function (key) {
    delete global[key];
  });
  keys = [];
  isPrepared = false;
  delete global.window;
};

module.exports = function (mochaMix) {
  mochaMix.before(function () {
    prepareJsdom();
  });
  mochaMix.after(function () {
    tearDownJsdom();
  });
};

module.exports.prepareJsDom = prepareJsdom;
module.exports.tearDownJsdom = tearDownJsdom;
