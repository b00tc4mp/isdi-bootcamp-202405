var Curray = require("./Curray");

console.info("TEST Curray.prototype.find");

console.info("CASE find");

const numbers = new Curray();

numbers[0] = 5;
numbers[1] = 12;
numbers[2] = 8;
numbers[3] = 130;
numbers[4] = 44;
numbers.length = 5;

const found = function (element) {
  return element > 10;
};

const num = numbers.find(found);

console.assert(num === 12, "num is 12");
console.assert(numbers[1] > 10, "12 is more tahn 10");
