console.log('TEST MAP')

console.log('CASE map in object')

var numeros = { 0: 1, 1: 4, 2: 9, 3: 16, length: 4 }

numeros.map = function (callbackFunction) {
    var newObject = { length: 0 }

    for (var i = 0; i < this.length; i++) {

        newObject[newObject.length++] = callbackFunction(this[i], i, this)

    }

    return newObject

}



var map1 = numeros.map((x) => x * 2)

console.log(map1);
// { '0': 2, '1': 8, '2': 18, '3': 32, length: 4 }