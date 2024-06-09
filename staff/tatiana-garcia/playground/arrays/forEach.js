console.info('TEST forEach')
console.info('CASE copy cahars into new array')

var chars = ['a', 'b', 'c'];
var copy = []

chars.forEach(function (element) {

    copy[copy.length] = element

});

console.assert(copy.length === chars.length, 'copy length equals char length')
console.assert(copy[0] === chars[0], 'copy at 0 equals chars al 0')
console.assert(copy[1] === chars[1], 'copy at 1 equals chars al 1')
console.assert(copy[2] === chars[2], 'copy at 1 equals chars al 2')

console.info('TEST forEach')

console.info('CASE copy cahars with index and self-reference into new array')

var chars = ['a', 'b', 'c'];
var copy = []

chars.forEach(function (element, index, array) {

    copy[copy.length] = {
        element: element,
        index: index,
        array: array
    }

});

console.assert(copy.length === chars.length, 'copy length equals char length')
console.assert(copy[0].element === chars[0], 'copy element at 0 equals chars al 0')
console.assert(copy[0].index === 0, 'copy index at 0 equals chars al 0')
console.assert(copy[0].array === chars, 'copy array at 0 equals chars al 0')

console.assert(copy[1].element === chars[1], 'copy element at 1 equals chars al 1')
console.assert(copy[1].index === 1, 'copy index at 1 equals chars al 1')
console.assert(copy[1].array === chars, 'copy array at 1 equals chars al 1')

console.assert(copy[2].element === chars[2], 'copy element at 2 equals chars al 2')
console.assert(copy[2].index === 2, 'copy index at 2 equals chars al 2')
console.assert(copy[2].array === chars, 'copy array at 2 equals chars al 2')

console.info('CASE calculate percentages')

var amounts = [100, 50, 4, 450, 100, 2000]
var results = []

amounts.forEach(function (amount, index, amounts) {

    var total = 0;

    amounts.forEach(function (amount) {
        total += amount
    })

    results[index] = amount / total * 100
})

console.assert(results.length === amounts.length, 'results ñength equeals amounts length')
console.assert(results[0] === 3.698224852071006, 'resuls at 0 is 3.698224852071006')
console.assert(results[1] === 1.849112426035503, 'resuls at 0 is 1.849112426035503')
console.assert(results[2] === 0.14792899408284024, 'resuls at 0 is 0.14792899408284024')
console.assert(results[3] === 16.642011834319526, 'resuls at 0 is 16.642011834319526')
console.assert(results[4] === 3.698224852071006, 'resuls at 0 is 3.698224852071006')
console.assert(results[5] === 73.96449704142012, 'resuls at 0 is 73.96449704142012')