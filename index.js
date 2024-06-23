const ArrayStream = require('./src/index.js')

const result = ArrayStream.of([1,2,3,4,6])
  .map(e => e + 4)
  .filter(e => e > 3)
  .find(10)
  .apply()

console.log({ result })

module.exports = {
  ArrayStream
}
