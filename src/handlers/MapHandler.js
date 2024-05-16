class MapHandler {
  _mapFunction = () => true
  _handler = null

  constructor(mapFunction) {
    if (typeof mapFunction !== 'function') {
      throw new Error('Invalid mapFunction param of type ' + (typeof mapFunction))
    }

    this._mapFunction = mapFunction
  }

  apply(value, context) {
    const transformedValue = this._mapFunction(value)

    if (this._handler) {
      return this._handler.apply(transformedValue, context)
    }

    context.value.push(transformedValue)
    return context
  }

  next(handler) {
    this._handler = handler
    return this._handler
  }
}

module.exports = MapHandler
