title: Motivation & Philosophy

> Given the choice between making something _my_ problem, and making something
> _the user's_ problem, I'll choose to make it my problem every time.
> 
> --- [Jeremy Keith](https://adactio.com/journal/7706)

faucet has two primary goals: reducing accidental complexity and promoting
sustainable source code. As such, we designed it around intentional constraints
and a set of core beliefs.

The idea grew out of two conflicting insights: Modern front-end development
provides immense potential to reduce cognitive load for developers, thus making
code both more enjoyable and maintainable -- thanks to CSS pre-processors and
newly standardized JavaScript modules and syntax. Yet at the same time, these
very advances significantly increase complexity, frequently resulting in fatigue
and wariness:

> I'd like to use ES6, but haven't set up a transpiler yet

This sentiment was common among friends and colleagues. While some of that
complexity is inherent – compiling  introduces a layer of indirection – the
primary hurdle turned out to be tooling complexity. faucet tries to shield
users from tooling-specific low-level details for both configuration and
dependency management.

faucet tries hard to be
[replaceable](https://martinfowler.com/bliki/SacrificialArchitecture.html) and
stay out of your way: We believe that source code should not rely on any
particular build tool, but rather be standards-compliant and portable across
build systems. Naturally, this means that project-specific customization is
limited, which we consider a useful constraint – though it means that faucet
might not be for everyone.

In practice, this means we've preselected established tools and libraries and
wrap them in a shell that's easy to understand and operate -- without
abstracting away the underlying concepts, such as module bundling or
transpiling. We don't expect to change the underlying tooling frequently, but
we'll be able to if something better comes along -- without burdening users with
the details.

To simplify the process of preparing assets for delivery, faucet takes care of
all the minutiae, providing the underlying infrastructure and reducing
configuration to the bare minimum required. With all that out of the way, we can
focus on actually writing the code. Thus we can easily recommend it to friends
and colleagues and get them started in less than a minute.

Of course, faucet wouldn’t be possible without relying on fantastic work by many
people; we merely provide a bit of glue code on top. The work on this project is
sponsored by [INNOQ](https://www.innoq.com) & [fejo.dk](https://www.fejo.dk). It
is used both in production as well as for internal applications by both
companies.
