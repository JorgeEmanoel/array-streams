class FilterHandler {
  _filterFunction = () => true
  _handler = null

  constructor(filterFunction) {
    if (typeof filterFunction !== 'function') {
      throw new Error('Invalid filterFunction param of type ' + (typeof filterFunction))
    }

    this._filterFunction = filterFunction
  }

  apply(value, context) {
    const canPass = this._filterFunction(value)
    if (!this._handler) {
      if (canPass) {
        context.value.push(value)
      }

      return context
    }

    if (!canPass) {
      return context
    }

    return this._handler.apply(value, context)
  }

  next(handler) {
    this._handler = handler
    return this._handler
  }
}

module.exports = FilterHandler
