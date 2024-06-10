console.info("TEST every");

console.info("CASE every");

var nums = { 0: 1, 1: 30, 2: 39, 3: 29, 4: 10, 5: 13, length: 6 };

nums.every = function (callback) {
  for (var i = 0; i < this.length; i++) {
    if (callback(this[i])) return false;
  }
  return true;
};

var isBelowThreshold = nums.every(function (currentValue) {
  return currentValue < 40;
});
console.info(isBelowThreshold);
