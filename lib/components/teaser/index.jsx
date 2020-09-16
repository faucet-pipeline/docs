import { assetURI } from "../../../views/util";
import { tagline } from "../../../content/defaults";
import { createElement, safe } from "complate-stream";

export function Teaser() {
	let staticLogo = assetURI("logo.png");
	let animatedLogo = assetURI("logo.webm");

	return <header class="teaser">
		<strong class="tagline">{safe(tagline)}</strong>

		<div class="logo">
			<video width="512" height="512" loop poster={staticLogo}>
				<source src={animatedLogo} type="video/webm"/>
			</video>
		</div>
	</header>;
}
