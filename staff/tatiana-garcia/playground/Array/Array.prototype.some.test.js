console.info('TEST some')

console.info('CASE method.some()')

var nums = new Array(1, 2, 3, 4, 5);


var even = function (element) {

    return element % 2 === 0;


}

var numsEven = nums.some(even)


console.assert(numsEven === true, 'at least one number in the array is even')

console.info('CASE method.some()')

var nums = [1, 2, 3, 4, 5];

var even = function (element) {

    return element > 10;


}

var numsEven = nums.some(even)
console.assert(numsEven === false, ' esto es falso')
