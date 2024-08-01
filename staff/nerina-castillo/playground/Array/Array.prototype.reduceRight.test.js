console.info("TEST Array.prototype.reduceRight");

console.info("CASE two-dimensional Array");

var nums = [
  [0, 1],
  [2, 3],
  [4, 5],
];

const result = nums.reduceRight((accumulator, currentValue) =>
  accumulator.concat(currentValue)
);

console.assert(result[0] === 4, "result at 0 is 4");
console.assert(result[1] === 5, "result at 1 is 5");
console.assert(result[2] === 2, "result at 2 is 2");
console.assert(result[3] === 3, "result at 3 is 3");
console.assert(result[4] === 0, "result at 4 is 0");
console.assert(result[5] === 1, "result at 5 is 1");
