console.log("TEST at");

console.log("CASE element at index");

var nums = { 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 };
console.log(nums);
console.log(nums.length);

nums.at = function (index) {
  if (index >= 0) {
    return this[index];
  } else {
    return this[this.length + index];
  }
};
console.log(num);

var num = nums.at(-3);

console.log(num);
