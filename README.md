# hapi-hpkp
Inspired by [Helmetjs](https://github.com/helmetjs/hpkp), this is a Hapi module to add HPKP headers.

## Example

```javascript
var hpkp = require('./index')
var Hapi = require('hapi')

var server = new Hapi.Server();

server.ext('onPreResponse', hpkp({
    maxAge: 1,                       // In seconds
    sha256s: ["orlando=", "magic="], // Array of sha256
    includeSubdomains: true,         // optional
    reportUri: 'http://test.site',   // optional
    reportOnly: false,               // optional
}))
```
