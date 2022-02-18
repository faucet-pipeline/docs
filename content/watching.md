title: File Watching

You don’t need to configure anything for file watching; you enable it with the
`--watch` CLI option. However, if you want to be gentle with your file watching
limit and your notebook charge, you might want to restrict file watching to
specific folders. By default, it watches the entire folder that contains the
config file. The configuration expects an array of strings. The strings are
paths relative to your configuration file. It might look like this:

```js
module.exports = {
    // configuration of your pipelines...

    watchDirs: ["./src", "./lib"]
}
```
