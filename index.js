// same interface as fs.read
module.exports = function (archive, entry, buffer, offset, length, position, cb) {
  var cursor = archive.createByteCursor(entry, {start: position, end: position + length})
  var temp = new Buffer(0)
  cursor.next(function loop (err, data) {
    console.log('next', err, data)
    if (err) return cb(err)
    if (!data) return done()

    temp = Buffer.concat([temp, data])
    if (temp.length >= length) return done()
    cursor.next(loop)
  })

  function done () {
    if (temp.length < length) return cb(new Error('not enough data to read'))
    buffer.fill(temp.slice(0, length), offset, offset + length)
    cb(null, length, buffer)
  }
}
