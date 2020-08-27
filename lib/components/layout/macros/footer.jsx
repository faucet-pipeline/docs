import { assetURI } from "../../../../views/util";
import { createElement } from "complate-stream";

let logo = assetURI("faucet-logotype-monochrome.svg");

export default function Footer({ shortName }, ...links) {
	return <footer class="site-footer">
		<a href="/">
			<img src={logo} alt={shortName} class="logo" width="144" height="35" />
		</a>

		{links}
	</footer>;
}
