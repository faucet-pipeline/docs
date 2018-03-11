import { assetURI } from "../../../../views/util";
import { createElement } from "complate-stream";

let logo = assetURI("faucet-logotype.png");

export default function Header({ shortName, tagline }) {
	return <header class="site-header">
		<p class="tagline">{tagline}</p>

		<div class="logo">
			<img src={logo} alt={shortName} />
		</div>
	</header>;
}
