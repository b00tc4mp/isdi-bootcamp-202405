console.log("TEST every");

console.log("CASE every");

var nums = [1, 30, 39, 29, 10, 13];

var isBelowThreshold = function (currentValue) {
  return currentValue < 40;
};

console.log(nums.every(isBelowThreshold));
