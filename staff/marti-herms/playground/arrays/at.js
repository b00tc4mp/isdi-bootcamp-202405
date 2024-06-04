console.log('TEST at')

console.log('CASE return value of index in array')

var nums = [5, 12, 8, 130, 44];

console.log(nums);
//[5, 12, 8, 130, 44]
console.log(nums.length);
//5

var index = 3;

console.log(nums.at(index));
//130

var index = -3;

console.log(nums.at(index));
//8