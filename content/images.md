title: faucet-pipeline-images

**A new, more powerful image pipeline is in beta. This describes the current
version.**

The configuration is an array of folders or single files you want to copy. Each
entry of the array is an object with two keys: `source` is the source folder,
and `target` is the target folder.

The resulting configuration might look something like this:

```js
module.exports = {
    images: [{
        source: "./images",
        target: "./public/images"
    }]
};
```

This will simply copy the images (all JPG, PNG, SVG, GIF and WebP files per
default). If you provide the `--compact` flag as a CLI option, it will
additionally reduce their filesizes. By default, it follows the recommendations
from [Essential Image Optimization](https://images.guide) for JPG, PNG and SVG
(GIFs and WebP files will just be copied). You can customize this however by
providing different plugins. A plugin is a function that takes a buffer of an
image file and returns a promise for a buffer of an image file. This is true
for all [imagemin plugins](https://github.com/imagemin). So if you want to use
guetzli for your JPG images, you can configure it like this (you also need to
install `imagemin-guetzli` as a dependency):

```js
module.exports = {
    images: [{
        source: "./src",
        target: "./dist",
        plugins: {
            jpg: require("imagemin-guetzli")(),
            png: require("imagemin-pngquant")(),
            svg: require("imagemin-svgo")()
        }
    }]
};
```

You can also change the pattern for files that should be copied by providing
the `filter` option: This is supposed to be a function that receives a filepath
and returns true if the path should be included.
