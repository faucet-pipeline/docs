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
					<NavGroup label="Introduction">
						<NavLink href="index.html" selected>About faucet</NavLink>
						<NavLink href="philosophy.html">Motivation & Philosophy</NavLink>
					</NavGroup>

					<NavLink href="cli.html">Command-Line Interface</NavLink>

					<NavLink href="sass.html">CSS / Sass</NavLink>

					<NavGroup label="JavaScript">
						<NavLink href="js.html">ES5 & ES6+</NavLink>
						<NavLink href="typescript.html">TypeScript</NavLink>
						<NavLink href="jsx.html">JSX</NavLink>
					</NavGroup>

					<NavLink href="static.html">Static Files</NavLink>

					<NavLink href="manifest.html">Fingerprinting & Manifest</NavLink>
					<NavLink href="browsers.html">Browserslist</NavLink>

					<NavGroup label="Framework Integration">
						<NavLink href="rails.html">Ruby on Rails</NavLink>
						<NavLink href="spring.html">Spring Framework</NavLink>
					</NavGroup>

					<NavGroup label="Community">
						<NavLink href="faq.html">Frequently Asked Questions</NavLink>
						<NavLink href="contributing.html">Contributing</NavLink>
						<NavLink href="alternatives.html">Alternatives</NavLink>
						<NavLink href="background.html">Background & Sponsors</NavLink>
					</NavGroup>
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
