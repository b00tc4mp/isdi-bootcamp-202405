const Curray = require('./Curray')


console.info('TEST findIndex in Curray')

console.info('Case findIndex')

const array1 = new Curray(5, 12, 8, 130, 44)

const isLargeNumber = array1.findIndex(function (element) {
    return element > 13
})


console.assert(array1 instanceof Curray, 'array1 is an Array')
console.assert(isLargeNumber === 3, 'isLargeNumber is 3')

