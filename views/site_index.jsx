import DefaultLayout from "../components/layout";
import { includeMarkdown as md } from "./util";
import { createElement } from "complate-stream";

export function SiteIndex() {
	let title = "faucet-pipeline";
	let subtitle = "no-nonsense asset pipeline for humans";

	return <DefaultLayout title={title} // eslint-disable-next-line indent
			subtitle={subtitle} docTitle={`${title} – ${subtitle}`}>
		{md("index")}
	</DefaultLayout>;
}
