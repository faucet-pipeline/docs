import { createElement } from "complate-stream";

export function Navigation({ currentSlug }) {
	let Link = ({ slug }, ...children) => {
		let uri = `${slug}.html`;
		let selected = slug === currentSlug;
		return <NavLink href={uri} selected={selected}>{children}</NavLink>;
	};

	return <Nav>
		<NavGroup label="Introduction">
			<Link slug="index" selected>About faucet</Link>
			<Link slug="philosophy">Motivation & Philosophy</Link>
			<Link slug="cli">Command-Line Interface</Link>
			<Link slug="manifest">Fingerprinting & Manifest</Link>
			<Link slug="browsers">Browserslist</Link>
		</NavGroup>

		<NavGroup label="Asset Types">
			<Link slug="sass">CSS / Sass</Link>
			<Link slug="js">JavaScript</Link>
			<Link slug="static">Static Files</Link>
		</NavGroup>

		<NavGroup label="Framework Integration">
			<Link slug="rails">Ruby on Rails</Link>
			<Link slug="spring">Spring Framework</Link>
		</NavGroup>

		<NavGroup label="Community">
			<Link slug="faq">Frequently Asked Questions</Link>
			<Link slug="contributing">Contributing</Link>
			<Link slug="alternatives">Alternatives</Link>
			<Link slug="background">Background & Sponsors</Link>
		</NavGroup>
	</Nav>;
}

function Nav(_, ...links) {
	return <nav class="navigation">
		<ul>
			{links}
		</ul>
	</nav>;
}

function NavGroup({ label }, ...children) {
	return <li>
		{label}

		<ul>
			{children}
		</ul>
	</li>;
}

function NavLink({ href, selected }, ...children) {
	return <li class={selected && "selected"}>
		<a href={href}>{children}</a>
	</li>;
}
