console.log('TEST indexOf')

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