console.info("TEST Array.prototype.findLastIndex");

console.info("CASE findLastIndex in array");

var numbers = [5, 12, 8, 130, 44];

var found = numbers.findLastIndex(function (element) {
  return element > 13;
});
console.assert(found === 4, "found is 4");

var found1 = numbers.findLastIndex(function (element) {
  return element < 2;
});
console.assert(found1 === -1, "found1 is undefined");
