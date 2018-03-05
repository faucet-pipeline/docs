---
layout: default
title: faucet-pipeline-static
---

The configuration is an array of folders or single files you want to copy. Each
entry of the array is an object with two keys: `source` is the source folder,
and `target` is the target folder.

The resulting configuration might look something like this:

```js
module.exports = {
    static: [{
        source: "./images",
        target: "./public/images"
    }, {
        source: "./fonts",
        target: "./public/fonts"
    }]
};
```
