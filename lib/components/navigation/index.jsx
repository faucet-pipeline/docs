import { createElement } from "complate-stream";

export function Navigation({ currentSlug }) {
	let Link = ({ slug }, ...children) => {
		let selected = slug === currentSlug;
		return <NavLink href={slug} selected={selected}>{children}</NavLink>;
	};

	return <Nav>
		<NavGroup label="Introduction">
			<Link slug="index" selected>About faucet</Link>
			<Link slug="philosophy">Motivation & Philosophy</Link>
			<Link slug="cli">Command-Line Interface</Link>
			<Link slug="manifest">Fingerprinting & Manifest</Link>
			<Link slug="watching">File Watching</Link>
			<Link slug="faq">Frequently Asked Questions</Link>
		</NavGroup>

		<NavGroup label="Asset Types">
			<Link slug="sass">Sass</Link>
			<Link slug="css">CSS (Beta)</Link>
			<Link slug="js">JavaScript / TypeScript</Link>
			<Link slug="images">Images</Link>
			<Link slug="static">Static Files</Link>
			<Link slug="build-pipeline">Build a Pipeline</Link>
		</NavGroup>

		<NavGroup label="Framework Integration">
			<Link slug="rails">Ruby on Rails</Link>
			<Link slug="spring-boot">Spring Boot</Link>
			<Link slug="build-integration">Build an Integration</Link>
		</NavGroup>

		<NavGroup label="Community">
			<Link slug="contributing">Contributing</Link>
			<NavLink href="https://www.innoq.com/en/datenschutz">Privacy</NavLink>
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
