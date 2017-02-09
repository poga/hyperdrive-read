# hyperdrive-read

Read data from a file in a hyperdrive archive. Provide the same interface as `fs.read`

## Usage

```js
var read = require('hyperdrive-read')

read(archive, entry, buffer, offset, length, position, function (err, bytesRead, buffer) {
  // done
})
```

## License

The MIT License
