title: faucet-pipeline-js

The configuration is an array of bundles you want to create. Each entry of the
array is an object with at least two keys: `source` is the file that should
be compiled, and `target` is the file that should be created (the path is, of
course, modified a little when you use fingerprinting).


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
faucet-pipeline-jsmin in addition to faucet-pipeline-js v2.0.


## TypeScript

To use typescript, you need to install the `faucet-pipeline-typescript` package.
The configuration is an array of bundles you want to create. Each entry of the
array is an object with at least two keys: `source` is the file that should
be compiled, and `target` is the file that should be created (the path is, of
course, modified a little when you use fingerprinting). You also need to set
`typescript` to true for the bundles that should be compiled with TypeScript:

```
module.exports = {
    js: [{
        source: "./src/index.ts",
        target: "./dist/bundle.js",
        typescript: true
    }]
};
```
