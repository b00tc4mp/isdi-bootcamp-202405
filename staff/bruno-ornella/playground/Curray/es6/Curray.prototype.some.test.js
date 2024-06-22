const Curray = require("./Curray")


console.info('TEST SOME')

console.info('CASE some in array')

const arrays = new Curray(2, 3, 4, 5)



const even = arrays.some(function (element) {
    return element > 1
})

console.assert(arrays instanceof Curray, 'arrays is an Array')
console.assert(even === true, 'even is true')
