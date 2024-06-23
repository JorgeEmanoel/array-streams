class FindHandler {
  _needle = undefined
  _handler = null

  constructor(needle) {
    this._needle = needle
  }

  apply(value, context) {
    if (value === this._needle) {
      context.value = [value, context.index]
      return context
    }

    if (!this._handler) {
      context.value = [undefined, -1]
      return context
    }

    return this._handler.apply(value, context)
  }

  next(handler) {
    this._handler = handler
    return this._handler
  }
}

module.exports = FindHandler
