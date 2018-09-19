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

## Compact

By default, faucet-pipeline-static only copies files, even if the `--compact`
flag is provided. If you want to compact files, provide the `compact` option in
your configuration. It is an object that maps file extensions to functions. The
functions are expected to receive a buffer as their only argument, returning
either a buffer or a promise wrapped around a buffer. The resulting buffer is
the compacted version of the provided buffer. Example:

```js
module.exports = {
	static: [{
		source: "./src",
		target: "./dist",
		compact: {
			svg: require("imagemin-svgo")()
		}
    }]
};
```

In this example, all files that have `svg` as their file extension, will be
compated with [svgo](https://github.com/svg/svgo). `imagemin-svgo` is a package
that provides a function that follows this convention, like all other packages
from the [imagemin project](https://github.com/imagemin).

If you want to compact your images, you can use a preselected number of plugins
by installing `faucet-pipeline-images` instead of `faucet-pipeline-static` and
using the following configuration:

```js
module.exports = {
	static: [{
		source: "./src",
		target: "./dist",
		compact: "images"
	}]
};
```

This will compact all PNGs, JPGs and SVGs with tools that we currently consider
a good trade-off between speed and resulting file size.
