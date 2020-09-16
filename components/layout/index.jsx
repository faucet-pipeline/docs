import { assetURI } from "../../views/util";
import { createElement } from "complate-stream";

let stylesheets = [assetURI("bundle.css"), assetURI("prism.css")];
let scripts = [assetURI("prism.js")];

export default function DefaultLayout({ title, subtitle, docTitle }, ...children) {
	return <html>
		<head>
			<meta charset="utf-8" />
			<title>{docTitle}</title>
			{renderStyleSheets(stylesheets)}
		</head>

		<body>
			<header>
				<h1>{title}</h1>
				<p>{subtitle}</p>
			</header>

			<main>
				{children}

				{renderScripts(scripts)}
			</main>
		</body>
	</html>;
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
