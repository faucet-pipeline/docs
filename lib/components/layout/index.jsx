import SiteHeader from "./macros/header";
import SiteNavigation from "./macros/nav";
import SiteFooter from "./macros/footer";
import { shortName, tagline } from "../../../content/defaults";
import { assetURI, repr } from "../../../views/util";
import { createElement, safe } from "complate-stream";

let layouts = new Set(["front-page"]);

let stylesheets = [
	assetURI("bundle.css"),
	assetURI("prism.css"),
	"https://fonts.googleapis.com/css?family=Titillium+Web:400,700"
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

	return <html>
		<head>
			<meta charset="utf-8" />
			<title>{docTitle}</title>

			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="description" content={claim} />
			<link rel="icon" type="image/svg+xml"
				href={assetURI("favicon.svg")} sizes="any"/>

			{renderStyleSheets(stylesheets)}

			<script async defer data-domain="faucet-pipeline.org"
				src="https://stats.innoq.com/js/index.js"/>
		</head>

		<body class={layout}>
			<a href="#main">skip to content</a>

			<SiteHeader shortName={shortName} tagline={safe(tagline)} />

			<section class="main-wrapper">
				<main id="main">
					{children}
				</main>

				<SiteNavigation currentSlug={slug} />
			</section>

			<SiteFooter shortName={shortName}>
				{/* eslint-disable indent */}
				<ImageLink href="https://www.npmjs.com/package/faucet-pipeline"
						src={"npm.svg"} alt="npm" />

				<ImageLink href="https://github.com/faucet-pipeline"
						src={"github.svg"} alt="GitHub" />

				<ImageLink href="https://twitter.com/moonbeamlabs"
						src={"twitter.svg"} alt="Twitter" />
				{/* eslint-enable indent */}
			</SiteFooter>

			{renderScripts(scripts)}
		</body>
	</html>;
}

function ImageLink({ href, src, alt }) {
	return <a href={href}>
		<img src={assetURI(src)} alt={alt} />
	</a>;
}

function renderScripts(items) {
	return items.map(uri => {
		return <script src={uri} />;
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
