import loadPage from "./util/markdown";
import DefaultLayout from "../lib/components/layout";
import { fullName, claims } from "../content/defaults";
import Renderer, { Fragment, createElement, safe } from "complate-stream";
let path = require("path");

let CONFIG = "ssg.config.js";

let root = path.resolve(__dirname, ".."); // NB: relative to bundle
let { content, slugs } = readConfig(root);
let sourceDir = path.resolve(root, content.dir);
slugs = path.resolve(root, slugs);

slugs = require(slugs);

let { registerView, renderView } = new Renderer();

slugs.forEach(slug => {
	let filepath = path.resolve(sourceDir, `${slug}.md`);
	let view = _ => deferred(loadPage(filepath), render);
	registerView(view, slug);
});

export default renderView;

function render({ meta, html }) {
	let { title, layout } = meta;

	let docTitle = title ? `${title} | ${fullName}` : claims.default;
	let claim = docTitle === claims.default ? claims.alt : claims.default;

	return <DefaultLayout docTitle={docTitle} claim={claim} layout={layout}>
		{safe(html)}
	</DefaultLayout>;
}

function deferred(prom, fn) {
	return <Fragment>{callback => {
		prom.then(res => {
			let el = fn(res);
			callback(el);
		});
	}}</Fragment>;
}

function readConfig(referenceDir) {
	let filepath = path.resolve(referenceDir, CONFIG);
	return require(filepath);
}
