"use strict";

let root = "./dist";

module.exports = {
	content: {
		dir: "./content",
		markdown: ".md"
	},
	target: `${root}/site`,
	slugs: `${root}/slugs.json`,
	views: { // corresponds to `faucet.config.js` settings
		manifest: `${root}/manifest.json`,
		bundle: "views.js"
	}
};
