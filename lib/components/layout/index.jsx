import { Teaser } from "../teaser";
import { Navigation } from "../navigation";
import { Bar } from "../bar";
import { SkipLink } from "../skip";
import { assetURI, repr } from "../../../views/util";
import { createElement } from "complate-stream";

let layouts = new Set(["baroque", "tiny"]);

let stylesheets = [
	assetURI("bundle.css")
];
let scripts = [
	assetURI("prism.js"),
	assetURI("app.js")
];

export default function DefaultLayout({ docTitle, claim, layout, slug }, ...children) {
	if(!docTitle) {
		throw new Error("missing document title");
	}
	if(!layout) {
		layout = "tiny";
	}
	if(!layouts.has(layout)) {
		throw new Error(`invalid page layout: ${repr(layout)}`);
	}

	return <html lang="en">
		<head>
			<meta charset="utf-8" />
			<title>{docTitle}</title>

			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="description" content={claim} />
			<link rel="icon" type="image/svg+xml"
				href={assetURI("favicon.svg")} sizes="any"/>
			<link rel="preload" href={assetURI("titillium-web-regular.woff2")}
				as="font" type="font/woff2" crossorigin="anonymous"/>
			<link rel="preload" href={assetURI("titillium-web-italic.woff2")}
				as="font" type="font/woff2" crossorigin="anonymous"/>
			<link rel="preload" href={assetURI("titillium-web-bold.woff2")}
				as="font" type="font/woff2" crossorigin="anonymous"/>

			{renderStyleSheets(stylesheets)}

			{renderScripts(scripts)}
			<script async defer data-domain="faucet-pipeline.org"
				src="https://stats.innoq.com/js/index.js"/>
		</head>

		<body>
			<SkipLink href="#main"/>

			{ layout === "tiny" ? <Bar TagName="header"/> : <Teaser/> }

			<section class="layout">
				<main id="main">
					{children}
				</main>

				<Navigation currentSlug={slug} />
			</section>

			{ layout === "baroque" ? <Bar TagName="footer"/> : null }
		</body>
	</html>;
}

function renderScripts(items) {
	return items.map(uri => {
		return <script src={uri} async />;
	});
}

function renderStyleSheets(items) {
	return items.map(stylesheet => {
		if(stylesheet.hash) {
			var { uri, hash } = stylesheet; // eslint-disable-line no-var
		} else { // string
			uri = stylesheet;
		}

		/* eslint-disable indent */
		return <link rel="stylesheet" href={uri}
				integrity={hash} crossorigin="anonymous" />;
		/* eslint-enable indent */
	});
}
