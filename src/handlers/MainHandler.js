class MainHandler {
  _handler

  apply(value, context) {
    if (!this._handler) {
      throw new Error('Set up a new handler')
    }

    return this._handler.apply(value, context)
  }

  next(handler) {
    this._handler = handler
    return this._handler
  }
}

module.exports = MainHandler

