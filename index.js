const ArrayStream = require('./src/index.js')

const result = ArrayStream.of([1,2,3,4])
  .fill(0)
  .apply()

console.log({ result })

module.exports = {
  ArrayStream
}
