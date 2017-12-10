---
layout: default
title: File Watching
---

You don't need to configure anything for file watching, you enable it with the
`--watch` CLI option. If you, however, want to be gentle your file watching
limit and your notebook charge, you might want to restrict file watching to
certain folders. Per default, it watches the entire folder the config file is
in. The configuration expects an array of strings. The strings are paths
relative to your configuration file. It might look like this:

```js
module.exports = {
    // configuration of your pipelines...

    watchDirs: ["./src", "./lib"]
}
```
