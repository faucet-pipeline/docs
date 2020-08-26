import { assetURI } from "../../../../views/util";
import { createElement } from "complate-stream";

function TinyHeader({ shortName, relatedLinks }) {
	let logo = assetURI("faucet-logotype-monochrome.svg");

	return <header class="tiny-site-header">
		<a href="/">
			<img src={logo} alt={shortName} class="logo" />
		</a>

		{relatedLinks}
	</header>;
}

function BigHeader({ shortName, tagline }) {
	let logo = assetURI("faucet-logotype.png");
	let altLogo = assetURI("faucet-logotype.gif");

	return <header class="site-header">
		<p class="tagline">{tagline}</p>

		<div class="logo">
			<img src={logo} alt={shortName} data-src={altLogo} />
		</div>
	</header>;
}

export default function Header({ shortName, tagline, relatedLinks, tiny }) {
	return tiny ? <TinyHeader shortName={shortName} relatedLinks={relatedLinks}/> :
		<BigHeader shortName={shortName} tagline={tagline}/>;
}
