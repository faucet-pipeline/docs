import * as views from "./manifest";
import Renderer from "complate-stream";

let { registerView, renderView } = new Renderer();

Object.values(views).forEach(view => {
	registerView(view);
});

export default renderView;
