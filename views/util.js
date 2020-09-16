import { safe } from "complate-stream";
let commonmark = require("commonmark");
let fs = require("fs");
let path = require("path");

let manifestPath = path.resolve(__dirname, "../dist/manifest.json");
let manifest = require(manifestPath);

export function assetURI(filepath) {
	let res = manifest[filepath];
	if(!res) {
		throw new Error(`unknown asset: \`${filepath}\``);
	}
	return res;
}

export function includeMarkdown(filename) {
	let filepath = path.resolve(__dirname, `../content/${filename}.md`);
	let txt = fs.readFileSync(filepath, "utf8");
	return renderMarkdown(txt);
}

export function renderMarkdown(txt) {
	let reader = new commonmark.Parser();
	let parsed = reader.parse(txt);

	let writer = new commonmark.HtmlRenderer({ smart: true, safe: true });
	let html = writer.render(parsed);
	return safe(html);
}
