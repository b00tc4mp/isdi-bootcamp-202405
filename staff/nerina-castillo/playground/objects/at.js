console.info("TEST at");

console.info("CASE element at index");

var nums = { 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 };
console.info(nums);
console.info(nums.length);

nums.at = function (index) {
  if (index >= 0) {
    return this[index];
  } else {
    return this[this.length + index];
  }
};
console.info(num);

var num = nums.at(-3);

console.info(num);
