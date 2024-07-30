console.info("TEST Array.prototype.map");

console.info("CASE map for Array");

var numbers = [1, 4, 9, 16];

var map = function (element) {
  return element * 2;
};
var double = numbers.map(map);
console.log(double);
