console.info("TEST Array.prototype.find");

console.info("CASE find");

var numbers = new Array();

var numbers = [5, 12, 8, 130, 44];

var found = function (element) {
  return element > 10;
};

var num = numbers.find(found);

console.assert(num === 12, "num is 12");
console.assert(numbers[1] > 10, "12 is more tahn 10");
