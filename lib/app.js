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
let video = document.querySelector("video");
if(video) {
	video.addEventListener("click", video.play.bind(video));
}
}());
