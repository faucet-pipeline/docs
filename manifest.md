---
layout: default
title: Fingerprinting & Manifest
---

`faucet-pipeline` can fingerprint the generated files for you. That means that
it adds a hash of the file content to the file name. This allows you to cache
your files indefinitely to reduce the number of requests your clients need to
make.

When you fingerprint your files, you can no longer hard code the URIs in your
HTML as well as CSS. You need to have a way to look up the resulting URIs.
`faucet-pipeline` generates a so called manifest file for that purpose:

```json
{
    "output/example.css": "/assets/example.css"
}
```

The key is the path to where the file would have been written to without
fingerprinting. The value is the URI where the file can be found. You can
configure the manifest generation like this:

* `file` is the path to the manifest file.
* `baseURI` will prefix the URI. It defaults to `/`.
* `webRoot` is the path to the directory from which static files are served in
  your web app. It defaults to the directory that contains the config file.

For example, it might look like this:

```js
module.exports = {
    // configuration of your pipelines...

    manifest: {
        file: "./manifest.json",
        baseURI: "/assets",
        webRoot: "./output"
    }
}
```

The idea is that in your Web app you provide a helper that is provided with the
key and will return the value. You can then use it in your template engine so
that you can access the fingerprinted path. For existing integrations, see the
navigation.

For your Sass files, `faucet-pipeline-sass` automatically reads the manifest to
give you access to the static files like files and images. See [Sass](/sass) for
details on that.
