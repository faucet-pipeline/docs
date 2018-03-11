import { assetURI } from "../../../../views/util";
import { createElement } from "complate-stream";

let logo = assetURI("faucet-logotype.png");
let altLogo = assetURI("faucet-logotype.gif");

export default function Header({ shortName, tagline }) {
	return <header class="site-header">
		<p class="tagline">{tagline}</p>

		<div class="logo">
			<img src={logo} alt={shortName} data-src={altLogo} />
		</div>
	</header>;
}
