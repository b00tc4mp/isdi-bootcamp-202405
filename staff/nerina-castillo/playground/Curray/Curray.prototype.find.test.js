var Curray = require("./Curray");
require("./Curray.prototype.find");

console.info("TEST Curray.prototype.find");

console.info("CASE find");

var numbers = new Curray();

numbers[0] = 5;
numbers[1] = 12;
numbers[2] = 8;
numbers[3] = 130;
numbers[4] = 44;
numbers.length = 5;

var found = function (element) {
  return element > 10;
};

var num = numbers.find(found);

console.assert(num === 12, "num is 12");
console.assert(numbers[1] > 10, "12 is more tahn 10");
