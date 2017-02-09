const hyperdrive = require('hyperdrive')
const memdb = require('memdb')
const tape = require('tape')
const pump = require('pump')
const toStream = require('string-to-stream')
const read = require('.')

tape('read', function (t) {
  var drive = hyperdrive(memdb())
  var archive = drive.createArchive()

  pump(toStream('123456789'), archive.createFileWriteStream('foo'), err => {
    t.error(err)

    var buf = new Buffer(3)
    read(archive, 'foo', buf, 0, 3, 0, (err, bytesRead, buffer) => {
      t.error(err)
      t.equal(bytesRead, 3)
      t.same(buffer.toString(), '123')
      t.end()
    })
  })
})

tape('not enough data', function (t) {
  var drive = hyperdrive(memdb())
  var archive = drive.createArchive()

  pump(toStream('123456789'), archive.createFileWriteStream('foo'), err => {
    t.error(err)

    var buf = new Buffer(3)
    read(archive, 'foo', buf, 0, 3, 10, (err, bytesRead, buffer) => {
      t.ok(err)
      t.end()
    })
  })
})

