var assert = require('chai').assert
var hpkp = require('../lib/hpkp')
var Hapi = require('hapi')
var server

async function createServer(port, hpkpOptions) {
  server = new Hapi.Server({
    port: port
  })

  try {
   await server.register({
      plugin: require('../index.js'),
      options: hpkpOptions
    })
  } catch(err) {
    console.error('Failed to load plugin:', err)
  }

  server.route({
    method: 'GET',
    path: '/',
    handler: async function (request, h) {
      return 'HPKP!'
    }
  })

  await server.start()
  return server
}

var sha256s = [
  'orlando=',
  'magic='
]

var passingTestCases = [
  {
    name: 'should process minimum HPKP header',
    options: {
      maxAge: 1,
      sha256s: sha256s
    },
    expectedKey: 'public-key-pins',
    expectedHeader: 'pin-sha256="orlando="; pin-sha256="magic="; max-age=1'
  },
  {
    name: 'should process with includeSubdomains',
    options: {
      maxAge: 1,
      sha256s: sha256s,
      includeSubdomains: true
    },
    expectedKey: 'public-key-pins',
    expectedHeader: 'pin-sha256="orlando="; pin-sha256="magic="; max-age=1; includeSubdomains'
  },
  {
    name: 'should process with reportOnly',
    options: {
      maxAge: 1,
      sha256s: sha256s,
      reportOnly: true
    },
    expectedKey: 'public-key-pins-report-only',
    expectedHeader: 'pin-sha256="orlando="; pin-sha256="magic="; max-age=1'
  },
  {
    name: 'should process with report-uri',
    options: {
      maxAge: 1,
      sha256s: sha256s,
      reportOnly: true,
      reportUri: 'http://test.site'
    },
    expectedKey: 'public-key-pins-report-only',
    expectedHeader: 'pin-sha256="orlando="; pin-sha256="magic="; max-age=1; report-uri="http://test.site"'
  }
]

passingTestCases.forEach(function (testCase) {
  describe('HPKP Headers ' + testCase.name, function () {
    var server
    var requestOptions = {
      method: "GET",
      url: "/"
    }

    before(async function () {
      server = await createServer(3000, testCase.options)
      return server
    })

    after(function () {
      server.stop()
    })

    it(testCase.name, () => {
      server.inject(requestOptions, function (response) {
      assert.equal(response.headers[testCase.expectedKey], testCase.expectedHeader)
     })
    })
  })
})

var failingTestCases = [
  {
    name: 'should throw without any options',
    options: {},
    message: 'ValidationError: child "maxAge" fails because ["maxAge" is required]'
  },
  {
    name: 'should throw without sha256s',
    options: {
      maxAge: 1
    },
    message: 'ValidationError: child "sha256s" fails because ["sha256s" is required]'
  },
  {
    name: 'should throw with empty sha256s',
    options: {
      maxAge: 1,
      sha256s: []
    },
    message: 'ValidationError: child "sha256s" fails because ["sha256s" must contain at least 1 items]'
  }
]


describe('HPKP Config', function () {
	failingTestCases.forEach(function (testCase) {
		it(testCase.name, function () {
			assert.throws(function () {
				hpkp(testCase.options)
			}, testCase.message, 'threw error')
		})
	})
})
