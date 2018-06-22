layout: front-page  

```cli
$ faucet --watch
```

**faucet-pipeline** takes care of **[pre-processing&nbsp;CSS](css.html)**,
**[compiling&nbsp;modern&nbsp;JavaScript](js.html)** and framework-independent
**[fingerprinting](manifest.html)** to take advantage of HTTP caching. It lets you
**[focus on source code](philosophy.html)** instead of complex, highly customized
build tools: With **minimal configuration** you can take advantage of the
front-end community's **established tooling**, without worrying about low-level
details.

Create a CSS bundle from [Sass](http://sass-lang.com) modules:

```javascript
    source: "./styles/index.scss",
    target: "./dist/bundle.css"
```

Bundle and transpile JavaScript:

```javascript
    source: "./src/index.js",
    target: "./dist/bundle.js",
    esnext: true // activates ES6 transpiler
```

Fingerprint arbitrary files, like fonts and images:

```javascript
    source: "./assets",
    target: "./dist/assets"
```


Getting Started
---------------

Let's start by setting up the [JavaScript](js.html) compiler. If you're
interested in [CSS](css.html) or [static files](static.html) instead, feel free
to head directly to the respective page.

```shell
$ npm install faucet-pipeline-esnext
```

Configuration resides in `faucet.config.js`:

```javascript
module.exports = {
    js: [{
        source: "./src/index.js",
        target: "./dist/bundle.js",
        esnext: true
    }]
};
```

Let's create two source files within the `src` directory, `index.js` and
`util.js`:

```javascript
import log from "./util";

log("info", "hello world");
```

```javascript
export default function log(level, message) {
    console.log(`[${level}]`, message);
}
```

Now we can compile our bundle:

```shell
$ npx faucet
```

(`npx` is merely a
[shortcut](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)
for commands in `./node_modules/.bin` -- though eventually you might want to
define [npm scripts](https://docs.npmjs.com/misc/scripts) within `package.json`
so you can `npm start`, for example.

That's it! We can now execute that bundle, either in a browser or via Node:

```shell
$ node dist/bundle.js
[info] hello world
```

The [JavaScript](js.html) page provides a more detailed explanation, including
configuration options.
