console.log('TEST SOME')

console.log('CASE some in array')

var array = [1, 2, 3, 4, 5, 0];


var even = array.some(function (element) {
    return element < 0
})

console.log(even)

