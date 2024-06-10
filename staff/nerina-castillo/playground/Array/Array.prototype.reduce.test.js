console.info("TEST Array.prototype.reduce");

console.info("CASE reduce sum elements in Array");

var numbers = new Array();

var numbers = [1, 2, 3, 4];

var initialValue = 0;

var sumWithInitial = function (accumulator, currentValue) {
  return accumulator + currentValue;
};

var reduced = numbers.reduce(sumWithInitial, initialValue);

console.assert(numbers[0] + numbers[1] === 3, "1 + 2 is 3");
console.assert(reduced === 10, "reduced is 10");
console.assert(numbers.length === 4);
