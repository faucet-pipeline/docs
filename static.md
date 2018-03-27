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

If you only want to copy _some_ of the files,
you can select them using a `filter` function.
All files passing the test implemented by that function will be copied.
The function will be called for every file with its path relative to `source`.
If it returns `true`, the file will be copied,
otherwise it will not.

In this example,
we omit images in the `templates/` directory
and only copy `.ttf` fonts.

```js
module.exports = {
    static: [{
        source: "./images",
        target: "./public/images",
        filter: file => !file.startsWith("templates/")
    }, {
        source: "./fonts",
        target: "./public/fonts",
        filter: file => file.endsWith(".ttf")
    }]
}
```
