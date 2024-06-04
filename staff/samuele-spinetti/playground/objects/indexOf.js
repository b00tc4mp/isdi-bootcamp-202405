console.log('CASE indexOf in object')

var animals = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'bison', length: 5 }

animals.indexOf = function (searchElement, fromIndex) {
    /*
        var element = this[0]
        if (searchElement === element)
            return 0
        var element = this[1]
        if (searchElement === element)
            return 1
        var element = this[2]
        if (searchElement === element)
            return 2
        var element = this[3]
        if (searchElement === element)
            return 3
        var element = this[4]
        if (searchElement === element)
            return 4
    
        return -1
            */
    if (fromIndex === undefined)
        fromIndex = 0

    else if (fromIndex < 0) {
        fromIndex = this.length + fromIndex

        if (fromIndex < 0)
            fromIndex = 0
    }

    for (var i = fromIndex; i < this.length; i++) {
        var element = this[i]

        if (searchElement === element)
            return i
    }

    return -1

}

var index = animals.indexOf('ant')
console.log(index)
console.assert(index === 0, 'index is 0')

var index = animals.indexOf('giraffe')
console.log(index)
console.assert(index === -1, 'index is -1')

var index = animals.indexOf('bison')
console.log(index)
console.assert(index === 1, 'index is 1')

console.log(animals.indexOf('camel', 1))
//2

var index = animals.indexOf('bison', -3)
console.log(index)
console.assert(index === 4, 'index is 4')
