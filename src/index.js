const FillHandler = require("./handlers/FillHandler")
const FilterHandler = require("./handlers/FilterHandler")
const MainHandler = require("./handlers/MainHandler")
const MapHandler = require("./handlers/MapHandler")
const ReduceHandler = require("./handlers/ReduceHandler")

class ArrayStream {
  _elements = []
  _mainHandler
  _handler
  _state = {
  }

  constructor(elements) {
    this._elements = elements
    this._mainHandler = new MainHandler()
    this._handler = this._mainHandler
  }

  static of(elements) {
    return new ArrayStream(elements)
  }

  filter(filterFunction) {
    this._handler = this._handler.next(new FilterHandler(filterFunction))
    return this
  }

  map(mapFunction) {
    this._handler = this._handler.next(new MapHandler(mapFunction))
    return this
  }

  reduce(reduceFunction, initialValue) {
    this._handler = this._handler.next(new ReduceHandler(reduceFunction, initialValue))
    return this
  }

  fill(value, start = 'all', end = 'all') {
    this._handler = this._handler.next(new FillHandler(value, start, end))
    return this
  }

  apply() {
    let context = {
      original: this._elements,
      value: [],
      index: 0,
    }

    for (let i = 0; i < this._elements.length; i++) {
      context.index = i
      context = this._mainHandler.apply(this._elements[i], context)
    }

    return context.value
  }
}

module.exports = ArrayStream
