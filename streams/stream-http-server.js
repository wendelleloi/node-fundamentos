import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStrem extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    console.log(transformed)

    callback(null, Buffer.from(String(transformed)))
  }
}

// req => ReadableStream
// res => WritableStream
const server = http.createServer(async (req, res) => {
  const buffers = []

  // for await para consumir uma stream completa
  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()
  console.log(fullStreamContent)

  return res.end(fullStreamContent)

  // return req
  //   .pipe(new InverseNumberStrem())
  //   .pipe(res)
})

server.listen(3334)