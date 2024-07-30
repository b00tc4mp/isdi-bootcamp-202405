var Curray = require("./Curray");
require("./Curray.prototype.every");

console.info("TEST Curray.prototype.every");

console.info("CASE every");

var nums = new Curray();

nums[0] = 1;
nums[1] = 30;
nums[2] = 39;
nums[3] = 29;
nums[4] = 10;
nums[5] = 13;

var isBelowThreshold = function (currentValue) {
  return currentValue < 40;
};

var numbers = nums.every(isBelowThreshold);

console.assert(numbers === true, "numbers is true");
console.assert(nums[0] < 40, "1 is less tan 40");
console.assert(nums[1] < 40, "30 is less tan 40");
console.assert(nums[2] < 40, "39 is less tan 40");
console.assert(nums[3] < 40, "29 is less tan 40");
console.assert(nums[4] < 40, "10 is less tan 40");
console.assert(nums[5] < 40, "13 is less tan 40");
