class ReduceHandler {
  _reduceFunction = (a) => a
  _handler
  _acc

  constructor(reduceFuncton, initialValue) {
    this._reduceFunction = reduceFuncton
    this._acc = initialValue
  }

  apply(value, context) {
    this._acc = this._reduceFunction(this._acc, value)

    if (this._handler) {
      return this._handler.apply(this._acc, context)
    }

    context.value = this._acc
    return context
  }

  next(handler) {
    this._handler = handler
    return this._handler
  }
}

module.exports = ReduceHandler
