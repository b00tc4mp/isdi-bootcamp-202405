console.info('TEST some in Array.prototype.some.test')
console.info('CASE some')


var number = new Array(1, 2, 3, 4, 5);

var even = function (elem) {
    return elem < 10
}

var numEven = number.some(even)
console.assert(numEven === true, 'even is true')


var even = function (elem) {
    return elem > 30
}

var numEven = number.some(even)
console.assert(numEven === false, 'even is false')
