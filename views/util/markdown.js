let colonParse = require("metacolon");
let commonmark = require("commonmark");

export default function renderPage(filepath) {
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
