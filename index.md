---
layout: default
title: faucet-pipeline
---

**tl;dr: faucet-pipeline is a framework-independent, pluggable asset pipeline
that takes the pain out of preprocessing JavaScript, CSS and associated files
(e.g. images or fonts). It simplifies the process of converting modern
JavaScript (ES6) to support older browsers (ES5), or Sass to CSS - eliminating
typical low-level configuration nightmares.**

## Getting Started

* Run `npm init` if you don't have a `package.json` yet
* Install:

    ```sh
    npm install --save\
        faucet-pipeline-js\
        faucet-pipeline-sass\
        faucet-pipeline-static
    ```

* Configure with `faucet.config.js`:

    ```javascript
    module.exports = {
        js: [{
            source: "./index.js",
            target: "./public/app.js"
        }],
        sass: [{
            source: "./index.scss",
            target: "./public/app.css"
        }],
        static: [{
            source: "./images",
            target: "./public/images"
        }]
    };
    ```

* Compile:

    ```
    $ node_modules/.bin/faucet
    ```

## What does it do?

With the configuration above, you will:

* Compile the JS file `index.js` with all its imports to a single file. For more
  info, see [`faucet-pipeline-js`](/js).
* Compile the Sass file `index.scss` with all its imports to a single file. For
  more info, see [`faucet-pipeline-sass`](/sass).
* Copy all the files within `images` to another folder. For more info, see
  [`faucet-pipeline-static`](/static).

faucet-pipeline relies on established tooling rather than reinventing the wheel,
but provides a greatly simplified, unified interface with reasonable defaults.
Each of these tasks is called a pipeline. They are all optional, only use those
that you need. In addition:

* You can also fingerprint the files and be able to reference them from your Web
  framework of choice using manifests. For more info, see
  [Fingerprinting & Manifest](/manifest).
* Watch for file changes and run the pipeline for the files that changed. For
  more info, see [File Watching](/watching).
