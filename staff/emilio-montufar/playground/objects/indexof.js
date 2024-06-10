console.log('TEST indexOf')

console.log('CASE index of animal in object')

var beasts = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'bison', length: 5 }

console.log(beasts)
// { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'bison', length: 5 }

beasts.indexOf = function (element) {
    // var elem = this[0]
    // if (elem === element)
    //     return 0

    // var elem = this[1]
    // if (elem === element)
    //     return 1

    // var elem = this[2]
    // if (elem === element)
    //     return 2

    // var elem = this[3]
    // if (elem === element)
    //     return 3

    // var elem = this[4]
    // if (elem === element)
    //     return 4

    for (var i = 0; i < this.length; i++) {
        var elem = this[i]

        if (elem === element)
            return i
    }

    return -1
}

var index = beasts.indexOf('camel')

console.log(index)
// 2
console.assert(index === 2, 'index is 2')

var index = beasts.indexOf('bison')

console.log(index)
// 1
console.assert(index === 1, 'index is 1')

var index = beasts.indexOf('elephant')

console.log(index)
// -1
console.assert(index === -1, 'index is -1')

console.log('CASE index of animal in array from index')

var beasts = { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'bison', length: 5 }

console.log(beasts)
// { 0: 'ant', 1: 'bison', 2: 'camel', 3: 'duck', 4: 'bison', length: 5 }

beasts.indexOf = function (element, index) {
    if (index === undefined)
        index = 0
    else if (index < 0) {
        index = this.length + index

        if (index < 0)
            index = 0
    }

    for (var i = index; i < this.length; i++) {
        // console.count(index)

        var elem = this[i]

        if (elem === element)
            return i
    }

    return -1
}

var index = beasts.indexOf('bison', 3)

console.log(index)
// 4
console.assert(index === 4, 'index is 4')

var index = beasts.indexOf('duck', -4)

console.log(index)
// 3
console.assert(index === 3, 'index is 3')

var index = beasts.indexOf('duck', -1)

console.log(index)
// -1
console.assert(index === -1, 'index is -1')

var index = beasts.indexOf('duck', -100)

console.log(index)
// 3
console.assert(index === 3, 'index is 3')

var index = beasts.indexOf('bison')

console.log(index)
// 1
console.assert(index === 1, 'index is 1') 
