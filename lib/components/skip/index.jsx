import { createElement } from "complate-stream";

export function SkipLink({ href }) {
	return <a class="skip" href={href}>skip to content</a>;
}
