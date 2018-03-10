import DefaultLayout from "../components/layout";
import { name, claim } from "../content/defaults";
import { includeMarkdown as md } from "./util";
import { createElement } from "complate-stream";

export function SiteIndex() {
	return <DefaultLayout title={name} docTitle={claim}>
		{md("index")}
	</DefaultLayout>;
}
