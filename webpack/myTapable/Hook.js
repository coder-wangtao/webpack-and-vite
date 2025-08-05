class Hook {
  constructor(args, name) {
    this._args = args;
    this.name = name;
    this.taps = [];
    this._x = [];
    this.call = CALL_DELEGATE;
    this._call = CALL_DELEGATE;
    this.compile = this.compile;
    this.tap = this.tap;
  }

  compile(options) {
    throw new Error("Abstract:should be overridden");
  }

  tap() {}
}
