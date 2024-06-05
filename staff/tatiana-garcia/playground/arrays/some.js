console.log('TEST some')

console.log('CASE method.some()')

var nums = [1, 2, 3, 4, 5];

// Checks whether an element is even
var even = function (element) {

    return element % 2 === 0;

}

console.log(nums.some(even));
//true

console.log(nums.some(function (number) {

    return number > 10
}));
//false

