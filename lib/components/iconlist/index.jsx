import { assetURI } from "../../../views/util";
import { createElement } from "complate-stream";

export function Iconlist(props, ...icons) {
	return <nav class="iconlist">
		{ icons }
	</nav>;
}

export function Iconlink({ href, src, alt }) {
	return <a href={href}>
		<img src={assetURI(src)} alt={alt} />
	</a>;
}
