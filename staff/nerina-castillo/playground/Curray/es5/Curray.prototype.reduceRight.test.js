var Curray = require("./Curray");
require("./Curray.prototype.reduceRight");

console.info("TEST Curray.prototype.reduceRight");

console.info("CASE two-dimensional Curray");

var nums = new Curray();
nums[0] = new Curray(0, 1);
nums[1] = new Curray(2, 3);
nums[2] = new Curray(4, 5);
nums.length = 5;

console.log(nums);
var result = nums.reduceRight(function (accumulator, currentValue) {
  return accumulator + currentValue;
}, 0);

console.assert(result[0] === 4, "result at 0 is 4");
console.assert(result[1] === 5, "result at 1 is 5");
console.assert(result[2] === 2, "result at 2 is 2");
console.assert(result[3] === 3, "result at 3 is 3");
console.assert(result[4] === 0, "result at 4 is 0");
console.assert(result[5] === 1, "result at 5 is 1");
console.log(result);
