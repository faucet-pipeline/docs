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
				src={"npm.svg"} alt="npm" />

			<Iconlink href="https://github.com/faucet-pipeline"
				src={"github.svg"} alt="GitHub" />

			<Iconlink href="https://twitter.com/faucet_pipeline"
				src={"twitter.svg"} alt="Twitter" />
		</Iconlist>
	</TagName>;
}
