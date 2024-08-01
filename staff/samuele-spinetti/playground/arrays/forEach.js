console.log('TEST FOREACH')

console.log('CASE forEach in array')

function logArrayElements(element, index, array) {
    console.log("a[" + index + "] = " + element);
}

[2, 5, , 9].forEach(logArrayElements);

// a[0] = 2
// a[1] = 5
// a[2] = 9


console.log('CASE first test')

var numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

numeros.forEach((element, index) => console.log(`El numero en el indice ${index} es el numero ${element}`))

//El numero en el indice 0 es el numero 1
//El numero en el indice 1 es el numero 2
//El numero en el indice 2 es el numero 3
//El numero en el indice 3 es el numero 4
//El numero en el indice 4 es el numero 5
//El numero en el indice 5 es el numero 6
//El numero en el indice 6 es el numero 7
//El numero en el indice 7 es el numero 8
//El numero en el indice 8 es el numero 9
//El numero en el indice 9 es el numero 10

console.log('CASE second test')

var samu = function (element, index) {

    return `El numero en el indice ${index} es el numero ${element}`

}

var numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

numeros.forEach(samu)

//El numero en el indice 0 es el numero 1
//El numero en el indice 1 es el numero 2
//El numero en el indice 2 es el numero 3
//El numero en el indice 3 es el numero 4
//El numero en el indice 4 es el numero 5
//El numero en el indice 5 es el numero 6
//El numero en el indice 6 es el numero 7
//El numero en el indice 7 es el numero 8
//El numero en el indice 8 es el numero 9
//El numero en el indice 9 es el numero 10

var persons = ['Paco', 'Pep', 'Maria']

persons.forEach((pollo, currentIndex) => console.log(`Hi register number: ${currentIndex} ${pollo}.`))


console.log('CASE third')

var chars = ['a', 'b', 'c']
var copy = []

chars.forEach(function (element) {
    copy[copy.length] = element
})

console.assert(copy.length === chars.length, 'copy length equals char length')
console.assert(copy[0] === chars[0], 'copy at 0 equals chars at 0')
console.assert(copy[1] === chars[1], 'copy at 1 equals chars at 1')
console.assert(copy[2] === chars[2], 'copy at 2 equals chars at 2')


console.log('CASE copy chars with index and self-reference into new array')

var chars = ['a', 'b', 'c']
var copy = []

chars.forEach(function (element, index, array) {
    copy[copy.length] = {
        element: element,
        index: index,
        array: array
    }
})

console.assert(copy.length === chars.length, 'copy length equals char length')

console.assert(copy[0].element === chars[0], 'copy element at 0 equals chars at 0')
console.assert(copy[0].index === chars[0], 'copy index at 0 equals chars at 0')
console.assert(copy[0].array === chars, 'copy array at 0 equals chars')

console.assert(copy[1].element === chars[1], 'copy element at 1 equals chars at 1')
console.assert(copy[1].index === chars[1], 'copy index at 1 equals chars at 1')
console.assert(copy[1].array === chars, 'copy array at 1 equals chars')

console.assert(copy[2].element === chars[2], 'copy element at 2 equals chars at 2')
console.assert(copy[2].index === chars[2], 'copy index at 2 equals chars at 2')
console.assert(copy[2].array === chars, 'copy array at 2 equals chars')


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
/*[
    3.698224852071006,
    1.849112426035503,
    0.14792899408284024,
    16.642011834319526,
    3.698224852071006,
    73.96449704142012
  ] */

console.assert(results[0] === 3.698224852071006, 'results at 0 is 3.698224852071006')
console.assert(results[1] === 1.849112426035503, 'results at 1 is 1.849112426035503')
console.assert(results[2] === 0.14792899408284024, 'results at 2 is 0.14792899408284024')
console.assert(results[3] === 16.642011834319526, 'results at 3 is 16.642011834319526')
console.assert(results[4] === 3.698224852071006, 'results at 4 is 3.698224852071006')
console.assert(results[5] === 73.96449704142012, 'results at 5 is 73.96449704142012')