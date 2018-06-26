# hapi-hpkp
Inspired by [Helmetjs](https://github.com/helmetjs/hpkp), this is a Hapi module to add HPKP headers to all requests.

## Example

```javascript
var hpkp = require('./index')
var Hapi = require('hapi')

var hpkpOptions = {
    maxAge: 1,                       // In seconds
    sha256s: ["orlando=", "magic="], // Array of sha256
    includeSubdomains: true,         // optional
    reportUri: 'http://test.site',   // optional
    reportOnly: false                // optional
}

var server = new Hapi.Server()

// Register HPKP plugin
async () => {
    try {
        await server.register({
          plugin: hpkp,
          options: hpkpOptions
        })
    } catch(err) {
        console.error('Failed to load plugin:', err)
    }
}
```
