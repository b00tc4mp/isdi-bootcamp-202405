console.info('TEST some')

console.info('CASE the result of some item of array is true')

var nums = [1, 2, 3, 4, 5];
console.assert(nums instanceof Array, 'nums is an array')


var even = function (element) {

    return element % 2 === 0;


}

var numsEven = nums.some(even)
console.assert(numsEven === true, 'at least one number in the array is even')


console.info('CASE the result of some item of array is false')

var nums = [1, 2, 3, 4, 5];

var even = function (element) {

    return element > 10;


}

var numsEven = nums.some(even)
console.assert(numsEven === false, ' No one number in the array is greater than 10')

