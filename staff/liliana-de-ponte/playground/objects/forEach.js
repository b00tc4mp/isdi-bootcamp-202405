console.log('TEST forEach')

console.log('CASE forEach in Objects')

var numeros = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10, length: 10 }

numeros.forEach = function (callbackFunction) {

    for (var i = 0; i < this.length; i++) {

        callbackFunction(this[i], i, this)
    }
}

/*var printNumber = function (number) {
    console.log(number)
}

numeros.forEach(printNumber)*/

numeros.forEach(function (number, indexNumber, currentObject) {
    console.log(number, indexNumber, currentObject)
})

