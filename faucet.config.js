"use strict";

let site = "./dist/site";

module.exports = {
	watchDirs: ["./components", "./styles", "./views"],
	manifest: {
		target: "./dist/manifest.json",
		key: "short",
		webRoot: site,
		baseURI: "./"
	},
	sass: [{
		source: "./styles/index.scss",
		target: `${site}/bundle.css`
	}],
	js: [{
		source: "./views/index.js",
		target: "./dist/views.js",
		format: "cjs",
		moduleName: "render",
		jsx: { pragma: "createElement" }
	}],
	static: [{
		source: "./styles/img",
		target: `${site}/img`
	}, {
		source: "prismjs/prism.js",
		target: `${site}/prism.js`
	}, {
		source: "prismjs/themes/prism.css",
		target: `${site}/prism.css`
	}]
};
