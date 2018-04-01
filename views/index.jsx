import DefaultLayout from "../lib/components/layout";
import { fullName, claims } from "../content/defaults";
import Renderer, { createElement, safe } from "complate-stream";

let { registerView, renderView } = new Renderer();

registerView(render);

export default renderView;

function render({ slug, meta, html }) {
	let { title, layout } = meta;

	let docTitle = title ? `${title} | ${fullName}` : claims.default;
	let claim = docTitle === claims.default ? claims.alt : claims.default;

	return <DefaultLayout docTitle={docTitle} claim={claim} layout={layout}>
		{safe(html)}
	</DefaultLayout>;
}
