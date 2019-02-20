---
layout: default
title: faucet-pipeline-js
---

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

## Compact
Hitherto, when you used the `--compact` flag, _faucet_ only removed empty lines
and comments from your JavaScript files. As of version 2.0, you can provide
various options for compression via an additional plugin,
called `faucet-pipeline-jsmin`. Install it and add the `compact` entry
to your configuration:

```js
module.exports = {
    js: [{
        source: "./index.js",
        target: "./dist/bundle.js",
        compact: "minify"
    }]
};
```

There you can choose between `minify` and `mangle`. Choose the first option
to have empty lines, comments and all whitespace removed from your file.
Choose the latter for the same result, with one addition:
variable names are mangled and shortened.
If you do not provide any `compact` option but still use the `--compact` flag,
you will preserve the previous behavior (and do not need to install
the plugin `faucet-pipeline-jsmin`).

