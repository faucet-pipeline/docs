import { assetURI } from "../../../../views/util";
import { createElement } from "complate-stream";

function TinyHeader({ shortName, relatedLinks }) {
	let logo = assetURI("faucet-logotype-monochrome.svg");

	return <header class="tiny-site-header">
		<a href="/">
			<img src={logo} alt={shortName} class="logo" width="144" height="35"/>
		</a>

		{relatedLinks}
	</header>;
}

function BigHeader({ shortName, tagline }) {
	let staticLogo = assetURI("logo.png");
	let animatedLogo = assetURI("logo.webm");

	return <header class="site-header">
		<strong class="tagline">{tagline}</strong>

		<div class="logo">
			<video width="512" height="512" loop poster={staticLogo}>
				<source src={animatedLogo} type="video/webm"/>
			</video>
		</div>
	</header>;
}

export default function Header({ shortName, tagline, relatedLinks, tiny }) {
	return tiny ? <TinyHeader shortName={shortName} relatedLinks={relatedLinks}/> :
		<BigHeader shortName={shortName} tagline={tagline}/>;
}
