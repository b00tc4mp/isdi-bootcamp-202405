console.log('TEST forEach')

console.log('CASE forEach in array')

var chars = ['a', 'b', 'c']
var copy = []

chars.forEach(function (element) {
    copy[copy.length] = element

})

console.assert(copy.length === chars.length, 'copy length equals char length')
console.assert(copy[0] === chars[0], 'copy at 0 equals at 0')
console.assert(copy[1] === chars[1], 'copy at 1 equals at 1')
console.assert(copy[2] === chars[2], 'copy at 2 equals at 2')

console.log('CASE copy chars with index and self-reference into new array')

var chars = ['a', 'b', 'c']
var copy = []

// chars.forEach(function (element, index, array) {
//     copy[copy.length] = {
//         element: element,
//         index: index,
//         array: array
//     }

// })

// console.assert(copy.length === chars.length, 'copy length equals char length')

// console.assert(copy[0].element === chars[0], 'copy at 0 equals at 0')
// console.assert(copy[0].index === 0, 'copy at 0 equals at 0')
// console.assert(copy[0].array === chars, 'copy at 0 equals at 0')

// console.assert(copy[1].element === chars[1], 'copy at 1 equals at 1')
// console.assert(copy[1].index === 1, 'copy at 1 equals at 1')
// console.assert(copy[1].array === chars, 'copy at 1 equals at 1')

// console.assert(copy[2].element === chars[2], 'copy at 2 equals at 2')
// console.assert(copy[2].index === 2, 'copy at 2 equals at 2')
// console.assert(copy[2].array === chars, 'copy at 2 equals at 2')


var indexes = []
var arrays = []

chars.forEach(function (element, index, array) {
    copy[copy.length] = element
    indexes[indexes.length] = index
    arrays[arrays.length] = array
})


console.log('CASE calculate percentages')

var amounts = [100, 50, 4, 450, 100, 2000]
var results = []

amounts.forEach(function (amount, index, amounts) {
    var total = 0
    amounts.forEach(function (amount) {
        total += amount
    })

    results[index] = amount / total * 100
})

console.log(results)

console.assert(results[0]) === 3.698224852071006, 'results at 0 is  3.698224852071006'
console.assert(results[1]) === 1.849112426035503, 'results at 0 is 1.849112426035503'
console.assert(results[2]) === 0.14792899408284024, 'results at 0 is  0.14792899408284024'
console.assert(results[3]) === 16.642011834319526, 'results at 0 is  16.642011834319526'
console.assert(results[4]) === 3.698224852071006, 'results at 0 is  3.698224852071006'
console.assert(results[5]) === 73.96449704142012, 'results at 0 is  73.96449704142012'



var numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

numeros.forEach((element, index) => console.log(`El número en el indice ${index} es el número ${element}`))

// El número en el indice 0 es el número 1
// El número en el indice 1 es el número 2
// El número en el indice 2 es el número 3
// El número en el indice 3 es el número 4
// El número en el indice 4 es el número 5
// El número en el indice 5 es el número 6
// El número en el indice 6 es el número 7
// El número en el indice 7 es el número 8
// El número en el indice 8 es el número 9
// El número en el indice 9 es el número 10

console.log('CASE second test')

var lili = function (element, index) {
    console.log(`El número en el indice ${index} es el número ${element}`)
}

var numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

numeros.forEach(lili)

// El número en el indice 0 es el número 1
// El número en el indice 1 es el número 2
// El número en el indice 2 es el número 3
// El número en el indice 3 es el número 4
// El número en el indice 4 es el número 5
// El número en el indice 5 es el número 6
// El número en el indice 6 es el número 7
// El número en el indice 7 es el número 8
// El número en el indice 8 es el número 9
// El número en el indice 9 es el número 10

var persons = ['Paco', 'Pep', 'Maria']

persons.forEach(function (person, currentIndex, personArray) {
    console.log(`Register number: ${currentIndex} name: ${person} list: ${personArray}`)
})

// Register number: 0 name: Paco all names: Paco,Pep,Maria
// Register number: 1 name: Pep all names: Paco,Pep,Maria
// Register number: 2 name: Maria all names: Paco,Pep,Maria