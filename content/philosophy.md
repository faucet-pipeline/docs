title: Motivation & Philosophy

> Given the choice between making something _my_ problem, and making something
> _the user's_ problem, I'll choose to make it my problem every time.

--- [Jeremy Keith](https://adactio.com/journal/7706)

faucet has two primary goals: reducing accidental complexity and promoting
sustainable source code. As such, it is designed around intentional constraints
and a set of core beliefs.

The idea grew out of two conflicting insights: Modern front-end development
provides immense potential to reduce cognitive load for developers, thus making
code both more enjoyable and maintainable -- thanks to CSS pre-processors as
well as newly standardized JavaScript modules and syntax. Yet at the same time,
these very advances significantly increase complexity, frequently resulting in
fatigue and wariness:

> I'd like to use ES6, but haven't set up a transpiler yet

This sentiment was common among friends and colleagues. While some of that
complexity is inherent -- compiling inevitably introduces a layer of indirection
-- the primary hurdle turned out to the complexity of _tooling_. faucet tries to
shield users from tooling-specific low-level details for both configuration and
dependency management.

faucet tries hard to be
[replaceable](https://martinfowler.com/bliki/SacrificialArchitecture.html) and
to stay out of your way: We believe that source code should not rely on any
particular build tool, but rather be standards-compliant and thus portable
across build systems. Naturally this means that project-specific customization
is limited, which we consider a useful constraint -- though it means that
[faucet might not be for everyone](alternatives.html).

In practice, this means we've preselected established tools and libraries and
wrap them in a shell that's easy to understand and operate -- without
abstracting away the underlying concepts, such as module bundling or
transpiling. We don't expect to change the underlying tooling frequently, but
we'll be able to if something better comes along -- without burdening users with
the details.

The original impetus was to get more people to take adavantage of
[Rollup](https://rollupjs.org), prompted by Nolan Lawson's
[The cost of small modules](https://nolanlawson.com/2016/08/15/the-cost-of-small-modules/):
We're convinced that even when compiling source modules into a bundle, the
resulting bundle's internals still matter.

This evolved into a suite of additional abstractions for similar tasks: CSS
pre-processing (using [Sass](http://sass-lang.com) by default, if only because
it happens to be our curent preference), optimizing images and handling static
assets -- including fingerprinting for HTTP cache optimization.

Of course faucet wouldn't be possible without relying on amazing work by a huge
number of people; we're merely provides a bit of glue code on top.
