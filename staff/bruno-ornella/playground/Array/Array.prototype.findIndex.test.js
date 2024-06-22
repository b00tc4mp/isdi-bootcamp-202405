console.info('TEST findIndex in array')

console.info('Case findIndex')

var array1 = new Array(5, 12, 8, 130, 44)

var isLargeNumber = array1.findIndex(function (element) {
    return element > 13
})


console.assert(array1 instanceof Array, 'array1 is an Array')
console.assert(isLargeNumber === 3, 'isLargeNumber is 3')

