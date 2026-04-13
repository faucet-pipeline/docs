---
layout: default
title: Build a Pipeline
---

You can add support for other file types or CSS/JS dialects by writing your own
pipeline. Here we present a quick hands-on tutorial and then a reference to the
parameters provided.

## Tutorial

Let's start by initializing a new npm repository for your pipeline, and add
`faucet-pipeline-core` as a dependency:

```
mkdir faucet-pipeline-example
cd faucet-pipeline-example
npm init -y
npm i --save faucet-pipeline-core
```

Adjust the type to be a `module` in the package.json; we have left the Stone
Age. Let's start by setting it up in an example faucet configuration
`faucet.config.js`:

```js
export const example = [{
	a: 1,
	b: 2
}];

export const plugins = [
	{
		key: "example",
		bucket: "static",
		plugin: function(config) {
			return function() {
				console.log(config);
			}
		}
	}
]
```

If you run `npx faucet` now, your output will be:

```
[ { a: 1, b: 2 } ]
```

The `plugins` that are exported are an array of additional plugins added to the
default ones that faucet knows about. Each entry is an object with a key, bucket
and plugin (we get back to buckets later). faucet will then check if in the
configuration there is a variable exported with the `key` you provided (in our
case, that would be `example`). If so, it will initialize your plugin function.
We expect that the plugin function has the following signature:

```javascript
export function plugin(pluginConfig, assetManager, options) {
    // initialize your pipeline

    return function(filepaths) {
        // run the pipeline
    }
}
```

The `pluginConfig` is whatever you write in the config file (in the example
above this would be `[{ a: 1, b: 2 }]` which explains the output).
The convention is to expect an array of tasks. Each of them is an object with a
`source` and a `target` plus any other things you need to configure. The other
two options are described below: [`assetManager`](#assetManager) and
[`options`](#Options).

The function should return a function that runs your pipeline. This function
takes an optional argument:

* If it is `undefined`, then run the pipeline.
* Otherwise, it is an array of paths. Only run the pipeline, if changes to these
    files can change your output.

## Skeleton

This is the skeleton of the `index.js` of your plugin:

```javascript
// the key that is exported in faucet.config.js
export const key = "example";

// the bucket - see below
export const bucket = "static";

// your plugin
export function plugin(pluginConfig, assetManager, options) {
    // initialize your pipeline

    return function(filepaths) {
        // run the pipeline
    }
}
```

As a user of the plugin, you can then use it like this in your
`faucet.config.js`:

```js
import * as examplePlugin from "...";

export const example = [{
	a: 1,
	b: 2
}];

export const plugins = [ examplePlugin ];
```

## Buckets

You also need to choose one of our four "buckets". It is a categorization of the
pipelines that determines the order in which they will be run. You have the
choice between the following buckets – the choice depends on the kind of files
that your pipeline generates:

* static: Static files like images or fonts
* scripts: JavaScript/WebAssembly files
* styles: CSS files
* markup: HTML files

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

## Options

`options` is an object with the following keys derived from the CLI invocation:

* `sourcemaps` is a boolean that indicates if you should add sourcemaps to your
    generated output.
* `compact` is a boolean that indicates if the user wants a compact output
    format or not.

