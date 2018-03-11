import Header from "./macros/header";
import Nav, { NavGroup, NavLink } from "./macros/nav";
import Footer from "./macros/footer";
import { name, shortName, tagline, claim } from "../../../content/defaults";
import { assetURI, repr } from "../../../views/util";
import { createElement, safe } from "complate-stream";

let layouts = {
	"front-page": true
};

let stylesheets = [
	assetURI("bundle.css"),
	assetURI("prism.css"),
	"https://fonts.googleapis.com/css?family=Titillium+Web:400,700"
];
let scripts = [
	assetURI("prism.js"),
	assetURI("app.js")
];

export default function DefaultLayout({ title, docTitle, layout },
		...children) {
	if(!layouts[layout]) {
		throw new Error(`invalid page layout: ${repr(layout)}`);
	}

	return <html>
		<head>
			<meta charset="utf-8" />
			<title>{docTitle || `${title} | ${name}`}</title>

			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="description" content={claim} />

			{renderStyleSheets(stylesheets)}
		</head>

		<body class={layout}>
			<Header shortName={shortName} tagline={safe(tagline)} />

			<section class="main-wrapper">
				<Nav>
					<NavLink href="/" selected>Introduction</NavLink>
					<NavLink href="/cli">Command-Line Interface</NavLink>
					<NavLink href="/manifest">Fingerprinting & Manifest</NavLink>
					<NavLink href="/watching">File Watching</NavLink>

					<NavGroup label="Pipelines">
						<NavLink href="/js">JavaScript</NavLink>
						<NavLink href="/typescript">TypeScript</NavLink>
						<NavLink href="/sass">Sass</NavLink>
						<NavLink href="/static">Static</NavLink>
					</NavGroup>

					<NavGroup label="Integration">
						<NavLink href="/rails">Rails</NavLink>
						<NavLink href="/spring-boot">Spring Boot</NavLink>
					</NavGroup>

					<NavGroup label="Contributing">
						<NavLink href="/contributing">In General</NavLink>
						<NavLink href="/build-pipeline">Build a Pipeline</NavLink>
						<NavLink href="/build-integration">Build an Integration</NavLink>
					</NavGroup>

					<NavLink href="/faq">Troubleshooting / FAQ</NavLink>
					<NavLink href="/background">Background & Sponsors</NavLink>
				</Nav>

				<main id="main">
					{children}

					{renderScripts(scripts)}
				</main>
			</section>

			<Footer shortName={shortName}>
				{/* eslint-disable indent */}
				<ImageLink href="https://www.npmjs.com/package/faucet-pipeline"
						src={"npm.svg"} alt="npm" />

				<ImageLink href="https://github.com/faucet-pipeline"
						src={"github.svg"} alt="GitHub" />

				<ImageLink href="https://twitter.com/moonbeamlabs"
						src={"twitter.svg"} alt="Twitter" />
				{/* eslint-enable indent */}
			</Footer>
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
