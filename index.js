/**
 * Hapi middleware to append HPKP headers to all responses.
 *
 */
'use strict'

var hpkp = require('./lib/hpkp')

exports.register = function (server, options, next) {
  server.ext('onPreResponse', hpkp(options))

  next()
}

exports.register.attributes = {
  pkg: require('./package.json')
}
