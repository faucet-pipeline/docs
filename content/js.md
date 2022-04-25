title: faucet-pipeline-js

The configuration is an array of bundles you want to create. Each entry of the
array is an object with at least two keys: `source` is the file that should
be compiled, and `target` is the file that should be created (the path is, of
course, modified a little when you use fingerprinting).


## Format and Modules

By default, faucet builds your JavaScript bundle as an [IIFE](https://en.wikipedia.org/wiki/Immediately_invoked_function_expression). You can also configure your
bundle to output a different module format like ESM (your choices are: `iife`,
`esm`, `umd`, `amd`, and `commonjs`):

```js
module.exports = {
    js: [{
        source: "./index.js",
        target: "./dist/bundle.js",
        format: "esm"
    }]
};
```

If you chose a module format that does not support importing/exporting natively
(i.e. `iife` or `umd`), the `exports` option determines the name of the global
variable under which the source module's export will be exposed.

If your source code references an external library which you don't want
included in the bundle - typically because its API is provided as a global
variable - you can declare that library to be "external":
faucet:

```js
module.exports = {
    js: [{
        source: "./index.js",
        target: "./dist/bundle.js",
        externals: {
            jquery: "jQuery"
        }
    }]
};
```

With this configuration, importing `from "jquery"` will be rewritten to
reference the global variable `jQuery` in the output file. In your files, you
can use it as if it would be installed as an npm package:

```js
import { jQuery } from "jquery";
```


## Sourcemaps

When you provide the `--sourcemaps` command-line option to faucet, all
JavaScript files include an inline sourcemap. If you want to deactivate
sourcemap generation for one of your bundles, you can set the option `sourcemap`
for that bundle to false.


## Compacting

faucet-js offers three options to reduce a bundle's file size:
`faucet --compact` will strip comments and empty lines by default.
More extreme reductions can be activated via the bundle's `compact` setting:

```js
module.exports = {
    js: [{
        source: "./index.js",
        target: "./dist/bundle.min.js",
        compact: "minify"
    }, {
        source: "./index.js",
        target: "./dist/bundle.mangled.js",
        compact: "mangle"
    }]
};
```

`minify` will additionally remove all non-significant whitespace, `mangle`
will rewrite the source code to shorten variable names. Either setting
will only take effect with the `--compact` CLI flag and both require
the `faucet-pipeline-jsmin` package in addition to `faucet-pipeline-js`.


## Transpilation

You can also transpile modern JS to JavaScript that works in older browsers. To
use that, you need to install `faucet-pipeline-esnext` instead of
`faucet-pipeline-js`. In addition, you set `esnext` to `true` for each bundle
that you want to transpile. You also need a [`browserslist`
file](https://github.com/ai/browserslist/) to specify which browsers you want to
support. This is an example configuration:

```js
module.exports = {
    js: [{
        source: "./index.js",
        target: "./dist/bundle.js",
        esnext: true
    }]
};
```

You can also deactivate the automatic browserslist detection:

```js
module.exports = {
    js: [{
        source: "./index.js",
        target: "./dist/bundle.js",
        esnext: {
            browserslist: false
        }
    }]
};
```

If your browserslist is configured for multiple
[environments](https://github.com/browserslist/browserslist#configuring-for-different-environments),
you can choose which one to use for each bundle:

```js
module.exports = {
    js: [{
        source: "./index.js",
        target: "./dist/bundle.js",
        esnext: {
            browserslist: "default"
        }
    }, {
        source: "./index.js",
        target: "./dist/legacy.js",
        esnext: {
            browserslist: "legacy"
        }
    }]
};
```

You can also exclude modules of the bundle you don't want to transpile with
`exclude`. This is useful for dependencies that are already transpiled:

```js
module.exports = {
    js: [{
        source: "./index.js",
        target: "./dist/bundle.js",
        esnext: {
            exclude: ["jquery"]
        }
    }]
};
```


## TypeScript

To use TypeScript, you need to install the `faucet-pipeline-typescript` package.
You also need to set `typescript` to true for the bundles that should be
compiled with TypeScript:

```js
module.exports = {
    js: [{
        source: "./src/index.ts",
        target: "./dist/bundle.js",
        typescript: true
    }]
};
```

Everything described above will still work in the same way (all configuration
options are available - including transpilation, compacting etc.).


## JSX

To use JSX, you need to install the `faucet-pipeline-jsx` package. You also
need to set `jsx` to true for the bundles that should be compiled with JSX:

```js
module.exports = {
    js: [{
        source: "./src/index.ts",
        target: "./dist/bundle.js",
        jsx: true
    }]
};
```

Everything described above will still work in the same way (all configuration
options are available - including transpilation, compacting etc.).

If you want to set the pragma or fragment to something different than React, you
can provide an object with the keys `pragma` and `fragment` to `jsx`.
