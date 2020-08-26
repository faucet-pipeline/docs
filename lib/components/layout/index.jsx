import SiteHeader from "./macros/header";
import SiteNavigation from "./macros/nav";
import SiteFooter from "./macros/footer";
import RelatedLinks from "./macros/related";
import { shortName, tagline } from "../../../content/defaults";
import { assetURI, repr } from "../../../views/util";
import { createElement, safe } from "complate-stream";

let layouts = new Set(["front-page"]);

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
	if(layout && !layouts.has(layout)) {
		throw new Error(`invalid page layout: ${repr(layout)}`);
	}

	// front page is baroque, other pages are tiny
	let tiny = layout !== "front-page";

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
			<link rel="preload" href={assetURI("titillium-web-bold.woff2")}
				as="font" type="font/woff2" crossorigin="anonymous"/>

			{renderStyleSheets(stylesheets)}

			{renderScripts(scripts)}
			<script async defer data-domain="faucet-pipeline.org"
				src="https://stats.innoq.com/js/index.js"/>
		</head>

		<body class={layout}>
			<a href="#main">skip to content</a>

			<SiteHeader shortName={shortName} tagline={safe(tagline)}
				tiny={tiny} relatedLinks=<RelatedLinks/>/>

			<section class="main-wrapper">
				<main id="main">
					{children}
				</main>

				<SiteNavigation currentSlug={slug} />
			</section>

			{tiny ? null : <SiteFooter shortName={shortName}>
				<RelatedLinks/>
			</SiteFooter>}
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
