import { assetURI } from "../../../views/util";
import { shortName } from "../../../content/defaults";
import { Iconlist, Iconlink } from "../iconlist";
import { createElement } from "complate-stream";

let logo = assetURI("faucet-logotype-monochrome.svg");

export function Bar({ TagName }) {
	return <TagName class="bar">
		<a href="/">
			<img src={logo} alt={shortName} class="logo" width="144" height="35" />
		</a>

		<Iconlist>
			<Iconlink href="https://www.npmjs.com/package/faucet-pipeline-core"
				src={"npm.svg"} alt="npm" width="24" height="10" />

			<Iconlink href="https://github.com/faucet-pipeline"
				src={"github.svg"} alt="GitHub" width="24" height="33" />

			<Iconlink href="https://twitter.com/faucet_pipeline"
				src={"twitter.svg"} alt="Twitter" width="24" height="33" />
		</Iconlist>
	</TagName>;
}
