var Curray = require("./Curray");

Curray.prototype.keys = function () {
  var i = 0;

  var self = this;

  return {
    next: function () {
      return {
        value: i < self.length ? i : undefined,
        done: ++i > self.length,
      };
    },
  };
};
