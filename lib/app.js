(function() {

// code highlighting, adding Prism-specific class
// (necessary because Markdown only supports this for code blocks)
let nodes = document.querySelectorAll("p > code");
Array.prototype.forEach.call(nodes, function(node) {
	if(!node.hasAttributes()) {
		node.className = "language-generic";
	}
});

// animated logo
let header = document.querySelector(".site-header");
let logo = header.querySelector("img[data-src]");
header.style.cursor = "pointer"; // XXX: hard-coded
header.addEventListener("click", function(ev) {
	// swap image URIs
	let attribs = ["src", "data-src"];
	let uris = attribs.map(function(attr) {
		return logo.getAttribute(attr);
	});
	attribs.push(attribs.shift()); // swap
	attribs.forEach(function(attr, i) {
		logo.setAttribute(attr, uris[i]);
	});

	// XXX: hard-coded
	let value = "transparent";
	header.style.background = header.style.backgroundColor === value ? "" : value;
});

}());
