---
layout: default
title: faucet-pipeline-static
---

The configuration is an array of folders or single files you want to copy. Each
entry of the array is an object with two keys: `source` is the source folder,
and `target` is the target folder.

The resulting configuration might look something like this:

```js
export const static = [{
    source: "./images",
    target: "./public/images"
}, {
    source: "./fonts",
    target: "./public/fonts"
}];
```

If you only want to copy _some_ of the files, you can select them using a
`filter` function. That function will be called for every file, with its path
relative to `source`. Only files passing the test implemented by that function –
i.e. those for which the function returns `true` – will be copied.

In this example, we only copy `.ttf` fonts and omit images from the `templates`
directory:

```js
export const static = [{
    source: "./fonts",
    target: "./public/fonts",
    filter: file => file.endsWith(".ttf")
}, {
    source: "./images",
    target: "./public/images",
    filter: file => !file.startsWith("templates/")
}];
```

## Compact

**Note that for compressing images, [we have an image plugin](/images).**

By default, faucet-pipeline-static only copies files, even if the `--compact`
flag is provided. If you want to compact files, provide the `compact` option in
your configuration. It is an object that maps file extensions to functions. The
functions are expected to receive a buffer as their only argument, returning
either a buffer or a promise wrapped around a buffer. The resulting buffer is
the compacted version of the provided buffer.

A common use case is compressing images. The following configuration is a good
starting point:
If you prefer to compact your images on your own, you could for example use
[imagemin-mozjpeg](https://github.com/imagemin/imagemin-mozjpeg) to compress all
JPGs:

```js
export const static = [{
	source: "./src",
	target: "./dist",
	compact: {
		jpg: require("imagemin-mozjpeg")({ quality: 80 })
	}
}];
```
