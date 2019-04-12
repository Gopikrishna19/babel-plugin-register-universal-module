# babel-plugin-register-universal-module

A babel plugin to register a library on global with universal namespace.

[![Build Status](https://travis-ci.org/Gopikrishna19/babel-plugin-register-universal-module.svg?branch=master)](https://travis-ci.org/Gopikrishna19/babel-plugin-register-universal-module)

## Table of Contents

1. [Usage](#usage)
    1. [Options](#options)
1. [Examples](#examples)
1. [Output](#output)
1. [License](#license)

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

| Name | Required | Type | Default |
|---|---|---|---|
| [`entry`](#entry) | No | String or Array | `src/index.js` |
| [`libName`](#libname) | No | String or Array | `name` from `package.json` |
| [`prefix`](#prefix) | No | String or Array | `undefined` |
| [`version`](#version) | No | Boolean | `false` |

#### `entry`

This can be a String or an Array. By default it points to `src/index.js`. When multiple entries are provided, the plugin will try to
insert the registration code in all entries. This also extends the existing entry. Try [`version`](#version) option to avoid any
potential conflicts. See the output sample [output](#output) for inserted code.

Example 1:
```json
{ "entry": "./index.js" }
```

Example 2:
```json
{ "entry": [ "./src/entry1.js", "./src/entry2.js" ] }
```

#### `libName`

The namespace under which the module will be registered in `global`. The `global` can be either Node `global` or `window` of a browser,
is available in the scope will be chosen. The `libName` defaults to the package name. See the output sample [output](#output) for generated code.

Example 1:
```json
{ "libName": "my.library" }
```

Example 2:
```json
{ "libName": ["my", "library"] }
```

#### `prefix`

To scope different modules, a prefix can be used. Similar to the `libName`, this can also be a String or an Array.

For example:
```json
{ "prefix": "my.tools" }
```

And the library will be available at `global.my.tools.my.library`.

#### `version`

This is a Boolean set to avoid collisions when used in multiple versions of same library. For example, consider following dependency structure:

```
+ my-project
|
+--+-- dependency1
|  |
|  +-- my.libaray@1.0.0
|
+--+-- dependency2
   |
   +-- my.libarry@2.0.0
``` 

When `my-project` imports `dependency1` and `dependency2`, their transitive dependency `my.library` can override/extend each other. This may not be
a desired outcome. So the `version` option can be used to scope the exports. The version will be used from `package.json`.

When set to true, the library will be available at `global.my.library['1.0.0']`

## Examples

View [examples](examples) for different setups.

## Output

After babel transpiles the source code down to es5 (or env), this plugin will insert code in the `entry` file that will make the module 
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

## License

MIT License

Copyright (c) 2019 Gopikrishna Sathyamurthy

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
