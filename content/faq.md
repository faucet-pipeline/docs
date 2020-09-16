title: Troubleshooting / FAQ

Here we want to address some common questions.

## I get an error when importing a third-party library. What can I do?

This typically happens when importing a module which has already been bundled or
otherwise provides a distribution – the solution is to skip transpilation there:

```javascript
module.exports = {
    js: [{
        source: "./index.js",
        target: "./dist/bundle.js",
        esnext: {
            // ...
            exclude: ["jquery"]
        }
    }]
}
```

(This is necessary, because faucet assumes we're consuming ES6 modules by
default)

## I get an error (ENOSPC) when watching files on Linux. What can I do?

You probably reached the maximum value for watched files in inotify. This is
probably due to your `node_modules` folder. You should restrict your watcher to
only the folders that contain your SCSS/JS source files. [See File Watching for
details](/watching).
