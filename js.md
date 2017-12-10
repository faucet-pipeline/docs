---
layout: default
title: faucet-pipeline-js
---

The configuration is an array of bundles you want to create. Each entry of the
array is an object with at least two keys: `entryPoint` is the file that should
be compiled, and `target` is the file that should be created (the path is, of
course, modified a little when you use fingerprinting).

It also has a third, optional key `transpiler`. If you provide it, the pipeline
will transpile ES201* to ES3. You need to provide an object with a `transpiler`
key that has an array with features that you want to transpile as an argument.
You can also exclude modules of the bundle you don't want to transpile with
`exclude`. This is useful for dependencies that are already transpiled.

If you for example want to transpile from ES2015 to ES3, your configuration
might look like this:

```js
module.exports = {
    js: [{
        entryPoint: "./index.js",
        target: "./dist/bundle.js",
        transpiler: {
            features: ["es2015"],
            exclude: ["jquery"]
        }
    }]
};
```
