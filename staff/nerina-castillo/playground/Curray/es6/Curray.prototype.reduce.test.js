const Curray = require("./Curray");

console.info("TEST Curray.prototype.reduce");

console.info("CASE reduce sum elements in Curray");

const numbers = new Curray();

numbers[0] = 1;
numbers[1] = 2;
numbers[2] = 3;
numbers[3] = 4;
numbers.length = 4;

const initialValue = 0;

const sumWithInitial = function (accumulator, currentValue) {
  return accumulator + currentValue;
};

const reduced = numbers.reduce(sumWithInitial, initialValue);

console.assert(numbers[0] + numbers[1] === 3, "1 + 2 is 3");
console.assert(reduced === 10, "reduced is 10");
console.assert(numbers.length === 4);
