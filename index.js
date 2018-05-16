/**
 * Hapi middleware to append HPKP headers to all responses.
 *
 */
'use strict'

var hpkp = require('./lib/hpkp')

exports.plugin = {
  pkg: require('./package.json'),
  register: function (server, options) {
    server.ext('onPreResponse', hpkp(options))
  }
}
