title: Build an Integration

This guide will help you if you want to use faucet-pipeline with your favorite
Web framework or programming language and there is no integration written yet.

If you want to use faucet without fingerprinting and a manifest, you don't need
any code to integrate your framework with faucet: Just write the files to some
location that is known to the framework and then reference the file. If you
however want to use fingerprinting, you need to read the manifest in your
application to figure out the name of the actual file.

To do that, you need to parse the manifest file. Then you need to take the key
from the user (for example `application.js`) and look up the according value.
The value is an URL that points to the current version of the file.

* In development you need to re-read that file everytime a file is requested as
    the watch task might update the URL for the files.
* In production you only need to read the file once.

Depending on your framework, a lookup method/function that takes the name and
returns the URI might be enough. Some frameworks however offer helpers to
include entire image tags with the URL. In that case the integration might take
research to figure out where to hook into the framework.
