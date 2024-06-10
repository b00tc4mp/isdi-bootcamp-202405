console.info("TEST every");

console.info("CASE every");

var nums = [1, 30, 39, 29, 10, 13];

var isBelowThreshold = function (currentValue) {
  return currentValue < 40;
};

console.info(nums.every(isBelowThreshold));
