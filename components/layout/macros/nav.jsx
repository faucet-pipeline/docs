import { createElement } from "complate-stream";

export default function Nav(_, ...links) {
	return <nav class="site-nav">
		<ul>
			{links}
		</ul>
	</nav>;
}

export function NavGroup({ label }, ...children) {
	return <li>
		{label}

		<ul>
			{children}
		</ul>
	</li>;
}

export function NavLink({ href, selected }, ...children) {
	return <li class={selected && "selected"}>
		<a href={href}>{children}</a>
	</li>;
}
