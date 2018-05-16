/**
 * Hapi middleware to append HPKP headers to all responses.
 *
 */
var Joi = require('joi')

module.exports = function (options) {

  var optionsSchema = Joi.object().keys({
    maxAge: Joi.number().min(0).required(),
    sha256s: Joi.array().min(1).items(Joi.string()).required(),
    reportUri: Joi.string().uri().optional(),
    reportOnly: Joi.boolean().optional(),
    includeSubdomains: Joi.boolean().optional()
  })

  var error = optionsSchema.validate(options).error
  if (error) {
    throw new Error(error)
  }

  var sha256s = options.sha256s
  var maxAge = options.maxAge
  var includeSubdomains = options.includeSubdomains
  var reportOnly = options.reportOnly
  var reportUri = options.reportUri

  var hpkpParts = []

  sha256s.forEach(function (shaPin) {
    hpkpParts.push('pin-sha256="' + shaPin + '"')
  })

  hpkpParts.push('max-age=' + maxAge)

  if (includeSubdomains) {
    hpkpParts.push('includeSubdomains')
  }

  if (reportUri) {
    hpkpParts.push('report-uri="' + reportUri + '"')
  }

  var hpkpHeaderKey = 'Public-Key-Pins'
  if (reportOnly) {
    hpkpHeaderKey = 'Public-Key-Pins-Report-Only'
  }

  var hpkpHeader = hpkpParts.join('; ')

  return function (request, reply) {
    var response = request.response

    if (response.header) {
      response.header(hpkpHeaderKey, hpkpHeader)
    }

    return reply.continue
  }
}
