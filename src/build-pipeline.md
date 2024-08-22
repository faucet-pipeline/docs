---
layout: default
title: Build a Pipeline
---

If you want to support other JS dialects or CSS preprocessors, you can
contribute an additional pipeline to the project. We recommend that you read the
source for the
[faucet-pipeline-static](https://github.com/faucet-pipeline/faucet-pipeline-static)
project. It is the simplest of the existing pipelines, because it just copies
file from one place to another.

## Registering your pipeline

The faucet-pipeline project has a list of known pipelines that it automatically
requires and initializes. When you write a new plugin it won't be on that list.
In this case, you need to configure faucet to load your plugin. In your
faucet.config.js you put:

```javascript
module.exports = {
  name: [{
    a: 1,
    b: 2
  }]

  plugins: {
    name: {
      plugin: path.resolve("./path/to/your/plugin"),
      bucket: "chosen-bucket"
    }
  }
}
```

With this configuration, your plugin with the name `name` will be loaded from
the provided path when running `faucet`. You also need to choose one of our four
"buckets". It is a categorization of the pipelines that determines the order in
which they will be run. You have the choice between the following buckets – the
choice depends on the kind of files that your pipeline generates:

* static: Static files like images or fonts
* scripts: JavaScript/WebAssembly files
* styles: CSS files
* markup: HTML files

expect your main module to export a function with the following signature:

```javascript
module.exports = function(pluginConfig, assetManager, options) {
}
```

The `pluginConfig` is whatever you write in the config file (in the example
above this would be `[{ a: 1, b: 2 }]`). The convention is to expect an array of
tasks. Each of them is an object with a `source` and a `target` plus any other
things you need to configure. The assetManager will be described below in its
own section. `options` is an object with the following keys:

* `browsers` is the detected [browserslist](https://github.com/ai/browserslist).
    Learn more about it in the `browsers` section.
* `sourcemaps` is a boolean that indicates if you should add sourcemaps to your
    generated output (applies to JS and CSS only)
* `compact` is a boolean that indicates if the user wants a compact output
    format or not.

This function should return a function that runs your pipeline. This function
takes an optional argument:

* If it is undefined, then run the pipeline
* Otherwise, it is an array of paths. Only run the pipeline, if changes to these
    files can change your output.

## assetManager

The assetManager helps you to write files to disk. It will make sure that your
file is fingerprinted (if the user asked for that) and that it will be added to
the manifest (if the user asked for that). All you need to do is to provide the
path where it should be written (without the fingerprint) and the content as a
buffer:

```javascript
assetManager.writeFile(targetPath, content);
```

As a third argument, it takes an optional object with the following keys:

* `error`: If any errors occur during a run, you can signal that to
    faucet-pipeline with an error object. In the case of a compile run it will
    lead to aborting the compilation and raising the error. When watching, it
    will be displayed on the console. If your pipeline produces JS or CSS files
    you could still output JS or CSS in the form of an error output.
* `target`: If your pipeline takes a folder as its `target`, provide it to
    writeFile function. If you produce a single file per bundle, you don't need
    to do that.

The assetManager can also resolve paths for you. If your user provides a path in
the configuration (for example the source and target), you can pass it to this
function to receive the absolute path to that file. If the user provides a
relative path, it will be relative to the configuration file. If they provide an
absolute path, it will be sourced from the installed packages. If you want to
disallow the second option, pass `{ enforceRelative: true }` as the second
argument to the function.

```javascript
let source = assetManager.resolvePath(copyConfig.source);
let target = assetManager.resolvePath(copyConfig.target, {
    enforceRelative: true
});
```

You can also receive entries from the manifest like this:

```javascript
assetManager.manifest.get(name)
```

## browsers

`browsers` is the detected [browserslist](https://github.com/ai/browserslist).
It is an object with keys for each browserslist. Your plugin can ignore this
when it doesn't produce code that needs to be modified due to supported
browsers.

If no browserslist was detected, the object will be empty. If one was detected,
it contains at least the browserslist `"default"` which you should default to.
You can allow users to ignore the browserslist for one of the bundles or choose
another browserslist. The convention for the name of that options is
`browserslist`. An example for an implementation could look like this:

```javascript
let selectedBrowsers;
let { browserslist } = bundleConfig;
if(browserslist === false) {
    selectedBrowsers = null;
} else if(browserslist) {
    selectedBrowsers = browsers[browserslist];
} else {
    selectedBrowsers = browsers.defaults;
}
```
