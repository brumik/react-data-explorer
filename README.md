# react-data-explorer

Using semantic release (disabled until the app is in <v1.0.0)
* Patch release: `fix(pencil): stop graphite breaking when too much pressure applied`
* Feature release: `feat(pencil): add 'graphiteWidth' option`
* Breaking release: `BREAKING CHANGE: The graphiteWidth option has been removed.
The default graphite width of 10mm is always used for performance reasons.`

## Devel setup

### Requirements
* node > 14
* npm > 7

### Setup
* `npm i` - install the packages
* Run the AAA full stack (proxy + backend)
    * This step is needed, since the demo app is set up to work with the AAA API
* `npm start` - start the local web server
* go to `localhost:8080`

### Testing
* `npm i` if not done before
* `npm test`

## Examples (docs)
For seeing the components in work there are extensive examples in the `demo` folder. The schema contains most of the basic usage. A proper documentation is coming when hitting the magic v1.0.0.
