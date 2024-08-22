---
layout: default
title: faucet-pipeline-css
---

faucet-pipeline-css offers bundling for files written in CSS.

**Note that this module is in beta**

To enable this **beta module** you need to add the following lines to your
faucet.config.js:

```
module.exports = {
    // ...
    plugins: [
        require("faucet-pipeline-css")
    ]
}
```

The configuration is an array of bundles you want to create. Each entry of the
array is an object with two keys: `source` is the file that should be
compiled, and `target` is the file that should be created (the path is, of
course, modified a little when you use fingerprinting):

```js
module.exports = {
    css: [{
        source: "./example.css",
        target: "./output/example.css"
    }, {
        source: "./example2.css",
        target: "./output/subfolder/example2.css"
    }]
};
```

To support fingerprinting of images and fonts, use `faucet-pipeline-static` to
fingerprint them. Then you can use the `asset-url` function in your CSS files
to get the correct path. It expects a key from the manifest as its argument, and
outputs an `url()` with the value from the manifest. For example:

```css
@font-face {
	font-family: "Titillium Web";
	font-weight: 400;
	src: asset-url("titillium-web-regular.woff2") format("woff2");
	font-display: swap;
}
```

If you want to add vendor prefixes to your resulting CSS automatically,
`faucet-pipeline-css` includes
[`autoprefixer`](https://github.com/postcss/autoprefixer) to do that. It is only
activated if it finds a [`browserslist`](https://github.com/ai/browserslist)
configuration (for example `.browserslistrc`) in your project and prefix
according to your target browsers.

If you don't want to prefix your CSS even though you have a Browserslist
configuration, you can deactivate it per bundle:

```js
module.exports = {
    css: [{
        source: "./example.scss",
        target: "./output/example.css",
        browserslist: false
    }]
};
```

If you use groups in your Browserslist, faucet-pipeline uses the `default` group
by default. If you want to choose a different one, you can, for example, set it to
"legacy" like this:

```js
module.exports = {
    css: [{
        source: "./example.scss",
        target: "./output/example.css",
        browserslist: "legacy"
    }]
};
```

## Compacting

The created CSS puts each selector and declaration on its own line by default.
If you provide `--compact` to the CLI command, we will remove as many extra
whitespace as possible and write the entire stylesheet on a single line.
