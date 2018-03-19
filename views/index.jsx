import loadPage from "./util/markdown";
import DefaultLayout from "../lib/components/layout";
import { fullName, claims } from "../content/defaults";
import Renderer, { Fragment, createElement, safe } from "complate-stream";

let { registerView, renderView } = new Renderer();

let pages = ["front-page", "philosophy"];
pages.forEach(pageName => {
	let view = _ => deferred(loadPage(pageName), render);
	registerView(view, pageName);
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
