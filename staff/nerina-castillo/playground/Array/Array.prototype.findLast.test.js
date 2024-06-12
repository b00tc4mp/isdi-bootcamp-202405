console.info("TEST Array.prototype.findLast");

console.info("CASE findLast in array");

var numbers = [5, 12, 8, 130, 44];

var found = numbers.findLast(function (element) {
  return element > 13;
});
console.assert(found === 44, "found is 44");

var found1 = numbers.findLast(function (element) {
  return element < 2;
});
console.assert(found1 === undefined, "found1 is undefined");
