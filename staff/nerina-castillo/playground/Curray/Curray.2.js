function Curray() {
  for (var i = 0; i < arguments.length; i++) {
    var argument = arguments[i];

    this[i] = argument;
  }

  this.length = arguments.length;
}

module.exports = Curray;
