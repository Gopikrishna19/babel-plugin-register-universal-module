# babel-plugin-register-universal-module

A babel plugin to register a library on global with universal namespace.

## Usage

```bash
npm i babel-plugin-register-universal-module
```

```javascript
// babel.config.js
module.exports = {
  plugins: [
    /*...*/
    [
      'register-universal-module', {
        libName,
        entry,
        prefix
      }
    ]
  ]
}
```

### Options

| Name | Required | Type | Default | Definition | Example |
|---|---|---|---|---|---|
| `libName` | No | String or Array | Module name from `package.json` | The namespace under which the module will be registered in `global` | `['my', 'module']` |
| `entry` | No | String | `src/index.js` | The file where the registration is to be written | `src/my-lib-entry.js` |
| `repfix` | No | String or Array | `undefined` | Add a prefix to the module name | `my.scope` -> `my.scope.my.module` |

### Output

After babel transpiles `src` into `lib`, this plugin will insert code in the `entry` file that will make the module 
available in the global namespace. For example, with following setup,

```json
// package.json
{
  "name": "my-module"
}
```
```javascript
// babel.config.js
module.exports = {
  plugins: [
    /*...*/
    'register-universal-module'
  ]
}
```
```javascript
// src/index.js
import {MyLibrary} from './my-library';

export const MyLibrary = MyLibrary;
```

The output will be:
```javascript
// lib/index.js
"use strict";

var MyLibrary = require("./my-library").MyLibrary;

exports.__esModule = true;
exports.MyLibrary = MyLibrary;

(function(root) {
  root["test"] = root["test"] || {};
  root["test"]["module"] = typeof exports !== 'undefined' ? exports : {};
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this)
```

Thus enabling the consuming module to access this from `window.my.module`.
