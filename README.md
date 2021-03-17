# react-data-explorer

Using semantic release:
* Patch release: `fix(pencil): stop graphite breaking when too much pressure applied`
* Feature release: `feat(pencil): add 'graphiteWidth' option`
* Breaking release: `BREAKING CHANGE: The graphiteWidth option has been removed.
The default graphite width of 10mm is always used for performance reasons.`

## Devel setup
* `npm i`
* Run the AAA full stack (proxy + backend)
    * This step is needed, since the demo app is set up to work with the AAA API
* `npm start`
* go to `localhost:8080`