class FillHandler {
  _handler
  _fillWith
  _start
  _end

  constructor(fillWith, start = 'all', end = 'all') {
    this._fillWith = fillWith
    this._start = start
    this._end = end
  }

  apply(value, context) {
    this._setLimits(context)
    if (this._start == 0) {
      context.value = [this._fillWith];
    }

    const currentValueIndex = context.value.length - 1

    if (currentValueIndex < this._start) {
      if (this._handler) {
        return this._handler.apply(this._acc, context)
      }

      return context
    }

    context.value[currentValueIndex] = this._fillWith
    for (let i = 0; i < this._end; i++) {
      context.value.push(this._fillWith)
    }

    if (this._handler) {
      return this._handler.apply(value, context)
    }

    return context
  }

  next(handler) {
    this._handler = handler
    return this._handler
  }

  _setLimits(context) {
    if (this._start == 'all') {
      this._start = 0
    }

    if (this._end == 'all') {
      this._end = context.original.length
    }

    this._start = Number(this._start)
    this._end = Number(this._end)
  }
}

module.exports = FillHandler
