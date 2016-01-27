# mocha-mix-jsdom

mocha-mix plugin to enable global `window` and `document` objects for server-side testing.

## Usage

```bash
npm install mocha-mix mocha-mix-jsdom --save-dev
```

```js
var MochaMix = require('mocha-mix');
var JsdomPlugin = require('mocha-mix-jsom');

MochaMix.use(JsdomPlugin);

// or

JsdomPlugin();
```
