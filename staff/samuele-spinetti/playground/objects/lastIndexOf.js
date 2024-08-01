console.log('TEST LASTINDEXOF')

console.log('CASE lastIndexOf in object')

var pets = { 0: 'dog', 1: 'cat', 2: 'bird', 3: 'turtle', 4: 'bird', length: 5 }

pets.lastIndexOf = function (searchElement, fromIndex) {

    if (fromIndex === undefined)
        fromIndex = this.length - 1

    else if (fromIndex < 0)
        fromIndex = this.length + fromIndex

    for (var i = fromIndex; i > -1; i--) {
        var element = this[i]
        if (searchElement === element)
            return i
    }
    return -1
}


var lastIndex = pets.lastIndexOf('bird', -3)
console.log(lastIndex)