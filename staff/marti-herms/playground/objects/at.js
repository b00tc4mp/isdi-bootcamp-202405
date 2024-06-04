console.log('TEST at')

console.log('CASE return value of property in object');

var nums = { 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 };

console.log(nums);
//{ 0: 5, 1: 12, 2: 8, 3: 130, 4: 44, length: 5 }

var index = 3;

nums.at = function (index) {
    if (index < 0) {
        return nums[this.length + index];
    }
    return nums[index];
}

console.log(nums.at(index));
//130

index = -2;

console.log(nums.at(index));
//130