title: Fingerprinting & Manifest


`faucet-pipeline` can fingerprint the generated files for you: It adds a hash of
the file content to the file name. You can cache files with a fingerprint
indefinitely, which reduces the number of requests your clients need to make. To
enable that, pass the `--fingerprint` option to the CLI.

When you fingerprint your files, you can no longer hard code the URIs in your
HTML and CSS. You need to have a way to look up the resulting URIs.
`faucet-pipeline` can generate a so-called manifest file for that purpose (see
configuration below for how to enable it): The key is an identifier for you to
find the file. The value is the URL where the files will be available.

The manifest could look like this:

```json
{
    "output/example.css": "/assets/example-123.css"
}
```

The idea is that in your Web app you provide a helper that is provided with the
key and will return the value. You can then use it in your template engine so
that you can access the fingerprinted path. For existing integrations, see the
navigation.

For your Sass files, `faucet-pipeline-sass` automatically reads the manifest to
give you access to the static files like files and images. See [Sass](/sass) for
details on that.

## Configuration

The generation of the manifest ist activated when you put the `manifest` key in
your configuration with an object at least containing a `file` option with a
path to where you want your manifest to go.

```
module.exports = {
    manifest: {
        target: "./path/to/manifest.json"
    }
}
```

By default, the generated manifest will have...

* The path to the generated file *without the fingerprint* relative to your
  configuration file as the **key**.
* The path to the generated file *with the fingerprint* relative to your
  configuration file with a `/` prefixed as the **value**.

If you want a shorter key, you can set `key` to `"short"`. They key will now be
relative to the respective `target` for each entry. In the case of a single
file that means you will only have the file name as the key. In the case of a
directory of files, the key will be relative to that directory.

You can also adjust the value: You can provide a `baseURI` to use something
other than `/`. You can provide a `webRoot` as a relative path to generate the
value relative to a different folder (in some frameworks that would be
`./public`, the folder that is used to serve static files).

Example:

```
module.exports = {
    manifest: {
        target: "./path/to/manifest.json",
        key: "short",
        baseURI: "/assets/",
        webRoot: "./target"
    }
}
```

## Advanced Configuration

You can manipulate both the key and the value with a function (you can provide
none, one or both):

The `key` function receives the path to the generated file *without the
fingerprint* relative to your configuration file and the target directory as its
input (Example: `"public/images/background/example.jpg"` and `"public/images"`).
The return value will be used as the key.

The `value` function receives the path to the generated file *with the
fingerprint* relative to your configuration file as its input (Example:
`"public/images/background/example-12345.jpg"` and `"public/images"`). The
return value will be used as the value.

The target directory is the `target` in the case of faucet-pipeline-static, and
the dirname of the `target` in the case of faucet-pipeline-js and
faucet-pipeline-sass.
