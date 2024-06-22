console.log('CASE indexOf in objects')

var animals = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'bison', length: 5 }

animals.indexOf = function (searchElement, fromIndex) {
    if (fromIndex === undefined)
        fromIndex = 0
    else if (fromIndex < 0)
        fromIndex = this.length + fromIndex

    for (var i = fromIndex; i < this.length; i++) {
        var elem = this[i]

        if (searchElement === elem)
            return i
    }
    return -1
}

console.log(animals)
//['ant', 'bison', 'camel', 'duck', 'bison',]



console.log(animals.indexOf('duck'))
//3
console.log(animals.indexOf('bison', 2))
//4
console.log(animals.indexOf('giraffe'))


console.log("CASE lasIndexOF from objects")

var pets = { 0: 'dog', 1: 'cat', 2: 'bird', 3: 'turtle', 4: 'snake', 5: 'bird', length: 6 }

pets.lastIndexOf = function (element, fromIndex) {
    if (fromIndex === undefined)
        fromIndex = this.length - 1
    else if (fromIndex < 0)
        fromIndex = this.length + fromIndex
    for (var i = fromIndex; i > -1; i--) {
        var elem = this[i]
        if (element === elem)
            return i
    }
    return -1
}
var lastIndex = pets.lastIndexOf('snake')
console.log(lastIndex)
//4
var lastIndex = pets.lastIndexOf('cat')
console.log(lastIndex)
//1
var lastIndex = pets.lastIndexOf('elephant')
console.log(lastIndex)
//-1
var lastIndex = pets.lastIndexOf('bird', -3)
console.log(lastIndex)
//2
