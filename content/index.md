layout: front-page  

```cli
$ faucet --watch
```

* [CSS, Sass etc.](css.html)
* [JavaScript (ES6)](js.html)
* [JSX, TypeScript etc.](js.html)
* [image optimization](images.html)
* [fingerprinting](fingerprintng.html)
* [framework integration](frameworks.html)

**faucet-pipeline** takes care of **[pre-processing&nbsp;CSS](css.html)**,
**[compiling&nbsp;modern&nbsp;JavaScript](js.html)** and framework-independent
**[fingerprinting](manifest.html)** to take advantage of HTTP caching. It lets you
**[focus on source code](philosophy.html)** instead of complex, highly customized
build tools: With **minimal configuration** you can take advantage of the
front-end community's **established tooling**, without worrying about low-level
details.

Creating a CSS bundle from [Sass](http://sass-lang.com) modules:

```javascript
    source: "./styles/index.scss",
    target: "./dist/bundle.css"
```

Bundling and transpiling JavaScript:

```javascript
    source: "./src/index.js",
    target: "./dist/bundle.js",
    esnext: true // activates ES6 transpiler
```

Fingerprinting arbitrary files, like fonts and images:

```javascript
    source: "./assets",
    target: "./dist/assets"
```


Getting Started
---------------

In order to avoid unnecessary bloat, you're only required to install the
functionality you actually need. Let's start with some [JavaScript](js.html):

```shell
$ npm install faucet-pipeline-esnext
```

Configuration resides in `faucet.config.js` – in this case, we want to transpile
modern JavaScript (ES6) to backwards-compatible ES5:

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
for commands in `node_modules/.bin` -- you might also define
[npm scripts](https://docs.npmjs.com/misc/scripts) to use `npm start`, for
example.)

That's it! We can now execute that bundle, either in a browser or via Node:

```shell
$ node dist/bundle.js
[info] hello world
```

The [JavaScript docs](js.html) provide a more detailed explanation, including
configuration options. You might also be interested in [CSS](css.html),
[images](images.html), [static files](static.html) or
[fingerprinting](fingerprinting.html).
