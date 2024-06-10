console.info("TEST Array.prototype.every");

console.info("CASE every");

var nums = new Array();

var nums = [1, 30, 39, 29, 10, 13];

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
