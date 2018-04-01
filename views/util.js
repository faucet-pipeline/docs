let manifest = require("./manifest.json"); // NB: relative to bundle

export function assetURI(filepath) {
	let res = manifest[filepath];
	if(!res) {
		throw new Error(`unknown asset: ${repr(filepath)}`);
	}
	return res;
}

export function repr(value) {
	return `\`${JSON.stringify(value)}\``;
}
