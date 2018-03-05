---
layout: default
title: faucet-pipeline-typescript
---

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
