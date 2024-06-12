console.info("TEST Array.prototype.some");

console.info("CASE some");

var numbers = new Array();

var numbers = [1, 2, 3, 4, 5];

var nums = numbers.some(function (number) {
  return number % 2 === 0;
});

console.assert(nums === true, "nums is true");
