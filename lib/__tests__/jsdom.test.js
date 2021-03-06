var MochaMix = require('mocha-mix');
var expect = require('expect');
var plugin = require('../index');
MochaMix.use(plugin());

describe('mocha-mix-jsdom', function () {
  MochaMix.mix({
    rootDir: __dirname,
    import: '../index'
  });

  it('should prepare global window object', function () {
    expect(window).toExist();
  });

  it('should prepare global document object', function () {
    expect(document).toExist();
  });

  it('should clear global window object', function () {
    plugin.prepareJsdom();
    plugin.tearDownJsdom();
    expect(global.window).toNotExist();
  });

  it('should clear global window object', function () {
    plugin.prepareJsdom();
    plugin.tearDownJsdom();
    expect(global.document).toNotExist();
  });
});
