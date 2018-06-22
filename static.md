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

If you only want to copy _some_ of the files, you can select them using a
`filter` function. That function will be called for every file, with its path
relative to `source`. Only files passing the test implemented by that function –
i.e. those for which the function returns `true` – will be copied.

In this example, we only copy `.ttf` fonts and omit images from the `templates`
directory:

```js
module.exports = {
    static: [{
        source: "./fonts",
        target: "./public/fonts",
        filter: file => file.endsWith(".ttf")
    }, {
        source: "./images",
        target: "./public/images",
        filter: file => !file.startsWith("templates/")
    }]
}
```
