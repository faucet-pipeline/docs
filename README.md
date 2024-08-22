# faucet-pipeline Documentation

This repository contains the documentation for the faucet-pipeline project.
The documentation can be found at:

[www.faucet-pipeline.org](https://www.faucet-pipeline.org)

## Contributing

You need Ruby & Node, then run:

* `bundle`
* `npm i`
* `bundle exec bridgetown start` (or `just start`)
* and you are good to go!

## Deploy

If you have `just` installed, run `just deploy`.
If not, run it manually:

* `bundle exec bridgetown clean`
* `bundle exec bridgetown frontend:build`
* `bundle exec bridgetown build`
* `rsync -uvcr --delete output/ $TARGET`
