"use strict";

let site = "./dist/site";

module.exports = {
	watchDirs: ["./lib", "./views"],
	manifest: {
		target: "./dist/manifest.json",
		key: "short",
		webRoot: site,
		baseURI: "./"
	},
	sass: [{
		source: "./lib/styles/index.scss",
		target: `${site}/bundle.css`
	}],
	js: [{
		source: "./views/index.jsx",
		target: "./dist/views.js",
		format: "cjs",
		moduleName: "render",
		jsx: { pragma: "createElement" }
	}],
	static: [{
		source: "./lib/images",
		target: `${site}/img`
	}, {
		source: "./lib/app.js",
		target: `${site}/app.js`
	}, {
		source: "prismjs/prism.js",
		target: `${site}/prism.js`
	}, {
		source: "prismjs/themes/prism.css",
		target: `${site}/prism.css`
	}]
};
