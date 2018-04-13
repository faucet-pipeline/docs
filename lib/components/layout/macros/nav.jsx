import { createElement } from "complate-stream";

export default function SiteNavigation({ currentSlug }) {
	let Link = ({ slug }, ...children) => {
		let uri = `${slug}.html`;
		let selected = slug === currentSlug;
		return <NavLink href={uri} selected={selected}>{children}</NavLink>;
	};

	return <Nav>
		<NavGroup label="Introduction">
			<Link slug="index" selected>About faucet</Link>
			<Link slug="philosophy">Motivation & Philosophy</Link>
		</NavGroup>

		<Link slug="cli">Command-Line Interface</Link>

		<Link slug="sass">CSS / Sass</Link>

		<NavGroup label="JavaScript">
			<Link slug="js">ES5 & ES6+</Link>
			<Link slug="typescript">TypeScript</Link>
			<Link slug="jsx">JSX</Link>
		</NavGroup>

		<Link slug="static">Static Files</Link>

		<Link slug="manifest">Fingerprinting & Manifest</Link>
		<Link slug="browsers">Browserslist</Link>

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
	return <nav class="site-nav">
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
