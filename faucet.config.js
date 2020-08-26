"use strict";

let site = "./dist/site";
let titillium = "./node_modules/@openfonts/titillium-web_latin/files";

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
		fingerprint: false,
		format: "CommonJS",
		jsx: { pragma: "createElement" }
	}],
	static: [{
		source: "./lib/images",
		target: `${site}/img`
	}, {
		source: `${titillium}/titillium-web-latin-400.woff2`,
		target: `${site}/fonts/titillium-web-regular.woff2`
	}, {
		source: `${titillium}/titillium-web-latin-700.woff2`,
		target: `${site}/fonts/titillium-web-bold.woff2`
	}, {
		source: "./lib/app.js",
		target: `${site}/app.js`
	}, {
		source: "prismjs/prism.js",
		target: `${site}/prism.js`
	}]
};
