console.log('TEST FOREACH')

console.log('CASE forEach in objects')

var numeros = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10, length: 10 }

numeros.forEach = function (callbackFunction) {

    for (var i = 0; i < this.length; i++) {

        callbackFunction(this[i], i, this)

    }

}

/*
var sum1 = function () {

}*/

/*var printNumber = function (number) {
    console.log(number)
}
*/

numeros.forEach(function (number, indexNumber, currentObject) {
    console.log(number, indexNumber, currentObject)
})



console.log('CASE second')

var chars = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
var copy = { length: 0 }

chars.forEach = function (callback) {

    for (var i = 0; i < this.length; i++) {
        var elem = this[i]

        callback(elem)

    }

}

chars.forEach(function (element) {
    copy[copy.length++] = element
})

console.assert(copy.length === chars.length, 'copy length equals char length')
console.assert(copy[0] === chars[0], 'copy at 0 equals chars at 0')
console.assert(copy[1] === chars[1], 'copy at 1 equals chars at 1')
console.assert(copy[2] === chars[2], 'copy at 2 equals chars at 2')


console.log('CASE calculate percentages')

var amounts = { 0: 100, 1: 50, 2: 4, 3: 450, 4: 100, 5: 2000, length: 6 }
var results = { length: 0 }

amounts.forEach = function (callback) {
    for (var i = 0; i < this.length; i++) {

        var elem = this[i]

        callback(elem, i, this)
    }
}

amounts.forEach(function (amount, index, amounts) {

    var total = 0

    amounts.forEach(function (amount) {
        total += amount
    })

    results[index] = amount / total * 100

    results.length++

})

console.log(results)

console.assert(results.length === amounts.length, 'results length equals amounts length')
console.assert(results[0] === 3.698224852071006, 'results at 0 is 3.698224852071006')
console.assert(results[1] === 1.849112426035503, 'results at 1 is 1.849112426035503')
console.assert(results[2] === 0.14792899408284024, 'results at 2 is 0.14792899408284024')
console.assert(results[3] === 16.642011834319526, 'results at 3 is 16.642011834319526')
console.assert(results[4] === 3.698224852071006, 'results at 4 is 3.698224852071006')
console.assert(results[5] === 73.96449704142012, 'results at 5 is 73.96449704142012')