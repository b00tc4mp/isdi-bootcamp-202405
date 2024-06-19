var Curray = require("./Curray");

Curray.prototype.copyWithin = function (target, start, end = 0) {
  var item = target;

  if (end === undefined) end = this.length;
  else if (end < 0) end = this.length + end;

  if (start === undefined) start = 0;
  else if (start < 0) start = this.length + start;

  if (end <= start) return this;

  if (target === undefined) target = 0;
  else if (target < 0) target = this.length + target;
  else if (target > start) return this;
  for (var i = start; i < end; i++) {
    this[item] = this[i];
    target++;
  }
  return this;
};
