---
layout: default
title: faucet-pipeline-css
---

faucet-pipeline-css offers bundling for files written in CSS.

The configuration is an array of bundles you want to create. Each entry of the
array is an object with two keys: `source` is the file that should be
compiled, and `target` is the file that should be created (the path is, of
course, modified a little when you use fingerprinting):

```js
export const css = [{
    source: "./example.css",
    target: "./output/example.css"
}, {
    source: "./example2.css",
    target: "./output/subfolder/example2.css"
}];
```

## Fingerprinting

To support fingerprinting of images and fonts, use `faucet-pipeline-assets` to
fingerprint them. `faucet-pipeline-css` will automatically replace the URLs
passed to `url()` with the fingerprinted version:

```css
@font-face {
	font-family: "Titillium Web";
	font-weight: 400;
    /* in the resulting CSS, the following URL will be fingerprinted */
	src: url("titillium-web-regular.woff2") format("woff2");
	font-display: swap;
}
```

## Transform future syntax

transform: ["nesting"]

## Compacting

The created CSS puts each selector and declaration on its own line by default.
If you provide `--compact` to the CLI command, we will remove as many extra
whitespace as possible and write the entire stylesheet on a single line.
