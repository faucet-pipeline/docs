let colonParse = require("metacolon");
let commonmark = require("commonmark");
let path = require("path");

export default function renderPage(filename) {
	let filepath = resolvePath(filename);
	return colonParse(filepath).
		then(({ headers, body }) => ({
			meta: headers,
			html: renderMarkdown(body)
		}));
};

function renderMarkdown(txt) {
	let reader = new commonmark.Parser({ smart: true });
	let parsed = reader.parse(txt);

	let writer = new commonmark.HtmlRenderer({ safe: true });
	return writer.render(parsed);
}

function resolvePath(filename) {
	// NB: relative to bundle
	return path.resolve(__dirname, `../content/${filename}.md`);
}
