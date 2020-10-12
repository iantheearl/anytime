#!/usr/bin/env node

// A script for developing a browser extension with live-reloading
// using Create React App (no need to eject).
// Run it instead of the "start" script of your app for a nice
// development environment.
// P.S.: Install webpack-extension-reloader before running it.

// Force a "development" environment in watch mode
process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

const fs = require('fs-extra')
const webpack = require('webpack')
const colors = require('colors/safe')

const configFactory = require('../config/webpack.config')
const paths = require('../config/paths')

// Create the Webpack config usings the same settings used by the "start" script
// of create-react-app.
const config = configFactory('development')

// Edit the Webpack config by setting the output directory to "./build".
config.output.path = paths.appBuild
paths.publicUrl = paths.appBuild + '/'

// Start Webpack in watch mode.
webpack(config).watch({}, function (err) {
	if (err) {
		console.error(err)
	} else {
		// Every time Webpack finishes recompiling copy all the assets of the
		// "public" dir in the "build" dir (except for the index.html)
		fs.copySync(paths.appPublic, paths.appBuild, {
			dereference: true,
			filter: (file) => file !== paths.appHtml
		})
		// Report on console the succesfull build
		console.info(colors.green('Compiled successfully!'))
		console.info('Built at', new Date().toLocaleTimeString())
	}
})
