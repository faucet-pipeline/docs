import "$styles/index.css"
import "$styles/syntax-highlighting.css"
import components from "$components/**/*.{js,jsx,js.rb,css}"

// animated logo
let video = document.querySelector("video");
if(video) {
	video.addEventListener("click", video.play.bind(video));
}
