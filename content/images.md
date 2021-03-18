title: faucet-pipeline-images

**This pipeline is currently in beta**

Because this plugin is still in beta, you need to activate the plugin manually:

```js
module.exports = {
    // your regular configuration...

    // manual plugins
    plugins: [
        require("faucet-pipeline-images")
    ]
}
```

Please note that you need to add this configuration to each example below while
this plugin is in beta.

**Supported image formats:** JPG, PNG, SVG, AVIF and WebP

The configuration is an array of folders or single files you want to copy. Each
entry of the array is an object with at least two keys: `source` is the source
folder, and `target` is the target folder.

The resulting configuration might look something like this:

```js
module.exports = {
    images: [{
        source: "./images",
        target: "./public/images"
    }]
};
```

This will copy the images in the supported formats by default. The files will
automatically be optimized. By default, we will keep the input format as our
output format. AVIF and WebP are configured as lossy formats. JPGs use
[progressive scan](https://images.guide/#jpeg-compression-modes).

## Filtering

If you only want to process _some_ of the files, you can select them using a
`filter` function. That function will be called for every file, with its path
relative to `source`. Only files passing the test implemented by that function –
i.e. those for which the function returns `true` – will be copied.

In this example, we only optimize `.svg` files:

```js
module.exports = {
    images: [{
        source: "./images",
        target: "./public/images",
        filter: file => file.endsWith(".svg")
    }]
}
```

## Configuring the quality

You can also provide a quality as a value between 1 and 100.

```js
module.exports = {
    images: [{
        source: "./images",
        target: "./public/images",
        quality: 60
    }]
};
```

This will configure the quality of all lossy formats (all formats except PNG and
SVG). The quality is set to a 50 (AVIF/WebP) or 80 (PNG/JPG) by default.

## Change the output format

You can output the image in one of the supported formats.

```js
module.exports = {
    images: [{
        source: "./images",
        target: "./public/images",
        format: "webp"
    }]
};
```

Note that SVGs can be converted to all other formats. But converting a vector
image format to SVG will result in an error.

## Add a suffix

You can add a suffix to the output name:

```js
module.exports = {
    images: [{
        source: "./images",
        target: "./public/images",
        suffix: "-optimized"
    }]
};
```

This will output a file named `foo.png` as `foo-optimized.png`. This is
especially useful when resizing or scaling images as described in the next
section.

## Resizing and Scaling

To scale the images, you can provide a scaling factor. To create a version half
the size, with the suffix `-small` you can use the following configuration:

```js
module.exports = {
    images: [{
        source: "./images",
        target: "./public/images",
        scale: 0.5,
        suffix: "-small"
    }]
};
```

You can also provide a target width and/or height. By default, the pipeline
keeps the ratio and does not crop the image. If you provide both width and
height, they are used as maximum values. In the following example, we will
create files with the suffix `-thumbnail` with a maximum width of 300 and a
maximum height of 300, keeping the ratio.

```js
module.exports = {
    images: [{
        source: "./images",
        target: "./public/images",
        width: 300,
        height: 300,
        suffix: "-thumbnail"
    }]
};
```

You can also resize without keeping the ratio -- the resulting image will have
the exact dimension you specify. The image will be cropped vertically or
horizontally so that no empty space remains.

```js
module.exports = {
    images: [{
        source: "./images",
        target: "./public/images",
        width: 300,
        height: 300,
        crop: true,
        suffix: "-square"
    }]
};
```

## Autorotate

You can configure the pipeline to rotate images automatically according to their
EXIF data:

```js
module.exports = {
    images: [{
        source: "./images",
        target: "./public/images",
        autorotate: true
    }]
};
```
