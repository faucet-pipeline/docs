import { assetURI } from "../../../../views/util";
import { createElement } from "complate-stream";

export default function RelatedLinks() {
	return <nav class="related-links">
		<ImageLink href="https://www.npmjs.com/package/faucet-pipeline"
			src={"npm.svg"} alt="npm" />

		<ImageLink href="https://github.com/faucet-pipeline"
			src={"github.svg"} alt="GitHub" />

		<ImageLink href="https://twitter.com/faucet_pipeline"
			src={"twitter.svg"} alt="Twitter" />
	</nav>;
}

function ImageLink({ href, src, alt }) {
	return <a href={href}>
		<img src={assetURI(src)} alt={alt} />
	</a>;
}
