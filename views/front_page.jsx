import DefaultLayout from "../components/layout";
import renderPage from "./util/markdown";
import { claim } from "../content/defaults";
import { Fragment, createElement, safe } from "complate-stream";

export function FrontPage() {
	return deferred(renderPage("front-page"), ({ meta, html }) => {
		let { title, layout } = meta;
		return <DefaultLayout title={title} docTitle={claim} layout={layout}>
			{safe(html)}
		</DefaultLayout>;
	});
}

function deferred(prom, fn) {
	return <Fragment>{callback => {
		prom.then(res => {
			let el = fn(res);
			callback(el);
		});
	}}</Fragment>;
}
