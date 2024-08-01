console.info('TEST Array.prototype.forEach')

console.info('CASE copy chars into new array')

var chars = ['a', 'b', 'c']
var copy = []

chars.forEach(function (element) {
    copy[copy.length] = element
})

console.assert(copy.length === chars.length, 'copy length equals chars length')
console.assert(copy[0] === chars[0], 'copy at 0 equals chars at 0')
console.assert(copy[1] === chars[1], 'copy at 1 equals chars at 1')
console.assert(copy[2] === chars[2], 'copy at 2 equals chars at 2')

console.info('CASE copy chars with index and self-reference into new array')

var chars = ['a', 'b', 'c']
var copy = []
var indexes = []
var arrays = []

chars.forEach(function (element, index, array) {
    copy[copy.length] = element
    indexes[indexes.length] = index
    arrays[arrays.length] = array
})

console.assert(copy.length === chars.length, 'copy length equals chars length')

console.assert(copy[0] === chars[0], 'copy at 0 equals chars at 0')
console.assert(indexes[0] === 0, 'indexes at 0 equals 0')
console.assert(arrays[0] === chars, 'arrays at 0 equals chars')

console.assert(copy[1] === chars[1], 'copy at 1 equals chars at 1')
console.assert(indexes[1] === 1, 'indexes at 1 equals 1')
console.assert(arrays[1] === chars, 'arrays at 1 equals chars')

console.assert(copy[2] === chars[2], 'copy at 2 equals chars at 2')
console.assert(indexes[2] === 2, 'indexes at 2 equals 2')
console.assert(arrays[2] === chars, 'arrays at 2 equals chars')

console.info('CASE calculate percentages')

var amounts = [100, 50, 4, 450, 100, 2000]
var results = []

amounts.forEach(function (amount, index, amounts) {
    var total = 0

    amounts.forEach(function (amount) {
        total += amount
    })

    results[index] = amount / total * 100
})

console.assert(results.length === amounts.length, 'results length equals amounts length')

console.assert(results[0] === 3.698224852071006, 'results at 0 is 3.698224852071006')
console.assert(results[1] === 1.849112426035503, 'results at 1 is 1.849112426035503')
console.assert(results[2] === 0.14792899408284024, 'results at 2 is 0.14792899408284024')
console.assert(results[3] === 16.642011834319526, 'results at 3 is 16.642011834319526')
console.assert(results[4] === 3.698224852071006, 'results at 4 is 3.698224852071006')
console.assert(results[5] === 73.96449704142012, 'results at 5 is 73.96449704142012')
