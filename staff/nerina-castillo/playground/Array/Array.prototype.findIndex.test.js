console.info("TEST Array.prototype.findIndex");

console.info("CASE find index of element less than 13");

var numbers = [5, 12, 8, 130, 44];

var found = (numbers.isLargeNumber = function (element) {
  element > 13;
});

console.assert(found === 3, "found is 3");

var found = (numbers.isLargeNumber = function (element) {
  element < 2;
});

console.assert(found === -1, "found is -1");
