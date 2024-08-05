
console.log('CASE element at indexOf')

var animals = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'bison', length: 5 }


animals.indexOf = function (animalName) {
    for (var i = 0; i < this.length; i++) {
        var element = this[i]
        if (animalName === element) {
            return i
        }
    }
    return -1
}

console.log(animals.indexOf('bison'))
//0

console.log(animals)
//{ '0': 'ant', '1': 'bison', '2': 'camel', '3': 'duck', '4': 'bison' }

console.log(animals.indexOf('bison'))
// 1

console.log(animals.indexOf('camel'))
//2

console.log(animals.indexOf('giraffe'))
//-1

var animals = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'bison', length: 5 }


console.log('CASE indexof with index + and -')
animals.indexOf = function (animalName, indexStart) {
    if (indexStart === undefined)
        indexStart = 0

    else if (indexStart < 0) {
        indexStart = this.length + indexStart

        if (indexStart < 0)
            indexStart = 0
    }

    for (var i = indexStart; i < animals.length; i++) {
        var element = this[i]
        if (animalName === element)
            return i
    }
    return -1
}


console.log(animals.indexOf('bison', 3))
//4

console.log(animals.indexOf('bison', 1))
//1

console.log(animals.indexOf('duck', 1))
//3

console.log(animals.indexOf('bison', -3))
//1
