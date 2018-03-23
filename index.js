#!/usr/bin/env node
"use strict";

let path = require("path");

let CONFIG = "ssg.config.js";
let referenceDir = process.cwd(); // TODO: CLI option

let [command] = process.argv.slice(2);
switch(command) {
case "pages":
	generatePages();
	break;
case "slugs":
	generateSlugs();
	break;
default:
	console.error(`invalid command: \`${command}\``);
	process.exit(1);
}

function generatePages() {
	let generator = require("complate-ssg");

	let { target, slugs, views } = readConfig(referenceDir);
	let { manifest, bundle } = views;
	[target, slugs, manifest] = [target, slugs, manifest].
		map(filepath => path.resolve(referenceDir, filepath));

	manifest = require(manifest);
	bundle = path.resolve(target, manifest[bundle]);
	let generatePage = generator(referenceDir, bundle, { targetDir: target });

	require(slugs).forEach(slug => {
		generatePage(`${slug}.html`, slug);
	});
}

function generateSlugs() {
	let mkdirp = require("mkdirp");
	let fs = require("fs");

	let { content, slugs } = readConfig(referenceDir);
	let sourceDir = path.resolve(referenceDir, content.dir);
	let extension = content.markdown;
	let registry = path.resolve(referenceDir, slugs);

	slugs = fs.readdirSync(sourceDir).
		reduce((memo, filename) => {
			if(filename.endsWith(extension)) { // crude, but sufficient
				let slug = filename.substr(0, filename.length - extension.length);
				memo.push(slug);
			}
			return memo;
		}, []);
	mkdirp.sync(path.dirname(registry));
	fs.writeFileSync(registry, JSON.stringify(slugs));
}

function readConfig(referenceDir) {
	let filepath = path.resolve(referenceDir, CONFIG);
	return require(filepath);
}
